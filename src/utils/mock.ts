interface Request {
  path: string;
  args?: any;
  token?: string;
}

async function mock({ path, args, token }: Request) {
  const [iface, method] = path.split('/');
  const filePath = `mock/${iface}/${method}.json`;
  try {
    const json = await fetch(filePath);
    const data = await json.json();
    console.log({ data, args, token });
    return data;
  } catch (error) {
    console.log({ error });
  }
}

export default mock;
