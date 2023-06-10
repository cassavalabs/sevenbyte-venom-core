import { Address, Contract } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";
import { Callback } from "../utils";

type NftContract = Contract<FactorySource["Nft"]>;
export class Nft {
  _nft: NftContract;
  _owner: Account;

  constructor(nft: NftContract, owner: Account) {
    this._nft = nft;
    this._owner = owner;
  }

  static async fromAddress(nftAddress: string, owner: Account) {
    const nft = locklift.factory.getDeployedContract(
      "Nft",
      new Address(nftAddress),
    );

    return new Nft(nft, owner);
  }

  async getInfo() {
    const res = await this._nft.methods.getInfo({ answerId: 0 }).call();
    return res;
  }

  async owner() {
    const res = await this.getInfo();
    return res.owner;
  }

  async manager() {
    const res = await this.getInfo();
    return res.manager;
  }

  async collection() {
    const res = await this.getInfo();
    return res.collection;
  }

  async changeManager(
    oldManager: Account,
    newManager: Address,
    sendGasTo: Address,
    callbacks: Callback,
  ) {
    return locklift.tracing.trace(
      this._nft.methods
        .changeManager({ newManager, sendGasTo, callbacks })
        .send({ from: oldManager.address, amount: locklift.utils.toNano(3) }),
    );
  }
}
