import { privateKey } from './accounts/accounts.js';
import { Config } from './config/config.js';
import { COINENUM } from './src/core/coin/coin_enum.js';
import a0_0x4162c4 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0xf8f83 from './src/utils/logger.js';
async function operation(_0x10a468) {
  const _0x173c17 = new a0_0x4162c4(_0x10a468);
  try {
    await _0x173c17.getAccountInfo();
    await _0x173c17.getBalance(true);
    await _0x173c17.requestFaucet();
    const _0x1d3f45 = await _0x173c17.checkNFT();
    if (_0x1d3f45 == false) {
      await _0x173c17.mintNft();
    }
    const _0xebfae5 = _0x173c17.balance;
    const _0xd75070 = _0xebfae5.find(_0x2a03ee => _0x2a03ee.coinType === COINENUM.SUI);
    const _0xd3e1b9 = _0xd75070 ? _0xd75070.totalBalance : 0x0;
    for (const _0x4989a8 of new Array(Config.SWAPCOUNT)) {
      if (_0xd3e1b9 < Config.TXAMOUNTMAX) {
        throw Error("Min balance is " + Config.TXAMOUNTMAX + " SUI");
      }
      try {
        await _0x173c17.exSuiToWal();
        await _0x173c17.exWalToSui();
        _0x173c17.txCount += 0x1;
      } catch (_0x2bca77) {}
    }
    if (_0xd3e1b9 < Config.TXAMOUNTMAX) {
      throw Error("Min balance is " + Config.TXAMOUNTMAX + " SUI");
    }
    await _0x173c17.exSuiToWal();
    await _0x173c17.stakeWalToOperator();
    const _0x1af0f0 = Config.DELAYINHOURS ?? 0x6;
    const _0x4b8bfa = 3600000 * _0x1af0f0;
    await Helper.delay(_0x4b8bfa, _0x10a468, "Account " + (privateKey.indexOf(_0x10a468) + 0x1) + " Processing Done, Delaying for " + Helper.msToTime(_0x4b8bfa), _0x173c17);
    await operation(_0x10a468);
  } catch (_0x505778) {
    if (_0x505778.message) {
      await Helper.delay(0x2710, _0x10a468, "Error : " + _0x505778.message + ", Retry again after 10 Second", _0x173c17);
    } else {
      await Helper.delay(0x2710, _0x10a468, "Error :" + JSON.stringify(_0x505778) + ", Retry again after 10 Second", _0x173c17);
    }
    await operation(_0x10a468);
  }
}
async function startBot() {
  return new Promise(async (_0x1c1fe2, _0x4a0de9) => {
    try {
      a0_0xf8f83.info("BOT STARTED");
      if (privateKey.length == 0x0) {
        throw Error("Please input your account first on accounts.js file");
      }
      const _0x256c88 = [];
      for (const _0x8b7484 of privateKey) {
        _0x256c88.push(operation(_0x8b7484));
      }
      await Promise.all(_0x256c88);
      _0x1c1fe2();
    } catch (_0x3a6c00) {
      a0_0xf8f83.info("BOT STOPPED");
      a0_0xf8f83.error(JSON.stringify(_0x3a6c00));
      _0x4a0de9(_0x3a6c00);
    }
  });
}
(async () => {
  try {
    a0_0xf8f83.clear();
    a0_0xf8f83.info('');
    a0_0xf8f83.info("Application Started");
    console.log("WALRUS TESTNET BOT");
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
  } catch (_0x158749) {
    console.log("Error During executing bot", _0x158749);
    throw _0x158749;
  }
})();