from dotenv import load_dotenv
from flask import Flask, request, jsonify
from moralis import evm_api
from flask_cors import CORS
import base64
import os
import requests
import json

load_dotenv()

app = Flask(__name__)
CORS(app)


engine_id = "stable-diffusion-v1-5"
api_host = os.getenv('API_HOST', 'https://api.stability.ai')
api_key = os.getenv("STABILITY_API_KEY")
moralis_api_key = os.getenv("MORALIS_API_KEY")

if api_key is None:
    raise Exception("Missing Stability API key.")


@app.route("/generate", methods=["POST"])
def create():
    prompt = request.args.get("prompt")
    response = requests.post(
        f"{api_host}/v1/generation/{engine_id}/text-to-image",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        json={
            "text_prompts": [
                {
                    "text": prompt,
                }
            ],
            "cfg_scale": 7,
            "clip_guidance_preset": "FAST_BLUE",
            "height": 512,
            "width": 512,
            "samples": 1,
            "steps": 30,
        },
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()
    image_base64 = data["artifacts"][0]["base64"]
    return jsonify({"image": image_base64})


@app.route("/uploadToIpfs", methods=["POST"])
def upload_to_ipfs():
    content = request.json["content"]

    body = [
        {
            "path": "moralis/newNFT.png",
            "content": content
        }
    ]

    result = evm_api.ipfs.upload_folder(
        api_key=moralis_api_key,
        body=body
    )

    return result


@app.route("/uploadUri", methods=["POST"])
def upload_uri():
    img = request.json["img"]
    content = {
        "name": "AI NFT",
        "description": "AI Generated NFT",
        "image": img,
        "attributes": [
            {"trait_type": "ia", "value": "stable_diffusion_v1_5"},
        ],
    }

    body = [
        {
            "path": "metadata.json",
            "content": base64.b64encode(bytes(json.dumps(content), "ascii")).decode("ascii"),
        }
    ]

    result = evm_api.ipfs.upload_folder(
        api_key=moralis_api_key,
        body=body,
    )

    return result


@app.route("/get_nfts", methods=["GET"])
def get_nfts():
    address = request.args.get("address")
    params = {
        "address": address,
        "chain": "sepolia",
        "format": "decimal",
        "limit": 30,
        "cursor": "",
        "normalizeMetadata": True,
    }

    result = evm_api.nft.get_contract_nfts(
        api_key=moralis_api_key,
        params=params,
    )

    return jsonify(result)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5002)
