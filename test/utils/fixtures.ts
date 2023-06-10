import { Address, Signer, WalletTypes, zeroAddress } from "locklift";
import { TokenRoot } from "../wrappers/TokenRoot";
import { MarketplaceRoot } from "../wrappers/MarketplaceRoot";
import { OpenBidRoot } from "../wrappers/OpenBidRoot";
import { CollectionRoot } from "../wrappers/CollectionRoot";
import { Collection, Marketplace } from "../wrappers";
import { Account } from "everscale-standalone-client";

export function fixtures() {
  const deployTokenRoot = async (
    signer: Signer,
    name: string,
    symbol: string,
    decimals: number,
    initialSupplyTo?: Address,
    initialSupply?: number,
  ) => {
    const account = await deployAccount(signer, 1);
    const tokenWallet = locklift.factory.getContractArtifacts("TokenWallet");

    const { contract } = await locklift.factory.deployContract({
      contract: "TokenRoot",
      publicKey: signer.publicKey,
      initParams: {
        name_: name,
        symbol_: symbol,
        decimals_: decimals,
        deployer_: zeroAddress,
        rootOwner_: account.address,
        walletCode_: tokenWallet.code,
        randomNonce_: locklift.utils.getRandomNonce(),
      },
      constructorParams: {
        initialSupplyTo: initialSupplyTo ? initialSupplyTo : zeroAddress,
        initialSupply: initialSupply ? initialSupply : "0",
        deployWalletValue: locklift.utils.toNano(5),
        mintDisabled: false,
        burnByRootDisabled: true,
        burnPaused: true,
        remainingGasTo: account.address,
      },
      value: locklift.utils.toNano(9),
    });

    return new TokenRoot(contract, account);
  };

  const deployAccount = async (signer: Signer, initialBal: number) => {
    const { account } = await locklift.factory.accounts.addNewAccount({
      value: locklift.utils.toNano(initialBal),
      publicKey: signer.publicKey,
      type: WalletTypes.EverWallet,
    });

    return account;
  };

  const deployMarketplaceRoot = async (signer: Signer, initialBal: number) => {
    const marketplace = locklift.factory.getContractArtifacts("Marketplace");

    const { contract } = await locklift.factory.deployContract({
      contract: "MarketplaceRoot",
      publicKey: signer.publicKey,
      initParams: {},
      constructorParams: {
        _ownerPubKey: `0x${signer.publicKey}`,
        _rootCode: marketplace.code,
      },
      value: locklift.utils.toNano(initialBal),
    });

    return new MarketplaceRoot(contract, signer);
  };

  const deployOpenBidRoot = async (signer: Signer, initialBal: number) => {
    const openBid = locklift.factory.getContractArtifacts("OpenBid");
    const account = await deployAccount(signer, 10);

    const { contract } = await locklift.factory.deployContract({
      contract: "OpenBidRoot",
      publicKey: signer.publicKey,
      initParams: {},
      constructorParams: {
        _openBidCode: openBid.code,
        _rootOwnerPubKey: `0x${signer.publicKey}`,
      },
      value: locklift.utils.toNano(initialBal),
    });

    return new OpenBidRoot(contract, account);
  };

  const deployCollectionRoot = async (signer: Signer, initialBal: number) => {
    const collection = locklift.factory.getContractArtifacts("Collection");
    const nft = locklift.factory.getContractArtifacts("Nft");
    const index = locklift.factory.getContractArtifacts("Index");
    const indexBasis = locklift.factory.getContractArtifacts("IndexBasis");
    const owner = await deployAccount(signer, 5);

    const { contract } = await locklift.factory.deployContract({
      contract: "CollectionRoot",
      publicKey: signer.publicKey,
      initParams: {},
      constructorParams: {
        rootCode: collection.code,
        codeNft: nft.code,
        codeIndex: index.code,
        codeIndexBasis: indexBasis.code,
        ownerPubKey: `0x${signer.publicKey}`,
        deployValue: locklift.utils.toNano(20),
      },
      value: locklift.utils.toNano(initialBal),
    });

    return new CollectionRoot(contract, owner);
  };

  const getSigner = async (id: number) => {
    const signer = await locklift.keystore.getSigner(id.toString());
    return signer!;
  };

  const deployCollection = async (signer: Signer, initialBal: number) => {
    const Nft = locklift.factory.getContractArtifacts("Nft");
    const Index = locklift.factory.getContractArtifacts("Index");
    const IndexBasis = locklift.factory.getContractArtifacts("IndexBasis");

    const { contract } = await locklift.factory.deployContract({
      contract: "Collection",
      publicKey: signer.publicKey,
      constructorParams: {
        codeNft: Nft.code,
        codeIndex: Index.code,
        codeIndexBasis: IndexBasis.code,
        ownerPubkey: `0x${signer.publicKey}`,
      },
      initParams: {},
      value: locklift.utils.toNano(initialBal),
    });

    return new Collection(contract, signer);
  };

  const deployMarketPlace = async (
    signer: Signer,
    owner: Account,
    tip3TokenRoot: Address,
    initialBal: number,
  ) => {
    const { contract } = await locklift.factory.deployContract({
      contract: "Marketplace",
      publicKey: signer.publicKey,
      initParams: { _owner: owner.address, _tip3TokenRoot: tip3TokenRoot },
      constructorParams: {
        owner: owner.address,
        sendGasTo: owner.address,
        tip3TokenRoot: tip3TokenRoot,
        tip3DeployValue: initialBal,
      },
      value: locklift.utils.toNano(20),
    });

    return new Marketplace(contract, owner);
  };

  return {
    deployTokenRoot,
    deployAccount,
    deployCollectionRoot,
    deployCollection,
    deployMarketplaceRoot,
    deployOpenBidRoot,
    deployMarketPlace,
    getSigner,
  };
}
