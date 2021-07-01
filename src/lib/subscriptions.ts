const UpdateIntervalsValue: any = {
  LONG: 60 * 1000,
  NORMAL: 7 * 1000,
  SHORT: 2 * 1000,
};

const KYES_SUBS: string[] = ['long', 'normal', 'short'];

class Subscriptions extends Map {
  constructor() {
    super();
    this.init();
  }

  init(keys: any = []) {
    [...KYES_SUBS, ...keys].forEach((key) => this.set(key, []));
  }

  subscribe(type: string, cb: any) {
    const subs = this.get(type) || [];
    this.set(type, [...subs, cb]);
  }

  unsubscribe(type: string, cb: any) {
    const subs = this.get(type) || [];
    this.set(
      type,
      subs.filter((fn: any) => fn !== cb),
    );
  }

  initSubscriptions() {
    const keys = Array.from(this.keys());
    return keys.map((key: string) => {
      return setInterval(() => {
        if (this.size === 0) return;
        const subs: Function[] = this.get(key) ?? [];
        subs.forEach((cb) => cb());
      }, UpdateIntervalsValue[key.toUpperCase()] ?? 5000);
    });
  }
}

export default Subscriptions;
