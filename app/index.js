import { privateKey } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { COINENUM } from './src/core/coin/coin_enum.js';
import a0_0x52d6f4 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x47fbca from './src/utils/logger.js';
async function operation(_0xcba1ac) {
  const _0x47337e = new a0_0x52d6f4(_0xcba1ac);
  try {
    await _0x47337e.getAccountInfo();
    await _0x47337e.getBalance(true);
    await _0x47337e.requestFaucet();
    const _0x3fb804 = await _0x47337e.checkNFT();
    if (_0x3fb804 == false) {
      await _0x47337e.mintNft();
    }
    const _0x3d794e = _0x47337e.balance;
    const _0x67e942 = _0x3d794e.find(_0x3b1ae4 => _0x3b1ae4.coinType === COINENUM.SUI);
    const _0x36ce85 = _0x67e942 ? _0x67e942.totalBalance : 0x0;
    for (const _0x273ac3 of new Array(Config.SWAPCOUNT)) {
      if (_0x36ce85 < Config.TXAMOUNTMAX) {
        throw Error("Min balance is " + Config.TXAMOUNTMAX + " SUI");
      }
      try {
        await _0x47337e.exSuiToWal();
        await _0x47337e.exWalToSui();
        _0x47337e.txCount += 0x1;
      } catch (_0x5c7037) {}
    }
    if (_0x36ce85 < Config.TXAMOUNTMAX) {
      throw Error("Min balance is " + Config.TXAMOUNTMAX + " SUI");
    }
    await _0x47337e.exSuiToWal();
    await _0x47337e.stakeWalToOperator();
    const _0x4c9b98 = Config.DELAYINHOURS ?? 0x6;
    const _0x3f5dc0 = 3600000 * _0x4c9b98;
    await Helper.delay(_0x3f5dc0, _0xcba1ac, "Account " + (privateKey.indexOf(_0xcba1ac) + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(_0x3f5dc0), _0x47337e);
    await operation(_0xcba1ac);
  } catch (_0x52e31c) {
    if (_0x52e31c.message) {
      await Helper.delay(0x2710, _0xcba1ac, "Error : " + _0x52e31c.message + ", Retry again after 10 Second", _0x47337e);
    } else {
      await Helper.delay(0x2710, _0xcba1ac, "Error :" + JSON.stringify(_0x52e31c) + ", Retry again after 10 Second", _0x47337e);
    }
    await operation(_0xcba1ac);
  }
}
async function startBot() {
  const _0x15dd32 = {
    'xLtaK': "Please input your account first on accounts.js file",
    'ykiBG': function (_0x2883bb) {
      return _0x2883bb();
    }
  };
  return new Promise(async (_0x221f31, _0x341731) => {
    try {
      a0_0x47fbca.info("BOT STARTED");
      if (privateKey.length == 0x0) {
        throw Error("Please input your account first on accounts.js file");
      }
      const _0x1535c5 = [];
      for (const _0x69befc of privateKey) {
        _0x1535c5.push(operation(_0x69befc));
      }
      await Promise.all(_0x1535c5);
      _0x221f31();
    } catch (_0x34d74d) {
      a0_0x47fbca.info("BOT STOPPED");
      a0_0x47fbca.error(JSON.stringify(_0x34d74d));
      _0x341731(_0x34d74d);
    }
  });
}
(async () => {
  const _0x17ba49 = {
    'wYvik': 'jGKWC',
    'CEpqr': "lhkwr"
  };
  try {
    a0_0x47fbca.clear();
    a0_0x47fbca.info('');
    a0_0x47fbca.info("Application Started");
    console.log("WALRUS BOT");
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
  } catch (_0x178215) {
    console.log("Error During executing bot", _0x178215);
    throw _0x178215;
  }
})();
