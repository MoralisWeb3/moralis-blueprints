from brownie import AINFTS
from scripts.helpful_scripts import get_account


def deploy_random_nft():
    account = get_account()
    nft_contract = AINFTS.deploy(
        {"from": account})
    print(nft_contract.address)


def main():
    deploy_random_nft()
