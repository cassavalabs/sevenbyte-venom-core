import { Address, Contract } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Nft } from "./Nft";
import { Account } from "everscale-standalone-client";

type OpenBidContract = Contract<FactorySource["OpenBid"]>;
export class OpenBid {
  _openBid: OpenBidContract;
  _owner: Account;

  constructor(contract: OpenBidContract, signer: Account) {
    this._openBid = contract;
    this._owner = signer;
  }

  static async fromAddress(contractAddress: string, signer: Account) {
    const contract = locklift.factory.getDeployedContract(
      "OpenBid",
      new Address(contractAddress),
    );

    return new OpenBid(contract, signer);
  }

  async acceptOffer(nftAddress: Address, promiseeTip3Wallet: Address) {
    const { payload, totalGas } = await this._openBid.methods
      .acceptOffer({
        answerId: 0,
        _nft: nftAddress,
        _acceptorTip3Wallet: promiseeTip3Wallet,
      })
      .call();

    const nft = await Nft.fromAddress(nftAddress.toString(), this._owner);
    await nft.changeManager(
      this._owner,
      this._openBid.address,
      this._owner.address,
      [
        [
          this._openBid.address,
          { value: locklift.utils.toNano(totalGas), payload },
        ],
      ],
    );
  }

  async cancelOffer() {
    await this._openBid.methods
      .cancelOffer({ sendGasTo: this._owner.address })
      .call();
  }
}
