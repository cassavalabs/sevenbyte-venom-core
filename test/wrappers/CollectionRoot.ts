import { Address, Contract, Signer } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";

type CollectionRootContract = Contract<FactorySource["CollectionRoot"]>;
export class CollectionRoot {
  _root: CollectionRootContract;
  _owner: Account;

  constructor(root: CollectionRootContract, owner: Account) {
    this._root = root;
    this._owner = owner;
  }

  static async fromAddress(contractAddress: string, owner: Account) {
    const root = locklift.factory.getDeployedContract(
      "CollectionRoot",
      new Address(contractAddress),
    );

    return new CollectionRoot(root, owner);
  }

  async deployCollection(signer: Signer, ownerAccount: Account) {
    await this._root.methods
      .deployCollection({
        answerId: 0,
        ownerPubkey: signer.publicKey,
      })
      .send({ from: ownerAccount.address, amount: locklift.utils.toNano(5) });
  }

  // async 
}
