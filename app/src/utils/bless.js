  import a4_0x2fb614 from 'blessed';
  import a4_0xb0d0ea from './logger.js';
  import a4_0x74312a from '../core/core.js';
  import { privateKey } from '../../accounts/accounts.js';
  import { COINENUM } from '../core/coin/coin_enum.js';
  import { Config } from '../../config/config.js';
  export class Bless {
    constructor() {
      this.screen = a4_0x2fb614.screen({
        'smartCSR': true
      });
      this.screen.title = "AirdropInsider";
      this.titleBox = a4_0x2fb614.box({
        'top': 0x0,
        'left': "center",
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "{center}WALRUS TX BOT{/center}",
        'style': {
          'fg': "white",
          'bold': true
        }
      });
      this.screen.append(this.titleBox);
      this.subTitle = a4_0x2fb614.box({
        'top': 0x1,
        'left': 'center',
        'width': "shrink",
        'height': 0x2,
        'tags': true,
        'content': "By: Airdrop - Insider (https://t.me/AirdropInsiderID)",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.subTitle);
      this.tabList = a4_0x2fb614.box({
        'top': 0x5,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'style': {
          'fg': "white"
        }
      });
      this.screen.append(this.tabList);
      this.hintBox = a4_0x2fb614.box({
        'bottom': 0x0,
        'left': 'center',
        'width': "100%",
        'height': 0x3,
        'tags': true,
        'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
        'style': {
          'fg': "white"
        }
      });
      this.screen.append(this.hintBox);
      this.infoBox = a4_0x2fb614.box({
        'bottom': 0x3,
        'left': 'center',
        'width': "100%",
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
      privateKey.forEach((_0x4dd413, _0x5b2106) => {
        const _0x26301e = this.createAccountTab("Account " + (_0x5b2106 + 0x1));
        this.tabs.push(_0x26301e);
        this.screen.append(_0x26301e);
        _0x26301e.hide();
      });
      if (this.tabs.length > 0x0) {
        this.tabs[0x0].show();
      }
      this.renderTabList();
      this.screen.key(['q', "C-c"], () => {
        return process.exit(0x0);
      });
      this.screen.key(['left', "right"], (_0x1cfe48, _0x46fc3c) => {
        if (_0x46fc3c.name === 'right') {
          this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
        } else {
          if (_0x46fc3c.name === "left") {
            this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
          }
        }
      });
      this.screen.render();
    }
    ['createAccountTab'](_0x3aea29) {
      return a4_0x2fb614.box({
        'label': _0x3aea29,
        'top': 0x6,
        'left': 0x0,
        'width': "100%",
        'height': "shrink",
        'border': {
          'type': 'line'
        },
        'style': {
          'fg': 'white',
          'border': {
            'fg': "#f0f0f0"
          }
        },
        'tags': true
      });
    }
    ["renderTabList"]() {
      let _0x2025d3 = '';
      privateKey.forEach((_0x3e8ff2, _0x5a82f2) => {
        if (_0x5a82f2 === this.currentTabIndex) {
          _0x2025d3 += "{blue-fg}{bold} Account " + (_0x5a82f2 + 0x1) + " {/bold}{/blue-fg} ";
        } else {
          _0x2025d3 += " Account " + (_0x5a82f2 + 0x1) + " ";
        }
      });
      this.tabList.setContent("{center}" + _0x2025d3 + "{/center}");
      this.screen.render();
    }
    ["switchTab"](_0x21c66f) {
      this.tabs[this.currentTabIndex].hide();
      this.currentTabIndex = _0x21c66f;
      this.tabs[this.currentTabIndex].show();
      this.renderTabList();
      this.screen.render();
    }
    ['log'](_0x5e2b9a = '', _0x43af83 = '', _0x42e01b = new a4_0x74312a(), _0x305dad) {
      const _0x2374f9 = privateKey.find(_0x183512 => _0x183512 == _0x43af83);
      const _0x38030b = privateKey.indexOf(_0x2374f9);
      if (_0x305dad === undefined) {
        a4_0xb0d0ea.info("Account " + (_0x38030b + 0x1) + " - " + _0x5e2b9a);
        _0x305dad = '-';
      }
      const _0x4f2aa3 = _0x42e01b.address ?? '-';
      const _0x485642 = _0x42e01b.balance ?? [];
      const _0x37ae8c = _0x485642.find(_0x47b704 => _0x47b704.coinType === COINENUM.SUI);
      const _0xad38 = (_0x37ae8c ? _0x37ae8c.totalBalance : '?') + " SUI";
      const _0x4e380b = _0x485642.find(_0x3563d1 => _0x3563d1.coinType === COINENUM.WAL);
      const _0x57db1b = (_0x4e380b ? _0x4e380b.totalBalance : '?') + " WAL";
      const _0x20ff4f = "\nAddress      : " + _0x4f2aa3 + "\nBalance      : - " + _0xad38 + "\n               - " + _0x57db1b + "\nSWAP Count   : " + (_0x42e01b.txCount ?? 0x0) + " / " + Config.SWAPCOUNT + " " + (_0x42e01b.txCount ?? 0x0 == Config.SWAPCOUNT ? 'Finished' : '') + "\n               \nStatus : " + _0x5e2b9a + "\nDelay : " + _0x305dad;
      this.tabs[_0x38030b].setContent(_0x20ff4f);
      this.screen.render();
    }
    ['info'](_0x42f6b8 = '') {
      const _0x3c01e6 = "\n{center}Info: " + _0x42f6b8 + "{/center}\n";
      this.infoBox.setContent(_0x3c01e6);
      this.screen.render();
    }
    ['clearInfo']() {
      this.infoBox.setContent('');
      this.screen.render();
    }
  }
