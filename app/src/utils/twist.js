  import { Twisters } from 'twisters';
  import a7_0x3a05bc from './logger.js';
  import a7_0x451489 from '../core/core.js';
  import { privateKey } from '../../accounts/accounts.js';
  import '../core/network/rpc.js';
  import { Config } from '../../config/config.js';
  import { COINENUM } from '../core/coin/coin_enum.js';
  class Twist {
    constructor() {
      this.twisters = new Twisters();
    }
    ['log'](_0x301adf = '', _0x1cdddd = '', _0x2d1c53 = new a7_0x451489(), _0x42c820) {
      const _0x1b5460 = privateKey.indexOf(_0x1cdddd);
      if (_0x42c820 == undefined) {
        a7_0x3a05bc.info("Account " + (_0x1b5460 + 0x1) + " - " + _0x301adf);
        _0x42c820 = '-';
      }
      const _0x2245d2 = _0x2d1c53.address ?? '-';
      const _0x5935a3 = _0x2d1c53.balance ?? [];
      const _0x15ec06 = _0x5935a3.find(_0x8b39b9 => _0x8b39b9.coinType === COINENUM.SUI);
      const _0x20c244 = (_0x15ec06 ? _0x15ec06.totalBalance : '?') + " SUI";
      const _0x78cc59 = _0x5935a3.find(_0x1d3763 => _0x1d3763.coinType === COINENUM.WAL);
      const _0xb4b41b = (_0x78cc59 ? _0x78cc59.totalBalance : '?') + " WAL";
      this.twisters.put(_0x1cdddd, {
        'text': "\n================== Account " + (_0x1b5460 + 0x1) + " =================\nAddress      : " + _0x2245d2 + "\nBalance      : - " + _0x20c244 + "\n               - " + _0xb4b41b + "\nSWAP Count   : " + (_0x2d1c53.txCount ?? 0x0) + " / " + Config.SWAPCOUNT + " " + (_0x2d1c53.txCount ?? 0x0 == Config.SWAPCOUNT ? "Finished" : '') + "\n               \nStatus : " + _0x301adf + "\nDelay : " + _0x42c820 + "\n=============================================="
      });
    }
    ["info"](_0x53e8be = '') {
      this.twisters.put(0x2, {
        'text': "\n==============================================\nInfo : " + _0x53e8be + "\n=============================================="
      });
      return;
    }
    ['clearInfo']() {
      this.twisters.remove(0x2);
    }
    ['clear'](_0x3795ee) {
      this.twisters.remove(_0x3795ee);
    }
  }
  export default new Twist();
