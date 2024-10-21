import a5_0x19776a from 'bip39';
import a5_0x252f85 from './twist.js';
import a5_0x56013e from 'moment-timezone';
import { Config } from '../../config/config.js';
import { Bless } from './bless.js';
export class Helper {
  static ['display'] = Config.DISPLAY;
  static ["bless"] = this.display == "TWIST" ? undefined : new Bless();
  static ["delay"] = (_0x26dbf1, _0xacd44b, _0x283a7c, _0x13138a) => {
    return new Promise(_0x1bac5f => {
      let _0x4212a2 = _0x26dbf1;
      if (_0xacd44b != undefined) {
        if (this.display == "TWIST") {
          a5_0x252f85.log(_0x283a7c, _0xacd44b, _0x13138a, "Delaying for " + this.msToTime(_0x26dbf1));
        } else {
          this.bless.log(_0x283a7c, _0xacd44b, _0x13138a, "Delaying for " + this.msToTime(_0x26dbf1));
        }
      } else if (this.display == "TWIST") {
        a5_0x252f85.info("Delaying for " + this.msToTime(_0x26dbf1));
      } else {
        this.bless.info("Delaying for " + this.msToTime(_0x26dbf1));
      }
      const _0x34441b = setInterval(() => {
        _0x4212a2 -= 0x3e8;
        if (_0xacd44b != undefined) {
          if (this.display == "TWIST") {
            a5_0x252f85.log(_0x283a7c, _0xacd44b, _0x13138a, "Delaying for " + this.msToTime(_0x4212a2));
          } else {
            this.bless.log(_0x283a7c, _0xacd44b, _0x13138a, "Delaying for " + this.msToTime(_0x4212a2));
          }
        } else if (this.display == "TWIST") {
          a5_0x252f85.info("Delaying for " + this.msToTime(_0x4212a2));
        } else {
          this.bless.info("Delaying for " + this.msToTime(_0x4212a2));
        }
        if (_0x4212a2 <= 0x0) {
          clearInterval(_0x34441b);
          _0x1bac5f();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x34441b);
        if (this.display == "TWIST") {
          await a5_0x252f85.clearInfo();
        } else {
          await this.bless.clearInfo();
        }
        if (_0xacd44b) {
          if (this.display == "TWIST") {
            a5_0x252f85.log(_0x283a7c, _0xacd44b, _0x13138a);
          } else {
            this.bless.log(_0x283a7c, _0xacd44b, _0x13138a);
          }
        }
        _0x1bac5f();
      }, _0x26dbf1);
    });
  };
  static ["randomUserAgent"]() {
    const _0x18093e = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x18093e[Math.floor(Math.random() * _0x18093e.length)];
  }
  static ["readTime"](_0x18aceb) {
    const _0x19aa88 = a5_0x56013e.unix(_0x18aceb);
    return _0x19aa88.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x341212 = a5_0x56013e().tz('Asia/Singapore').unix();
    return _0x341212.toString();
  }
  static ["random"](_0x39ddf3, _0x3f02d4) {
    const _0x7bab62 = Math.floor(Math.random() * (_0x3f02d4 - _0x39ddf3 + 0x1)) + _0x39ddf3;
    return _0x7bab62;
  }
  static ["randomFloat"](_0xc2bc8e, _0x1084cf, _0x2ed446 = 0x4) {
    const _0x19a7f0 = Math.random() * (_0x1084cf - _0xc2bc8e) + _0xc2bc8e;
    return parseFloat(_0x19a7f0.toFixed(_0x2ed446));
  }
  static ['msToTime'](_0x2eeac1) {
    const _0x4495b5 = Math.floor(_0x2eeac1 / 3600000);
    const _0x12b630 = _0x2eeac1 % 3600000;
    const _0x3ea709 = Math.floor(_0x12b630 / 60000);
    const _0x3c3dc8 = _0x12b630 % 60000;
    const _0x292a5e = Math.round(_0x3c3dc8 / 0x3e8);
    return _0x4495b5 + " Hours " + _0x3ea709 + " Minutes " + _0x292a5e + " Seconds";
  }
  static ["generateRandomString"](_0x4b6ec2) {
    let _0x55bad4 = '';
    const _0x5e0dc8 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x2dc295 = 0x0; _0x2dc295 < _0x4b6ec2; _0x2dc295++) {
      _0x55bad4 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x5e0dc8));
    }
    return _0x55bad4;
  }
  static ["serializeBigInt"] = _0x337ce3 => {
    return JSON.parse(JSON.stringify(_0x337ce3, (_0x28e728, _0x2a3a43) => typeof _0x2a3a43 === "bigint" ? _0x2a3a43.toString() : _0x2a3a43));
  };
  static ['isMnemonic'](_0x34aff3) {
    return a5_0x19776a.validateMnemonic(_0x34aff3);
  }
  static ["isPrivateKey"](_0x1369fa) {
    const _0x2b777f = _0x1369fa.replace(/^0x/, '');
    const _0x2b108d = /^[a-fA-F0-9]{64}$/;
    return _0x2b108d.test(_0x2b777f);
  }
  static ['determineType'](_0x465954) {
    if (this.isMnemonic(_0x465954)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x465954) ? "Private Key" : 'Unknown';
    }
  }
  static ['isToday'](_0x580e5c) {
    const _0x1b82e0 = new Date(_0x580e5c);
    const _0x13d610 = new Date();
    _0x13d610.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x12ca4a = new Date(_0x1b82e0);
    _0x12ca4a.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x12ca4a.getTime() === _0x13d610.getTime());
  }
  static ["showSkelLogo"]() {
    console.log("AIRDROP INSIDERS");
  }
}