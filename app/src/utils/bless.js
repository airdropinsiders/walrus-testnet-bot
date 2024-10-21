import a4_0x920b2e from 'blessed';
import a4_0x782957 from './logger.js';
import a4_0x7c74d5 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { COINENUM } from '../core/coin/coin_enum.js';
import { Config } from '../../config/config.js';
export class Bless {
  constructor() {
    this.screen = a4_0x920b2e.screen({
      'smartCSR': true
    });
    this.screen.title = "AIRDROP INSIDER";
    this.titleBox = a4_0x920b2e.box({
      'top': 0x0,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "{center}WALRUS TX BOT{/center}",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.titleBox);
    this.subTitle = a4_0x920b2e.box({
      'top': 0x1,
      'left': "center",
      'width': "shrink",
      'height': 0x2,
      'tags': true,
      'content': "By: Airdrop - Insider (https://t.me/AirdropInsiderID)",
      'style': {
        'fg': "white",
        'bold': true
      }
    });
    this.screen.append(this.subTitle);
    this.tabList = a4_0x920b2e.box({
      'top': 0x5,
      'left': "center",
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.tabList);
    this.hintBox = a4_0x920b2e.box({
      'bottom': 0x0,
      'left': 'center',
      'width': "100%",
      'height': 0x3,
      'tags': true,
      'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
      'style': {
        'fg': 'white'
      }
    });
    this.screen.append(this.hintBox);
    this.infoBox = a4_0x920b2e.box({
      'bottom': 0x3,
      'left': 'center',
      'width': '100%',
      'height': 0x3,
      'tags': true,
      'content': '',
      'style': {
        'fg': "white"
      }
    });
    this.screen.append(this.infoBox);
    this.tabs = [];
    this.currentTabIndex = 0x0;
    privateKey.forEach((_0x41d675, _0x351761) => {
      const _0xb92236 = this.createAccountTab("Account " + (_0x351761 + 0x1));
      this.tabs.push(_0xb92236);
      this.screen.append(_0xb92236);
      _0xb92236.hide();
    });
    if (this.tabs.length > 0x0) {
      this.tabs[0x0].show();
    }
    this.renderTabList();
    this.screen.key(['q', "C-c"], () => {
      return process.exit(0x0);
    });
    this.screen.key(["left", 'right'], (_0x22df2c, _0x4d694e) => {
      if (_0x4d694e.name === "right") {
        this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
      } else if (_0x4d694e.name === 'left') {
        this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
      }
    });
    this.screen.render();
  }
  ["createAccountTab"](_0x5456a8) {
    return a4_0x920b2e.box({
      'label': _0x5456a8,
      'top': 0x6,
      'left': 0x0,
      'width': "100%",
      'height': "shrink",
      'border': {
        'type': "line"
      },
      'style': {
        'fg': "white",
        'border': {
          'fg': '#f0f0f0'
        }
      },
      'tags': true
    });
  }
  ["renderTabList"]() {
    let _0x2cd63e = '';
    privateKey.forEach((_0x1bd9e5, _0x4ce17f) => {
      if (_0x4ce17f === this.currentTabIndex) {
        _0x2cd63e += "{blue-fg}{bold} Account " + (_0x4ce17f + 0x1) + " {/bold}{/blue-fg} ";
      } else {
        _0x2cd63e += " Account " + (_0x4ce17f + 0x1) + " ";
      }
    });
    this.tabList.setContent("{center}" + _0x2cd63e + "{/center}");
    this.screen.render();
  }
  ["switchTab"](_0xc3f967) {
    this.tabs[this.currentTabIndex].hide();
    this.currentTabIndex = _0xc3f967;
    this.tabs[this.currentTabIndex].show();
    this.renderTabList();
    this.screen.render();
  }
  ["log"](_0x51a2eb = '', _0x114ecf = '', _0x58412d = new a4_0x7c74d5(), _0x336807) {
    const _0x244258 = privateKey.find(_0x38310b => _0x38310b == _0x114ecf);
    const _0x1edc9a = privateKey.indexOf(_0x244258);
    if (_0x336807 === undefined) {
      a4_0x782957.info("Account " + (_0x1edc9a + 0x1) + " - " + _0x51a2eb);
      _0x336807 = '-';
    }
    const _0x97221b = _0x58412d.address ?? '-';
    const _0x4dc602 = _0x58412d.balance ?? [];
    const _0x4d51a9 = _0x4dc602.find(_0x444cd8 => _0x444cd8.coinType === COINENUM.SUI);
    const _0x315867 = (_0x4d51a9 ? _0x4d51a9.totalBalance : '?') + " SUI";
    const _0x41debd = _0x4dc602.find(_0x120d50 => _0x120d50.coinType === COINENUM.WAL);
    const _0x391bd1 = (_0x41debd ? _0x41debd.totalBalance : '?') + " WAL";
    const _0x51c128 = "\nAddress      : " + _0x97221b + "\nBalance      : - " + _0x315867 + "\n               - " + _0x391bd1 + "\nSWAP Count   : " + (_0x58412d.txCount ?? 0x0) + " / " + Config.SWAPCOUNT + " " + (_0x58412d.txCount ?? 0x0 == Config.SWAPCOUNT ? "Finished" : '') + "\n               \nStatus : " + _0x51a2eb + "\nDelay : " + _0x336807;
    this.tabs[_0x1edc9a].setContent(_0x51c128);
    this.screen.render();
  }
  ["info"](_0x48d5d4 = '') {
    const _0x304c77 = "\n{center}Info: " + _0x48d5d4 + "{/center}\n";
    this.infoBox.setContent(_0x304c77);
    this.screen.render();
  }
  ["clearInfo"]() {
    this.infoBox.setContent('');
    this.screen.render();
  }
}