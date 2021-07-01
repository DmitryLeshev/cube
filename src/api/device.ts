import { fetchData } from '@/utils';

const fetchDevice = fetchData('device');

interface IApiDevice {
  list: () => any;
  genCert: ({ id }: { id: number }) => any;
}

const device: IApiDevice = {
  list: async () => await fetchDevice({ list: {} }),
  genCert: async ({ id }) => await fetchDevice({ genCert: { id } }),
};

export { device };
