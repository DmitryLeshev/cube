// Временное решение
import { getToken, request, mock } from '.';

function fetchData(iface: string) {
  return async (packet: any) => {
    const [method, args]: any = Object.entries(packet)[0];
    const path = `${iface}/${method}`;
    const token = await getToken();
    if (args.mock) return await mock({ path, args, token });
    return await request({ path, args, token });
  };
}

export default fetchData;
