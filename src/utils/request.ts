// Временное решение
const { host } = window.location;
const serverHost = '192.168.2.2';
const URL = `http://${host.startsWith('localhost') ? serverHost : host}/index.php`;
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: '/',
  'Cache-Control': 'no-cache',
};

async function request({
  path,
  args,
  token,
}: {
  path: string;
  args?: any;
  token?: string;
}) {
  try {
    console.log({ [path]: args, token });

    const options: any = {
      method: 'POST',
      headers: HEADERS,
      credentials: 'include',
      body: JSON.stringify({ path, args, token }),
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    console.log({ [path]: data });
    return data;
  } catch (error) {
    console.log('[request] block catch', error);
    return error;
  }
}

export default request;
