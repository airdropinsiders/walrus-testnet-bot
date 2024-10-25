import { privateKey } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { COINENUM } from './src/core/coin/coin_enum.js';
import a0_0x3a450d from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x140d1b from './src/utils/logger.js';
async function operation(_0x320205) {
  const _0xffaa87 = new a0_0x3a450d(_0x320205);
  try {
    await _0xffaa87.getAccountInfo();
    await _0xffaa87.getBalance(true);
    await _0xffaa87.requestFaucet();
    const _0x1bc429 = await _0xffaa87.checkNFT();
    if (_0x1bc429 == false) {
      await _0xffaa87.mintNft();
    }
    const _0x13d7cf = _0xffaa87.balance;
    const _0x47c2bd = _0x13d7cf.find(_0x560197 => _0x560197.coinType === COINENUM.SUI);
    const _0x486388 = _0x47c2bd ? _0x47c2bd.totalBalance : 0x0;
    for (const _0xf7806c of new Array(Config.SWAPCOUNT)) {
      if (_0x486388 < Config.TXAMOUNTMAX) {
        throw Error("Min balance is " + Config.TXAMOUNTMAX + " SUI");
      }
      try {
        await _0xffaa87.exSuiToWal();
        await _0xffaa87.exWalToSui();
        _0xffaa87.txCount += 0x1;
      } catch (_0x583576) {}
    }
    if (_0x486388 < Config.TXAMOUNTMAX) {
      throw Error("Min balance is " + Config.TXAMOUNTMAX + " SUI");
    }
    await _0xffaa87.exSuiToWal();
    await _0xffaa87.stakeWalToOperator();
    const _0x480c33 = Config.DELAYINHOURS ?? 0x6;
    const _0x5b6d88 = 3600000 * _0x480c33;
    await Helper.delay(_0x5b6d88, _0x320205, "Account " + (privateKey.indexOf(_0x320205) + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(_0x5b6d88), _0xffaa87);
    await operation(_0x320205);
  } catch (_0x38d82a) {
    if (_0x38d82a.message) {
      await Helper.delay(0x2710, _0x320205, "Error : " + _0x38d82a.message + ", Retry again after 10 Second", _0xffaa87);
    } else {
      await Helper.delay(0x2710, _0x320205, "Error :" + JSON.stringify(_0x38d82a) + ", Retry again after 10 Second", _0xffaa87);
    }
    await operation(_0x320205);
  }
}
async function startBot() {
  const _0x1607bc = {
    'lMmgE': function (_0x39ee12, _0x357c7e) {
      return _0x39ee12(_0x357c7e);
    },
    'iEKVy': "kdaAi"
  };
  return new Promise(async (_0x250f5a, _0x320a33) => {
    try {
      a0_0x140d1b.info("BOT STARTED");
      if (privateKey.length == 0x0) {
        throw Error("Please input your account first on accounts.js file");
      }
      const _0x2f9b84 = [];
      for (const _0x48f4fb of privateKey) {
        _0x2f9b84.push(operation(_0x48f4fb));
      }
      await Promise.all(_0x2f9b84);
      _0x250f5a();
    } catch (_0x437332) {
      a0_0x140d1b.info("BOT STOPPED");
      a0_0x140d1b.error(JSON.stringify(_0x437332));
      _0x320a33(_0x437332);
    }
  });
}
(async () => {
  try {
    a0_0x140d1b.clear();
    a0_0x140d1b.info('');
    a0_0x140d1b.info("Application Started");
    console.log("SUI WALRUS BOT");
    console.log();
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    if (privateKey.length < 0x1) {
      throw Error("Please set up accounts.js first");
    }
    await startBot();
  } catch (_0x2c2e71) {
    console.log("Error During executing bot", _0x2c2e71);
    throw _0x2c2e71;
  }
})();
