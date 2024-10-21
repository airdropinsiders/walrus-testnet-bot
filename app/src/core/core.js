import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { FaucetRateLimitError, getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Helper } from '../utils/helper.js';
import { Transaction } from '@mysten/sui/transactions';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { RPC } from './network/rpc.js';
import { Config } from '../../config/config.js';
import { COINENUM } from './coin/coin_enum.js';
import a2_0x163f94 from '../utils/logger.js';
export default class Core {
  constructor(_0x34fb98) {
    this.acc = _0x34fb98;
    this.txCount = 0x0;
    this.client = new SuiClient({
      'url': getFullnodeUrl('testnet')
    });
    this.walrusAddress = "0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef";
    this.walrusExchangeObjectId = '0x0e60a946a527902c90bbc71240435728cd6dc26b9e8debc69f09b71671c3029b';
    this.walrusPoolObjectId = '0x37c0e4d7b36a2f64d51bba262a1791f844cfd88f31379f1b7c04244061d43914';
    this.flatLanderNFT = "0x4cb65566af16acb9ae48c437e99653e77c06c1b712329486987223ca99f44575";
    this.randomObjectId = "0x0000000000000000000000000000000000000000000000000000000000000008";
  }
  async ["getAccountInfo"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Getting Account Information...", this);
      const _0x4d73a9 = decodeSuiPrivateKey(this.acc);
      this.wallet = Ed25519Keypair.fromSecretKey(_0x4d73a9.secretKey);
      this.address = this.wallet.getPublicKey().toSuiAddress();
      await Helper.delay(0x3e8, this.acc, "Successfully Get Account Information", this);
    } catch (_0xd2b544) {
      throw _0xd2b544;
    }
  }
  async ['requestFaucet']() {
    try {
      await Helper.delay(0x1f4, this.acc, "Requesting Sui Faucet", this);
      await requestSuiFromFaucetV0({
        'host': getFaucetHost("testnet"),
        'recipient': this.address
      });
      await Helper.delay(0x3e8, this.acc, "Sui Faucet Requested Successfully", this);
      await this.getBalance();
    } catch (_0x45051) {
      if (_0x45051 instanceof FaucetRateLimitError) {
        await Helper.delay(0x7d0, this.acc, _0x45051.message, this);
      } else {
        throw _0x45051;
      }
    }
  }
  async ["getTransactionDetail"]() {
    try {} catch (_0xdb7d0c) {
      throw _0xdb7d0c;
    }
  }
  async ["transferCoin"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Transfer Sui", this);
      const _0x4159a7 = Number(Helper.random(Config.TXAMOUNTMIN, Config.TXAMOUNTMAX)) * Number(MIST_PER_SUI);
      const _0x47ad0c = new Transaction();
      const _0x4481b8 = _0x47ad0c.splitCoins(_0x47ad0c.gas, [_0x4159a7]);
      _0x47ad0c.transferObjects([_0x4481b8], "0xc17539c8caaee52123447a81c0f591e91f068d36a334ceb231463cd8b5053557");
      await this.executeTx(_0x47ad0c);
    } catch (_0x5352b8) {
      throw _0x5352b8;
    }
  }
  async ["mergeCoin"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Merging Coin", this);
      const _0x27a246 = await this.client.getCoins({
        'owner': this.address,
        'coinType': COINENUM.WAL
      });
      if (!_0x27a246.data || _0x27a246.data.length < 0x2) {
        await Helper.delay(0x3e8, this.acc, "No Need to Merge Coin", this);
        return;
      }
      const _0x35c3cc = new Transaction();
      const _0x2a39fa = _0x27a246.data[0x0].coinObjectId;
      const _0x2d2b41 = _0x27a246.data.slice(0x1).map(_0x4087d5 => _0x4087d5.coinObjectId);
      await Helper.delay(0x3e8, this.acc, "Merging " + _0x2d2b41.length + " of " + COINENUM.WAL + " Object", this);
      await _0x35c3cc.mergeCoins(_0x35c3cc.object(_0x2a39fa), _0x2d2b41.map(_0x33a908 => _0x35c3cc.object(_0x33a908)));
      await this.executeTx(_0x35c3cc);
    } catch (_0x2a047e) {
      throw _0x2a047e;
    }
  }
  async ['checkNFT']() {
    try {
      await Helper.delay(0x1f4, this.acc, "Checking User NFT", this);
      const _0x4850d1 = await this.client.getOwnedObjects({
        'owner': this.address,
        'options': {
          'showBcs': true,
          'showContent': true,
          'showDisplay': true,
          'showOwner': true,
          'showPreviousTransaction': true,
          'showStorageRebate': true,
          'showType': true
        }
      });
      const _0x8be081 = _0x4850d1.data.filter(_0x2d5b33 => {
        return _0x2d5b33.data.type == COINENUM.FLATLANDERNFT;
      });
      return _0x8be081.length != 0x0 ? (await Helper.delay(0x7d0, this.acc, "You Already Have " + _0x8be081.length + " of " + COINENUM.FLATLANDERNFT, this), true) : false;
    } catch (_0x4ccba6) {
      return false;
    }
  }
  async ["mintNft"]() {
    try {
      await Helper.delay(0xbb8, this.acc, "Minting " + COINENUM.FLATLANDERNFT + " NFT", this);
      const _0x31ab5c = await this.client.getObject({
        'id': this.randomObjectId,
        'options': {
          'showBcs': true,
          'showContent': true,
          'showDisplay': true,
          'showOwner': true,
          'showPreviousTransaction': true,
          'showStorageRebate': true,
          'showType': true
        }
      });
      const _0x44b2a1 = new Transaction();
      const _0x186507 = _0x44b2a1.sharedObjectRef({
        'objectId': _0x31ab5c.data.objectId,
        'initialSharedVersion': _0x31ab5c.data.owner.Shared.initial_shared_version,
        'mutable': false
      });
      await _0x44b2a1.moveCall({
        'target': this.flatLanderNFT + '::flatland::mint',
        'arguments': [_0x186507]
      });
      await this.executeTx(_0x44b2a1);
    } catch (_0x19916a) {
      await Helper.delay(0xbb8, this.acc, '' + (_0x19916a.message ?? "Failed to Mint NFT"), this);
    }
  }
  async ["exWalToSui"]() {
    try {
      await this.mergeCoin();
      await Helper.delay(0x3e8, this.acc, "Try To Exchange Back Wal to Sui", this);
      const _0x32f8ab = await this.client.getCoins({
        'owner': this.address,
        'coinType': COINENUM.WAL
      });
      const _0x56fab4 = _0x32f8ab.data[0x0];
      const _0x4747dc = _0x56fab4.balance;
      const _0x5cbe14 = await this.client.getObject({
        'id': this.walrusExchangeObjectId,
        'options': {
          'showBcs': true,
          'showContent': true,
          'showDisplay': true,
          'showOwner': true,
          'showPreviousTransaction': true,
          'showStorageRebate': true,
          'showType': true
        }
      });
      const _0x3c4b6a = new Transaction();
      const _0x5808eb = _0x3c4b6a.sharedObjectRef({
        'objectId': _0x5cbe14.data.objectId,
        'initialSharedVersion': _0x5cbe14.data.owner.Shared.initial_shared_version,
        'mutable': true
      });
      const _0xe4c6be = await _0x3c4b6a.splitCoins(_0x3c4b6a.object(_0x56fab4.coinObjectId), [_0x4747dc]);
      const _0x2bfdc7 = _0x3c4b6a.moveCall({
        'target': this.walrusAddress + "::wal_exchange::exchange_all_for_sui",
        'arguments': [_0x5808eb, _0x3c4b6a.object(_0xe4c6be)]
      });
      await _0x3c4b6a.transferObjects([_0x2bfdc7], this.address);
      await this.executeTx(_0x3c4b6a);
    } catch (_0x323bfb) {
      throw _0x323bfb;
    }
  }
  async ["stakeWalToOperator"]() {
    try {
      await this.mergeCoin();
      await Helper.delay(0x3e8, this.acc, "Try To Stake Wal to Operator", this);
      const _0x1e350f = await this.client.getCoins({
        'owner': this.address,
        'coinType': COINENUM.WAL
      });
      const _0x38507f = _0x1e350f.data[0x0];
      const _0x5bc207 = _0x38507f.balance;
      const _0x1d12e4 = await this.client.getObject({
        'id': this.walrusPoolObjectId,
        'options': {
          'showBcs': true,
          'showContent': true,
          'showDisplay': true,
          'showOwner': true,
          'showPreviousTransaction': true,
          'showStorageRebate': true,
          'showType': true
        }
      });
      const _0x289ab0 = await this.client.getObject({
        'id': Config.STAKENODEOPERATOR,
        'options': {
          'showBcs': true,
          'showContent': true,
          'showDisplay': true,
          'showOwner': true,
          'showPreviousTransaction': true,
          'showStorageRebate': true,
          'showType': true
        }
      });
      const _0x158978 = new Transaction();
      const _0x299c06 = _0x158978.sharedObjectRef({
        'objectId': _0x1d12e4.data.objectId,
        'initialSharedVersion': _0x1d12e4.data.owner.Shared.initial_shared_version,
        'mutable': true
      });
      const _0x1afff3 = await _0x158978.splitCoins(_0x158978.object(_0x38507f.coinObjectId), [_0x5bc207]);
      const _0x4d65af = _0x158978.moveCall({
        'target': this.walrusAddress + "::staking::stake_with_pool",
        'arguments': [_0x299c06, _0x158978.object(_0x1afff3), _0x158978.object(_0x289ab0.data.objectId)]
      });
      await _0x158978.transferObjects([_0x4d65af], this.address);
      await this.executeTx(_0x158978);
    } catch (_0x4ebb9d) {
      if (_0x4ebb9d.message && _0x4ebb9d.message.includes('equivocated')) {
        await Helper.delay(0x3e8, this.acc, _0x4ebb9d.message, this);
      }
      throw _0x4ebb9d;
    }
  }
  async ["exSuiToWal"]() {
    try {
      await Helper.delay(0x3e8, this.acc, "Try To Exchange Sui to Wal", this);
      const _0x12b130 = Number(Helper.randomFloat(Config.TXAMOUNTMIN, Config.TXAMOUNTMAX)) * Number(MIST_PER_SUI);
      const _0x15613e = await this.client.getObject({
        'id': this.walrusExchangeObjectId,
        'options': {
          'showBcs': true,
          'showContent': true,
          'showDisplay': true,
          'showOwner': true,
          'showPreviousTransaction': true,
          'showStorageRebate': true,
          'showType': true
        }
      });
      const _0x5c928e = new Transaction();
      const _0x4d7788 = _0x5c928e.sharedObjectRef({
        'objectId': _0x15613e.data.objectId,
        'initialSharedVersion': _0x15613e.data.owner.Shared.initial_shared_version,
        'mutable': true
      });
      const _0x32ff35 = await _0x5c928e.splitCoins(_0x5c928e.gas, [_0x12b130]);
      const _0x51adf8 = _0x5c928e.moveCall({
        'target': this.walrusAddress + '::wal_exchange::exchange_all_for_wal',
        'arguments': [_0x4d7788, _0x5c928e.object(_0x32ff35)]
      });
      await _0x5c928e.transferObjects([_0x51adf8], this.address);
      await this.executeTx(_0x5c928e);
    } catch (_0x4adf6b) {
      throw _0x4adf6b;
    }
  }
  async ['getBalance'](_0x21c17d = false) {
    try {
      if (_0x21c17d) {
        await Helper.delay(0x1f4, this.acc, "Getting Account Balance...", this);
      }
      this.balance = await this.client.getAllBalances({
        'owner': this.address
      });
      this.balance = this.balance.map(_0x2690cf => {
        _0x2690cf.totalBalance = parseFloat((Number(_0x2690cf.totalBalance) / Number(MIST_PER_SUI)).toFixed(0x2));
        return _0x2690cf;
      });
      if (_0x21c17d) {
        await Helper.delay(0x3e8, this.acc, "Successfully Get Account Balance", this);
      }
    } catch (_0x437587) {
      throw _0x437587;
    }
  }
  async ["executeTx"](_0x243370) {
    try {
      await Helper.delay(0x3e8, this.acc, "Executing Tx ...", this);
      a2_0x163f94.info(await _0x243370.toJSON());
      const _0x2d520e = await this.client.signAndExecuteTransaction({
        'signer': this.wallet,
        'transaction': _0x243370
      });
      await Helper.delay(0xbb8, this.acc, "Tx Executed : " + (RPC.EXPLORER + "txblock/" + _0x2d520e.digest), this);
      await this.getBalance();
    } catch (_0x244b71) {
      throw _0x244b71;
    }
  }
}