const URL = 'http://192.168.2.166/';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: '/',
  'Cache-Control': 'no-cache',
};

async function fetchData(packet: any) {
  const [path, args = {}] = Object.entries(packet)[0];
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: HEADERS,
      credentials: 'include',
      body: JSON.stringify({ path, args }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log({ 'fetch data error': error });
    return error;
  }
}

export { fetchData };
