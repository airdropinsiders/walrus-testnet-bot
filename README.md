# WALRUS TESTNET BOT
The Walrus Testnet Bot is a powerful tool designed for interacting with SUI Testnet networks. This bot automates transaction processes, enabling users to perform actions such as Swapping between SUI and WAL, Stake to a Node Operator and Request Faucet seamlessly and daily making it an ideal solution for you to do your Walrus Testnet Airdrop.

## Prerequisite
- Git
- Node JS (v22)

## Join My Telegram Channel
join here
[**https://t.me/AirdropInsiderID**](https://t.me/AirdropInsiderID).

## WALRUS TESTNET AIRDROP
Walrus Protocol Potential Testnet
Network : SUI

- Connect new SUI wallet : https://stake.walrus.site/ (TESTNET) 
- Get faucet : https://discord.com/invite/sui
- Exchange SUI to WAL
- Stake 
- Done

**LFG & DWYOR**

## BOT FEATURE
- Multi Account 
- Support PK
- Auto Request Faucet
- Auto Swap both SUI and WAL
- Auto Stake
- Auto Mint 1 Flatlander NFT


## Setup & Configure BOT

### Linux
1. Clone project repo
   ```
   git clone https://github.com/vinskasenda/walrus-testnet-bot.git && cd walrus-testnet-bot
   ```
2. Run
   ```
   npm install
   ```
3. Run
   ```
   cp -r accounts/accounts_tmp.js accounts/accounts.js && cp -r config/config_tmp.js config/config.js
   ```
4. Configure your accounts
   ```
   nano accounts/accounts.js
   ```
5. Configure the bot config
    ```
   nano config/config.js
    ```
6. To run Auto TX
   ```
   npm run start
   ```
   
### Windows
1. Open your `Command Prompt` or `Power Shell`.
2. Clone project repo
   ```
   git clone https://github.com/vinskasenda/walrus-testnet-bot.git
   ```
   and cd to project dir
   ```
   cd walrus-testnet-bot
   ```
3. Run 
   ```
   npm install
   ```
5. Navigate to `walrus-testnet-bot` directory. 
6. Navigate to `accounts` folder and rename `accounts_tmp.js` to `accounts.js`.
7. Now open `acccounts.js` and setup your accounts. 
8. Now Back to `walrus-testnet-bot` directory and Navigate to `config` and rename `config_tmp.js` to `config.js` adjust the `config.js` as needed.
9.  Back to `walrus-testnet-bot` directory.
10. To start the app open your `Command Prompt` or `Power Shell`
11. To run auto Tx Bot
    ```
    npm run start
    ```

## Update Bot

To update bot follow this step :
1. run
   ```
   git pull
   ```
   or
   ```
   git pull --rebase
   ```
   if error run
   ```
   git stash && git pull
   ```
2. run
   ```
   npm update
   ```
2. start the bot
