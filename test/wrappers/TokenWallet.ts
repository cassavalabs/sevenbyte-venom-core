import { Address, Contract } from "locklift";
import { FactorySource } from "../../build/factorySource";
import { Account } from "everscale-standalone-client";

export type WalletContract = Contract<FactorySource["TokenWallet"]>;

export class TokenWallet {
  _wallet: WalletContract;
  _owner: Account;

  constructor(walletContract: WalletContract, owner: Account) {
    this._wallet = walletContract;
    this._owner = owner;
  }

  static async fromAddress(contractAddress: string, owner: Account) {
    const wallet = locklift.factory.getDeployedContract(
      "TokenWallet",
      new Address(contractAddress),
    );

    return new TokenWallet(wallet, owner);
  }

  async owner() {
    const res = await this._wallet.methods.owner({ answerId: 0 }).call();
    return res.value0;
  }

  async balance() {
    const res = await this._wallet.methods.balance({ answerId: 0 }).call();
    return res.value0;
  }

  async transferToWallet(
    amount: number,
    receipient: Address,
    notify: boolean,
    payload: string,
    gasValue: number,
  ) {
    return await locklift.tracing.trace(
      this._wallet.methods
        .transferToWallet({
          amount: amount,
          recipientTokenWallet: receipient,
          remainingGasTo: receipient,
          notify,
          payload,
        })
        .send({
          from: this._owner.address,
          amount: locklift.utils.toNano(gasValue),
        }),
    );
  }
}
