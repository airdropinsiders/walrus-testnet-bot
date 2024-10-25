  import { Config } from '../../../config/config.js';
  export class RPC {
    static ['NETWORK'] = Config.RPC.NETWORK ?? "testnet";
    static ['EXPLORER'] = Config.RPC.EXPLORER ?? "https://testnet.suivision.xyz/";
  }
