import { Address, Contract } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";

type MarketplaceContract = Contract<FactorySource["Marketplace"]>;
export class Marketplace {
  _marketplace: MarketplaceContract;
  _owner: Account;

  constructor(marketplace: MarketplaceContract, owner: Account) {
    this._marketplace = marketplace;
    this._owner = owner;
  }

  static async fromAddress(contractAddress: string, owner: Account) {
    const marketplace = locklift.factory.getDeployedContract(
      "Marketplace",
      new Address(contractAddress),
    );

    return new Marketplace(marketplace, owner);
  }

  async withdraw() {}

  async withdrawTip3(to: Address, amount: number) {}

  async destroyStore() {}

  async createReserveAuction(
    nft: Address,
    reservePrice: number,
    startTime: number,
    endTime: number,
  ) {}

  async finalizeReserveAuction(nft: Address) {}

  async placeReserveAuctionBid(nft: Address, amount: number) {}

  async finalizeDutchAuction(nft: Address) {}

  async cancelDutchAuction(nft: Address) {}

  async createDutchAuction(
    nft: Address,
    startingPrice: number,
    reservePrice: number,
    startTime: number,
    endTime: number,
  ) {}

  async placeDutchAuctionBid(nft: Address, amount: number) {}

  async getDeclinePrice(nft: Address) {}

  async createBuyListing(
    nft: Address,
    sendGasTo: Address,
    price: number,
    expiry: number,
  ) {
    const res = await this._marketplace.methods
      .createBuyListing({
        answerId: 0,
        nft,
        sendGasTo: sendGasTo,
        price,
        expiry,
      })
      .call();

    return { payload: res.value0, totalGas: res.value1 };
  }

  async buy(nft: Address, price: number) {}

  async cancelBuyPrice(nft: Address) {}
}
