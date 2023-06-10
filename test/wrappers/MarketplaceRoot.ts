import { Address, Contract, Signer } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";

type MarketplaceRootContract = Contract<FactorySource["MarketplaceRoot"]>;
export class MarketplaceRoot {
  _root: MarketplaceRootContract;
  _signer: Signer;

  constructor(root: MarketplaceRootContract, signer: Signer) {
    this._root = root;
    this._signer = signer;
  }

  static async fromAddress(contractAddress: string, signer: Signer) {
    const root = locklift.factory.getDeployedContract(
      "MarketplaceRoot",
      new Address(contractAddress),
    );

    return new MarketplaceRoot(root, signer);
  }

  async deployMarketplace(
    tip3Root: Address,
    ownerAccount: Account,
    deployValue: number,
  ) {
    return this._root.methods
      .deployMarketplace({
        _deployValue: deployValue,
        _sendGasTo: ownerAccount.address,
        _storeOwner: ownerAccount.address,
        _tip3TokenRoot: tip3Root,
      })
      .send({ from: ownerAccount.address, amount: locklift.utils.toNano(10) });
  }
}
