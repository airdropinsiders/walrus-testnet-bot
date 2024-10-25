  import a5_0x2a58dd from 'bip39';
  import a5_0x5beda4 from './twist.js';
  import a5_0x34f15c from 'moment-timezone';
  import { Config } from '../../config/config.js';
  import { Bless } from './bless.js';
  export class Helper {
    static ["display"] = Config.DISPLAY;
    static ["bless"] = this.display == 'TWIST' ? undefined : new Bless();
    static ["delay"] = (_0x1d8005, _0xdfe6fa, _0x3f7e99, _0xade200) => {
      return new Promise(_0x54d67f => {
        let _0x43fb52 = _0x1d8005;
        if (_0xdfe6fa != undefined) {
          if (this.display == "TWIST") {
            a5_0x5beda4.log(_0x3f7e99, _0xdfe6fa, _0xade200, "Delaying for " + this.msToTime(_0x1d8005));
          } else {
            this.bless.log(_0x3f7e99, _0xdfe6fa, _0xade200, "Delaying for " + this.msToTime(_0x1d8005));
          }
        } else {
          if (this.display == 'TWIST') {
            a5_0x5beda4.info("Delaying for " + this.msToTime(_0x1d8005));
          } else {
            this.bless.info("Delaying for " + this.msToTime(_0x1d8005));
          }
        }
        const _0x4ccb2b = setInterval(() => {
          _0x43fb52 -= 0x3e8;
          if (_0xdfe6fa != undefined) {
            if (this.display == 'TWIST') {
              a5_0x5beda4.log(_0x3f7e99, _0xdfe6fa, _0xade200, "Delaying for " + this.msToTime(_0x43fb52));
            } else {
              this.bless.log(_0x3f7e99, _0xdfe6fa, _0xade200, "Delaying for " + this.msToTime(_0x43fb52));
            }
          } else {
            if (this.display == "TWIST") {
              a5_0x5beda4.info("Delaying for " + this.msToTime(_0x43fb52));
            } else {
              this.bless.info("Delaying for " + this.msToTime(_0x43fb52));
            }
          }
          if (_0x43fb52 <= 0x0) {
            clearInterval(_0x4ccb2b);
            _0x54d67f();
          }
        }, 0x3e8);
        setTimeout(async () => {
          clearInterval(_0x4ccb2b);
          if (this.display == "TWIST") {
            await a5_0x5beda4.clearInfo();
          } else {
            await this.bless.clearInfo();
          }
          if (_0xdfe6fa) {
            if (this.display == 'TWIST') {
              a5_0x5beda4.log(_0x3f7e99, _0xdfe6fa, _0xade200);
            } else {
              this.bless.log(_0x3f7e99, _0xdfe6fa, _0xade200);
            }
          }
          _0x54d67f();
        }, _0x1d8005);
      });
    };
    static ['randomUserAgent']() {
      const _0x12a9f5 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
      return _0x12a9f5[Math.floor(Math.random() * _0x12a9f5.length)];
    }
    static ["readTime"](_0x3e8248) {
      const _0x5b5e19 = a5_0x34f15c.unix(_0x3e8248);
      return _0x5b5e19.format("YYYY-MM-DD HH:mm:ss");
    }
    static ["getCurrentTimestamp"]() {
      const _0x2ec2ac = a5_0x34f15c().tz('Asia/Singapore').unix();
      return _0x2ec2ac.toString();
    }
    static ['random'](_0x18d93d, _0x358051) {
      const _0x586850 = Math.floor(Math.random() * (_0x358051 - _0x18d93d + 0x1)) + _0x18d93d;
      return _0x586850;
    }
    static ['randomFloat'](_0x2c525f, _0x140bd5, _0x15d3e0 = 0x4) {
      const _0x415473 = Math.random() * (_0x140bd5 - _0x2c525f) + _0x2c525f;
      return parseFloat(_0x415473.toFixed(_0x15d3e0));
    }
    static ['msToTime'](_0x86de5f) {
      const _0x3bb1a5 = Math.floor(_0x86de5f / 3600000);
      const _0x121fd5 = _0x86de5f % 3600000;
      const _0x2e29fe = Math.floor(_0x121fd5 / 60000);
      const _0x48b9d6 = _0x121fd5 % 60000;
      const _0x3041c8 = Math.round(_0x48b9d6 / 0x3e8);
      return _0x3bb1a5 + " Hours " + _0x2e29fe + " Minutes " + _0x3041c8 + " Seconds";
    }
    static ['generateRandomString'](_0x345fee) {
      let _0x18cd10 = '';
      const _0x17c2fb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
      for (let _0x2613bf = 0x0; _0x2613bf < _0x345fee; _0x2613bf++) {
        _0x18cd10 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x17c2fb));
      }
      return _0x18cd10;
    }
    static ["serializeBigInt"] = _0x559d3a => {
      return JSON.parse(JSON.stringify(_0x559d3a, (_0x389ed8, _0x11b6b2) => typeof _0x11b6b2 === 'bigint' ? _0x11b6b2.toString() : _0x11b6b2));
    };
    static ["isMnemonic"](_0x4926bc) {
      return a5_0x2a58dd.validateMnemonic(_0x4926bc);
    }
    static ["isPrivateKey"](_0x27d1ba) {
      const _0x15891f = _0x27d1ba.replace(/^0x/, '');
      const _0x5ceb66 = /^[a-fA-F0-9]{64}$/;
      return _0x5ceb66.test(_0x15891f);
    }
    static ['determineType'](_0x2402b2) {
      if (this.isMnemonic(_0x2402b2)) {
        return "Secret Phrase";
      } else {
        if (this.isPrivateKey(_0x2402b2)) {
          return "Private Key";
        } else {
          return 'Unknown';
        }
      }
    }
    static ['isToday'](_0x40a64f) {
      const _0x39c163 = new Date(_0x40a64f);
      const _0x1d1d9c = new Date();
      _0x1d1d9c.setHours(0x0, 0x0, 0x0, 0x0);
      const _0x2f5af5 = new Date(_0x39c163);
      _0x2f5af5.setHours(0x0, 0x0, 0x0, 0x0);
      if (_0x2f5af5.getTime() === _0x1d1d9c.getTime()) {
        return true;
      } else {
        return false;
      }
    }
    static ['showSkelLogo']() {
      console.log("AIRDROP INSIDERS");
    }
  }
