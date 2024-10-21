import { Twisters } from 'twisters';
import a7_0x2635b1 from './logger.js';
import a7_0x10eca8 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import '../core/network/rpc.js';
import { Config } from '../../config/config.js';
import { COINENUM } from '../core/coin/coin_enum.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x18f9e8 = '', _0x56a52a = '', _0x8e92a0 = new a7_0x10eca8(), _0x81e56c) {
    const _0xdd0bee = privateKey.indexOf(_0x56a52a);
    if (_0x81e56c == undefined) {
      a7_0x2635b1.info("Account " + (_0xdd0bee + 0x1) + " - " + _0x18f9e8);
      _0x81e56c = '-';
    }
    const _0x47c473 = _0x8e92a0.address ?? '-';
    const _0x3a1c60 = _0x8e92a0.balance ?? [];
    const _0x3ffecf = _0x3a1c60.find(_0x3503a5 => _0x3503a5.coinType === COINENUM.SUI);
    const _0x3fd994 = (_0x3ffecf ? _0x3ffecf.totalBalance : '?') + " SUI";
    const _0x178d47 = _0x3a1c60.find(_0x27efcd => _0x27efcd.coinType === COINENUM.WAL);
    const _0x2374f5 = (_0x178d47 ? _0x178d47.totalBalance : '?') + " WAL";
    this.twisters.put(_0x56a52a, {
      'text': "\n================== Account " + (_0xdd0bee + 0x1) + " =================\nAddress      : " + _0x47c473 + "\nBalance      : - " + _0x3fd994 + "\n               - " + _0x2374f5 + "\nSWAP Count   : " + (_0x8e92a0.txCount ?? 0x0) + " / " + Config.SWAPCOUNT + " " + (_0x8e92a0.txCount ?? 0x0 == Config.SWAPCOUNT ? 'Finished' : '') + "\n               \nStatus : " + _0x18f9e8 + "\nDelay : " + _0x81e56c + "\n=============================================="
    });
  }
  ["info"](_0x36f097 = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x36f097 + "\n=============================================="
    });
    return;
  }
  ['clearInfo']() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x158fdb) {
    this.twisters.remove(_0x158fdb);
  }
}
export default new Twist();