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


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5002)
