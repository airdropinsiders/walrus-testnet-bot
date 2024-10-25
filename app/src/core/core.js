  import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
  import { FaucetRateLimitError, getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui/faucet';
  import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
  import { Helper } from '../utils/helper.js';
  import { Transaction } from '@mysten/sui/transactions';
  import { getFullnodeUrl, SuiClient, SuiHTTPTransport } from '@mysten/sui/client';
  import { MIST_PER_SUI } from '@mysten/sui/utils';
  import { RPC } from './network/rpc.js';
  import { Config } from '../../config/config.js';
  import { COINENUM } from './coin/coin_enum.js';
  import a2_0x42a4b4 from '../utils/logger.js';
  import { proxyList } from '../../config/proxy_list.js';
  import { privateKey } from '../../accounts/accounts.js';
  import { HttpsProxyAgent } from 'https-proxy-agent';
  import a2_0x5e1301 from 'node-fetch';
  import { SocksProxyAgent } from 'socks-proxy-agent';
  export default class Core {
    constructor(_0x58cf95) {
      if (proxyList.length > 0x0) {
        if (proxyList.length != privateKey.length) {
          throw Error("You Have " + privateKey.length + " Acccounts but just provide " + proxyList.length + " Proxy");
        }
        this.accIdx = privateKey.indexOf(_0x58cf95);
        this.proxy = proxyList[this.accIdx];
      }
      this.fetcher = async (_0x1e258e, _0x4a4267) => {
        if (this.proxy) {
          if (this.proxy.startsWith('http')) {
            _0x4a4267.agent = new HttpsProxyAgent(this.proxy);
          }
          if (this.proxy.startsWith('socks')) {
            _0x4a4267.agent = new SocksProxyAgent(this.proxy);
          }
        }
        return await a2_0x5e1301(_0x1e258e, {
          ..._0x4a4267
        });
      };
      this.acc = _0x58cf95;
      this.txCount = 0x0;
      this.client = new SuiClient({
        'transport': new SuiHTTPTransport({
          'url': getFullnodeUrl('testnet'),
          'fetch': this.fetcher
        })
      });
      this.gasBudet = 0x16e360n;
      this.walrusAddress = "0x9f992cc2430a1f442ca7a5ca7638169f5d5c00e0ebc3977a65e9ac6e497fe5ef";
      this.walrusExchangeObjectId = '0x0e60a946a527902c90bbc71240435728cd6dc26b9e8debc69f09b71671c3029b';
      this.walrusPoolObjectId = '0x37c0e4d7b36a2f64d51bba262a1791f844cfd88f31379f1b7c04244061d43914';
      this.flatLanderNFT = '0x4cb65566af16acb9ae48c437e99653e77c06c1b712329486987223ca99f44575';
      this.randomObjectId = "0x0000000000000000000000000000000000000000000000000000000000000008";
    }
    async ['getAccountInfo']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Getting Account Information...", this);
        const _0x54a537 = decodeSuiPrivateKey(this.acc);
        this.wallet = Ed25519Keypair.fromSecretKey(_0x54a537.secretKey);
        this.address = this.wallet.getPublicKey().toSuiAddress();
        await Helper.delay(0x3e8, this.acc, "Successfully Get Account Information", this);
      } catch (_0x308ebb) {
        throw _0x308ebb;
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
      } catch (_0x304671) {
        if (_0x304671 instanceof FaucetRateLimitError) {
          await Helper.delay(0x7d0, this.acc, _0x304671.message, this);
        } else {
          throw _0x304671;
        }
      }
    }
    async ["getTransactionDetail"]() {
      try {} catch (_0x648a62) {
        throw _0x648a62;
      }
    }
    async ['transferCoin']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Try To Transfer Sui", this);
        const _0x228408 = Number(Helper.random(Config.TXAMOUNTMIN, Config.TXAMOUNTMAX)) * Number(MIST_PER_SUI);
        const _0x353769 = new Transaction();
        const _0x20173d = _0x353769.splitCoins(_0x353769.gas, [_0x228408]);
        _0x353769.transferObjects([_0x20173d], '0xc17539c8caaee52123447a81c0f591e91f068d36a334ceb231463cd8b5053557');
        _0x353769.setGasBudget(this.gasBudet);
        await this.executeTx(_0x353769);
      } catch (_0x41b559) {
        throw _0x41b559;
      }
    }
    async ['mergeCoin']() {
      try {
        await Helper.delay(0x1f4, this.acc, "Merging Coin", this);
        const _0x1a6d7e = await this.client.getCoins({
          'owner': this.address,
          'coinType': COINENUM.WAL
        });
        if (!_0x1a6d7e.data || _0x1a6d7e.data.length < 0x2) {
          await Helper.delay(0x3e8, this.acc, "No Need to Merge Coin", this);
          return;
        }
        const _0x4ec3ef = new Transaction();
        const _0x5b99f1 = _0x1a6d7e.data[0x0].coinObjectId;
        const _0x5d066f = _0x1a6d7e.data.slice(0x1).map(_0x20bc7b => _0x20bc7b.coinObjectId);
        await Helper.delay(0x3e8, this.acc, "Merging " + _0x5d066f.length + " of " + COINENUM.WAL + " Object", this);
        await _0x4ec3ef.mergeCoins(_0x4ec3ef.object(_0x5b99f1), _0x5d066f.map(_0x518fe7 => _0x4ec3ef.object(_0x518fe7)));
        _0x4ec3ef.setGasBudget(this.gasBudet);
        await this.executeTx(_0x4ec3ef);
      } catch (_0x259b29) {
        throw _0x259b29;
      }
    }
    async ["checkNFT"]() {
      try {
        await Helper.delay(0x1f4, this.acc, "Checking User NFT", this);
        const _0x19fffe = await this.client.getOwnedObjects({
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
        const _0x53b68c = _0x19fffe.data.filter(_0x4dc19a => {
          return _0x4dc19a.data.type == COINENUM.FLATLANDERNFT;
        });
        if (_0x53b68c.length != 0x0) {
          await Helper.delay(0x7d0, this.acc, "You Already Have " + _0x53b68c.length + " of " + COINENUM.FLATLANDERNFT, this);
          return true;
        } else {
          return false;
        }
      } catch (_0x2b2955) {
        return false;
      }
    }
    async ['mintNft']() {
      try {
        await Helper.delay(0xbb8, this.acc, "Minting " + COINENUM.FLATLANDERNFT + " NFT", this);
        const _0x4b59c1 = await this.client.getObject({
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
        const _0x132e2c = new Transaction();
        const _0x23412c = _0x132e2c.sharedObjectRef({
          'objectId': _0x4b59c1.data.objectId,
          'initialSharedVersion': _0x4b59c1.data.owner.Shared.initial_shared_version,
          'mutable': false
        });
        await _0x132e2c.moveCall({
          'target': this.flatLanderNFT + "::flatland::mint",
          'arguments': [_0x23412c]
        });
        _0x132e2c.setGasBudget(this.gasBudet);
        await this.executeTx(_0x132e2c);
      } catch (_0x1a087e) {
        await Helper.delay(0xbb8, this.acc, '' + (_0x1a087e.message ?? "Failed to Mint NFT"), this);
      }
    }
    async ['exWalToSui']() {
      try {
        await this.mergeCoin();
        await Helper.delay(0x3e8, this.acc, "Try To Exchange Back Wal to Sui", this);
        const _0x10b98e = await this.client.getCoins({
          'owner': this.address,
          'coinType': COINENUM.WAL
        });
        const _0x21064d = _0x10b98e.data[0x0];
        const _0x3f586e = _0x21064d.balance;
        const _0x59c4d0 = await this.client.getObject({
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
        const _0x142b67 = new Transaction();
        const _0x572bdd = _0x142b67.sharedObjectRef({
          'objectId': _0x59c4d0.data.objectId,
          'initialSharedVersion': _0x59c4d0.data.owner.Shared.initial_shared_version,
          'mutable': true
        });
        const _0xfe550f = await _0x142b67.splitCoins(_0x142b67.object(_0x21064d.coinObjectId), [_0x3f586e]);
        const _0x1686e4 = _0x142b67.moveCall({
          'target': this.walrusAddress + "::wal_exchange::exchange_all_for_sui",
          'arguments': [_0x572bdd, _0x142b67.object(_0xfe550f)]
        });
        await _0x142b67.transferObjects([_0x1686e4], this.address);
        _0x142b67.setGasBudget(this.gasBudet);
        await this.executeTx(_0x142b67);
      } catch (_0xe64940) {
        throw _0xe64940;
      }
    }
    async ['stakeWalToOperator']() {
      try {
        await this.mergeCoin();
        await Helper.delay(0x3e8, this.acc, "Try To Stake Wal to Operator", this);
        const _0x30384e = await this.client.getCoins({
          'owner': this.address,
          'coinType': COINENUM.WAL
        });
        const _0x334836 = _0x30384e.data[0x0];
        const _0x3f6935 = _0x334836.balance;
        const _0x4a87e5 = await this.client.getObject({
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
        const _0x41406e = await this.client.getObject({
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
        const _0x18aed6 = new Transaction();
        const _0x6ee92b = _0x18aed6.sharedObjectRef({
          'objectId': _0x4a87e5.data.objectId,
          'initialSharedVersion': _0x4a87e5.data.owner.Shared.initial_shared_version,
          'mutable': true
        });
        const _0x5d37d4 = await _0x18aed6.splitCoins(_0x18aed6.object(_0x334836.coinObjectId), [_0x3f6935]);
        const _0x31690f = _0x18aed6.moveCall({
          'target': this.walrusAddress + '::staking::stake_with_pool',
          'arguments': [_0x6ee92b, _0x18aed6.object(_0x5d37d4), _0x18aed6.object(_0x41406e.data.objectId)]
        });
        await _0x18aed6.transferObjects([_0x31690f], this.address);
        _0x18aed6.setGasBudget(this.gasBudet);
        await this.executeTx(_0x18aed6);
      } catch (_0x1266f1) {
        if (_0x1266f1.message && _0x1266f1.message.includes("equivocated")) {
          await Helper.delay(0x3e8, this.acc, _0x1266f1.message, this);
        }
        throw _0x1266f1;
      }
    }
    async ["exSuiToWal"]() {
      try {
        await Helper.delay(0x3e8, this.acc, "Try To Exchange Sui to Wal", this);
        const _0x4bfb73 = Number(Helper.randomFloat(Config.TXAMOUNTMIN, Config.TXAMOUNTMAX)) * Number(MIST_PER_SUI);
        const _0x42cb22 = await this.client.getObject({
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
        const _0x5a519f = new Transaction();
        const _0x62eab5 = _0x5a519f.sharedObjectRef({
          'objectId': _0x42cb22.data.objectId,
          'initialSharedVersion': _0x42cb22.data.owner.Shared.initial_shared_version,
          'mutable': true
        });
        const _0x57eee1 = await _0x5a519f.splitCoins(_0x5a519f.gas, [_0x4bfb73]);
        const _0x205fe2 = _0x5a519f.moveCall({
          'target': this.walrusAddress + '::wal_exchange::exchange_all_for_wal',
          'arguments': [_0x62eab5, _0x5a519f.object(_0x57eee1)]
        });
        await _0x5a519f.transferObjects([_0x205fe2], this.address);
        _0x5a519f.setGasBudget(this.gasBudet);
        await this.executeTx(_0x5a519f);
      } catch (_0x4b248b) {
        throw _0x4b248b;
      }
    }
    async ['getBalance'](_0x2234ca = false) {
      try {
        if (_0x2234ca) {
          await Helper.delay(0x1f4, this.acc, "Getting Account Balance...", this);
        }
        this.balance = await this.client.getAllBalances({
          'owner': this.address
        });
        this.balance = this.balance.map(_0x58310d => {
          _0x58310d.totalBalance = parseFloat((Number(_0x58310d.totalBalance) / Number(MIST_PER_SUI)).toFixed(0x2));
          return _0x58310d;
        });
        if (_0x2234ca) {
          await Helper.delay(0x3e8, this.acc, "Successfully Get Account Balance", this);
        }
      } catch (_0x2e8e98) {
        throw _0x2e8e98;
      }
    }
    async ['executeTx'](_0x3c0a21) {
      try {
        await Helper.delay(0x3e8, this.acc, "Executing Tx ...", this);
        a2_0x42a4b4.info(await _0x3c0a21.toJSON());
        const _0x3e36d9 = await this.client.signAndExecuteTransaction({
          'signer': this.wallet,
          'transaction': _0x3c0a21
        });
        await Helper.delay(0xbb8, this.acc, "Tx Executed : " + (RPC.EXPLORER + "txblock/" + _0x3e36d9.digest), this);
        await this.getBalance();
      } catch (_0x3a0b09) {
        throw _0x3a0b09;
      }
    }
  }
