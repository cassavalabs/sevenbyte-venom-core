import { expect } from "chai";
import { Signer, zeroAddress } from "locklift";
import {
  Collection,
  CollectionRoot,
  Marketplace,
  MarketplaceRoot,
  Nft,
  TokenRoot,
  TokenWallet,
} from "./wrappers";
import { Callback, NftJsonMetadata, fixtures } from "./utils";
import { Account } from "everscale-standalone-client";

describe("Marketplace", async function () {
  const INITIAL_BAL = 10000;

  let marketplace: Marketplace;

  let rootSigner: Signer;
  let storeOwnerSigner: Signer;
  let buyer1Signer: Signer;
  let buyer2Signer: Signer;

  let rootOwnerAccount: Account;
  let storeOwnerAccount: Account;
  let buyer1Account: Account;
  let buyer2Account: Account;

  let storeOwnerTokenWallet: TokenWallet;
  let buyer1TokenWallet: TokenWallet;
  let buyer2TokenWallet: TokenWallet;

  let marketplaceRoot: MarketplaceRoot;
  let wVenomTokenRoot: TokenRoot;
  let collectionRoot: CollectionRoot;

  let collection: Collection;
  let item1: Nft;
  let item2: Nft;
  let item3: Nft;

  before("Deploy Root contracts and fixtures", async function () {
    const {
      deployMarketplaceRoot,
      deployTokenRoot,
      deployAccount,
      deployCollection,
      deployCollectionRoot,
      getSigner,
    } = fixtures();

    rootSigner = await getSigner(0);
    storeOwnerSigner = await getSigner(1);
    buyer1Signer = await getSigner(2);
    buyer2Signer = await getSigner(3);

    rootOwnerAccount = await deployAccount(rootSigner, INITIAL_BAL);
    storeOwnerAccount = await deployAccount(storeOwnerSigner, INITIAL_BAL);
    buyer1Account = await deployAccount(buyer1Signer, INITIAL_BAL);
    buyer2Account = await deployAccount(buyer2Signer, INITIAL_BAL);

    marketplaceRoot = await deployMarketplaceRoot(rootSigner, INITIAL_BAL);
    collectionRoot = await deployCollectionRoot(rootSigner, INITIAL_BAL);

    wVenomTokenRoot = await deployTokenRoot(
      rootSigner,
      "Wrapped Venom",
      "WVENOM",
      9,
    );

    collection = await deployCollection(storeOwnerSigner, 10);

    const metadata: NftJsonMetadata = {
      name: "Venom Spaceship",
      description: "Just a random test token",
      external_url: "https://docs.venom.foundation",
      preview: {
        source: "ipfs://",
        mimetype: "image/jpeg",
      },
      files: [
        {
          source: "ipfs://",
          mimetype: "video/mp4",
        },
      ],
      attributes: [
        {
          trait_type: "background",
          value: "red",
        },
        { trait_type: "expression", value: "optimisitc" },
      ],
    };

    const json = JSON.stringify(metadata);

    item1 = await collection.mintNft(storeOwnerAccount, json);
    item2 = await collection.mintNft(storeOwnerAccount, json);
    item3 = await collection.mintNft(storeOwnerAccount, json);
  });

  describe("Deploy Marketplace", function () {
    it("Should deploy marketplace for store owner", async function () {
      // await marketplaceRoot.deployMarketplace(
      //   wVenomTokenRoot._token.address,
      //   storeOwnerAccount,
      //   INITIAL_BAL,
      // );

      // const res = await marketplaceRoot._root.methods
      //   .getMarketplace({
      //     tip3TokenRoot: wVenomTokenRoot._token.address,
      //     storeOwner: storeOwnerAccount.address,
      //   })
      //   .call();

      // marketplace = await Marketplace.fromAddress(
      //   res.marketplace.toString(),
      //   storeOwnerAccount,
      // );

      // const marketplaceCreated = await marketplaceRoot._root.getPastEvents({
      //   filter: evt => evt.event === "MarketplaceCreated",
      // });

      // expect(
      //   await locklift.provider
      //     .getBalance(res.marketplace)
      //     .then(balance => Number(balance)),
      // ).to.be.above(0);

      // expect(marketplaceCreated.events[0].data.marketplace.toString()).eq(
      //   res.marketplace.toString(),
      // );

      const { deployMarketPlace } = fixtures();
      marketplace = await deployMarketPlace(
        storeOwnerSigner,
        storeOwnerAccount,
        wVenomTokenRoot._token.address,
        50,
      );
    });
  });

  describe("Buy Marketplace Action", function () {
    it("Should list item1 for sale", async function () {
      const price = 5;
      const expiry = Date.now() / 1000;

      // const { payload, totalGas } = await marketplace.createBuyListing(
      //   item1._nft.address,
      //   storeOwnerAccount.address,
      //   price,
      //   expiry,
      // );

      // const callback: Callback = [
      //   [marketplace._marketplace.address, { value: totalGas, payload }],
      // ];

      // await item1.changeManager(
      //   storeOwnerAccount,
      //   marketplace._marketplace.address,
      //   storeOwnerAccount.address,
      //   callback,
      // );

      // const listed = await marketplace._marketplace.getPastEvents({
      //   filter: evt => evt.event === "Listed",
      // });

      // expect(listed.events[0].data.nft.toString()).eq(
      //   item1._nft.address.toString(),
      // );

      expect(
        await locklift.provider
          .getFullContractState({
            address: marketplace._marketplace.address,
          })
          .then(res => res.state?.isDeployed),
      ).to.be.true;

      // expect(listed.events.length).eq(7);
    });
    it.skip("Should buy item1 successfully", async function () {});
    it.skip("Should list item2 successfully", async function () {});
    it.skip("Should delist item2 from marketplace", async function () {});
  });

  describe("Dutch Auction Marketplace", function () {
    it("Should list item1 for auctioning", async function () {
      const startingPrice = 10;
      const reservePrice = 50;
      const startTime = Date.now() / 1000;
      const endTime = (Date.now() + 60 * 1000) / 1000;

      const { payload, totalGas } = await marketplace.createDutchAuction(
        item2._nft.address,
        startingPrice,
        reservePrice,
        startTime,
        endTime,
      );

      const callback: Callback = [
        [marketplace._marketplace.address, { payload, value: totalGas }],
      ];

      await item2.changeManager(
        storeOwnerAccount,
        marketplace._marketplace.address,
        storeOwnerAccount.address,
        callback,
      );

      const listed = await marketplace._marketplace.getPastEvents({
        filter: event => event.event === "Listed",
      });

      expect(listed.events[0].data.nft.toString()).eq(
        item2._nft.address.toString(),
      );
    });
    it.skip("Should place bid on item1", async function () {});
    it.skip("Should outbid on item1", async function () {});
  });

  describe("English Auction Marketplace", function () {
    it.skip("Should list item3 for english auctioning", async function () {
      const startingPrice = 10;
      const reservePrice = 50;
      const startTime = Date.now() / 1000;
      const endTime = (Date.now() + 60 * 1000) / 1000;

      const { payload, totalGas } = await marketplace.createDutchAuction(
        item3._nft.address,
        startingPrice,
        reservePrice,
        startTime,
        endTime,
      );

      const callback: Callback = [
        [marketplace._marketplace.address, { payload, value: totalGas }],
      ];

      await item3.changeManager(
        storeOwnerAccount,
        marketplace._marketplace.address,
        storeOwnerAccount.address,
        callback,
      );

      const listed = await marketplace._marketplace.getPastEvents({
        filter: event => event.event === "Listed",
      });

      expect(listed.events[0].data.nft.toString()).eq(
        item3._nft.address.toString(),
      );
    });
  });
});
