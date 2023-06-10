import { Address, Contract } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";
import { TokenWallet } from "./TokenWallet";

export type TokenContract = Contract<FactorySource["TokenRoot"]>;
export class TokenRoot {
  _token: TokenContract;
  _owner: Account;

  constructor(token: TokenContract, owner: Account) {
    this._token = token;
    this._owner = owner;
  }

  static async fromAddress(contractAddress: string, owner: Account) {
    const token = locklift.factory.getDeployedContract(
      "TokenRoot",
      new Address(contractAddress),
    );

    return new TokenRoot(token, owner);
  }

  async walletOf(ownerAddress: Address) {
    const wallet = await this._token.methods
      .walletOf({ answerId: 0, walletOwner: ownerAddress })
      .call();

    return wallet.value0;
  }

  async wallet(owner: Account) {
    const wallet = await this.walletOf(owner.address);
    return TokenRoot.fromAddress(wallet.toString(), owner);
  }

  async deployWallet(owner: Account) {
    await this._token.methods
      .deployWallet({
        answerId: 0,
        walletOwner: owner.address,
        deployWalletValue: locklift.utils.toNano(2),
      })
      .send({ from: owner.address, amount: locklift.utils.toNano(3) });

    const wallet = await this.walletOf(owner.address);
    console.log(`User token wallet: ${wallet.toString()}`);

    return TokenWallet.fromAddress(wallet.toString(), owner);
  }

  async mint(amount: number, to: Account) {
    await this._token.methods
      .mint({
        amount: amount,
        recipient: to.address,
        deployWalletValue: locklift.utils.toNano(1),
        remainingGasTo: this._owner.address,
        notify: false,
        payload: "",
      })
      .send({ from: this._owner.address, amount: locklift.utils.toNano(4) });

    const wallet = await this.walletOf(to.address);
    return TokenWallet.fromAddress(wallet.toString(), to);
  }
}
