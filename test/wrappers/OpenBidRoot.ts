import { Address, Contract } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";

type OpenBidRootContract = Contract<FactorySource["OpenBidRoot"]>;
export class OpenBidRoot {
  _root: OpenBidRootContract;
  _account: Account;

  constructor(root: OpenBidRootContract, account: Account) {
    this._root = root;
    this._account = account;
  }

  static async fromAddress(contractAddress: string, account: Account) {
    const root = locklift.factory.getDeployedContract(
      "OpenBidRoot",
      new Address(contractAddress),
    );

    return new OpenBidRoot(root, account);
  }

  async makeOffer(tip3TokenRoot: Address, nft: Address, expiration: number) {
    return await this._root.methods
      .makeOffer({
        _tip3TokenRoot: tip3TokenRoot,
        _nft: nft,
        _expiration: expiration,
        _offeror: this._account.address,
        _tip3DeployValue: locklift.utils.toNano(2),
      })
      .send({ from: this._account.address, amount: locklift.utils.toNano(30) });
  }
}
