import { Address, Contract, Signer } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";
import { Nft } from "./Nft";

type CollectionContract = Contract<FactorySource["Collection"]>;
export class Collection {
  _collection: CollectionContract;
  _signer: Signer;

  constructor(collection: CollectionContract, signer: Signer) {
    this._collection = collection;
    this._signer = signer;
  }

  static async fromAddress(contractAddress: string, signer: Signer) {
    const collection = locklift.factory.getDeployedContract(
      "Collection",
      new Address(contractAddress),
    );

    return new Collection(collection, signer);
  }

  async nftAddress(id: number) {
    const res = await this._collection.methods
      .nftAddress({ answerId: 0, id })
      .call();

    return res.nft;
  }

  async totalSupply() {
    const res = await this._collection.methods
      .totalSupply({ answerId: 0 })
      .call();

    return res.count;
  }

  async mintNft(owner: Account, json: string) {
    const id = await this.totalSupply();
    await locklift.tracing.trace(
      this._collection.methods
        .mintNft({ json })
        .send({ from: owner.address, amount: locklift.utils.toNano(1) }),
    );

    const nftAddress = await this.nftAddress(Number(id));
    const nft = locklift.factory.getDeployedContract("Nft", nftAddress);

    return new Nft(nft, owner);
  }
}
