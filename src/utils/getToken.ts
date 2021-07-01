// Временное решение
import { request } from '.';

const store = new Map();

const random = () => {
  return Math.random();
};

const generateToken = () => {
  const length = 64;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const base = characters.length;
  let key = '';
  for (let i = 0; i < length; i++) {
    const index = Math.floor(random() * base);
    key += characters[index];
  }
  return key;
};

async function getToken() {
  let tokens: string[] = store.get('tokens') ?? [];
  if (tokens.length <= 10) {
    const res = await request({ path: 'project/getTokens' });
    console.log({ res });
    tokens = res.data ?? [];
    // tokens = res.data ?? [...Array(30).keys()].map(generateToken);
  }
  const token = tokens.shift();
  store.set('tokens', tokens);
  console.log({ store, tokens, token });
  return token;
}

export default getToken;
