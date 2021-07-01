import LocalStorageService from './localStorage';
import Subscriptions from './subscriptions';

import { fetchData } from '@/utils';
import api from '@/api';

class Application {
  url: string;
  ls = new LocalStorageService();
  subs = new Subscriptions();
  api = api;
  auth: any = api.auth;
  store: any;

  mode = 'normal';
  status = '';

  bars: any = {};
  settings: any = {};

  constructor({ store }: any) {
    const host = location.host === 'localhost' ? 'localhost' : '192.168.2.2';
    this.url = `${location.protocol}://${host}/index.php`;
    this.store = store;
    this.init();
  }

  async init() {
    console.log('init');
    // this.store.dispatch({ type: '[app] change variant settingbar' });
    this.subs.init();
  }

  async shutdown() {
    console.log('shutdown');
  }

  async restart() {
    console.log('restart');
  }

  async reboot() {
    console.log('reboot');
  }

  async reset() {
    console.log('reset');
  }

  async send(packet: any) {
    const [path, args] = Object.entries(packet)[0];
    const [iface = 'default', method = 'method'] = path.split('/');
    return await fetchData(iface)({ [method]: args });
  }
}

export default Application;
