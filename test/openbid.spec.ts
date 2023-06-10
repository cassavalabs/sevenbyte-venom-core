import { Account } from "everscale-standalone-client";
import { Signer } from "locklift";
import { Collection, Nft, OpenBidRoot, TokenRoot } from "./wrappers";
import { NftJsonMetadata, fixtures } from "./utils";

describe("OpenBid Market", function () {
  const INITIAL_BAL = 1000;

  let rootSigner: Signer;
  let offeror1Signer: Signer;
  let offeror2Signer: Signer;
  let offeror3Signer: Signer;
  let nftOwnerSigner: Signer;

  let rootAccount: Account;
  let offeror1Account: Account;
  let offeror2Account: Account;
  let offeror3Account: Account;
  let nftOwnerAccount: Account;

  let wVenomTokenRoot: TokenRoot;
  let openBidRoot: OpenBidRoot;

  let collection: Collection;
  let item1: Nft;
  let item2: Nft;

  beforeEach("Deploy Roots and Signers", async function () {
    const {
      deployAccount,
      deployCollection,
      deployOpenBidRoot,
      deployTokenRoot,
      getSigner,
    } = fixtures();

    rootSigner = await getSigner(0);
    offeror1Signer = await getSigner(1);
    offeror2Signer = await getSigner(2);
    offeror3Signer = await getSigner(3);
    nftOwnerSigner = await getSigner(4);

    rootAccount = await deployAccount(rootSigner, INITIAL_BAL);
    offeror1Account = await deployAccount(offeror1Signer, INITIAL_BAL);
    offeror2Account = await deployAccount(offeror2Signer, INITIAL_BAL);
    offeror3Account = await deployAccount(offeror3Signer, INITIAL_BAL);
    nftOwnerAccount = await deployAccount(nftOwnerSigner, INITIAL_BAL);

    wVenomTokenRoot = await deployTokenRoot(
      rootSigner,
      "Wrapped Venom",
      "WVENOM",
      9,
    );

    collection = await deployCollection(nftOwnerSigner, INITIAL_BAL);
    openBidRoot = await deployOpenBidRoot(rootSigner, INITIAL_BAL);
  });

  describe("Mint Nfts to nft owner", function () {
    it("Should mint item1 nft", async function () {
      const metadata: NftJsonMetadata = {
        name: "Venom Apes",
        description: "Just a random test token",
        preview: {
          source: "ipfs://jhffjfjfjfj",
          mimetype: "image/png",
        },
        files: [
          {
            source: "ipfs://",
            mimetype: "image/jpeg",
          },
        ],
        attributes: [
          {
            trait_type: "height",
            value: "tall",
          },
        ],
      };

      item1 = await collection.mintNft(
        nftOwnerAccount,
        JSON.stringify(metadata),
      );
    });

    it("Should mint item2 nft", async function () {
      const metadata: NftJsonMetadata = {
        name: "Phrat Boyes",
        description: "Just a random test token",
        preview: {
          source: "ipfs://jhffjfjfjfj",
          mimetype: "image/png",
        },
        files: [
          {
            source: "ipfs://",
            mimetype: "image/jpeg",
          },
        ],
        attributes: [
          {
            trait_type: "size",
            value: "fat",
          },
        ],
      };

      // item2 = await collection.mintNft(
      //   nftOwnerAccount,
      //   JSON.stringify(metadata),
      // );
    });
  });

  describe("Make offers", function () {
    it("Should make offer for offeror1", async function () {
      const openBid = await OpenBidRoot.fromAddress(
        openBidRoot._root.address.toString(),
        offeror1Account,
      );

      const expiration = Date.now() / 1000;

      await openBid.makeOffer(
        wVenomTokenRoot._token.address,
        item1._nft.address,
        expiration,
      );
    });
    it.skip("Should make offer for offeror2", async function () {});
    it.skip("Should make offer for offeror3", async function () {});
  });

  describe("Accept an offer", function () {
    it.skip("Should accept offeror3 offer for item1 consideration", async function () {});
  });
});
