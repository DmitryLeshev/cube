import { fetchData } from '@/utils';

const fetchSettings = fetchData('setting');

type TypeState = 'static' | 'pppoe' | 'um' | 'dhcp6' | 'dhcp';

// type TypeIp6al =

interface Params {
  buob?: boolean;
  dhcpHost?: string;
  login?: string;
  password?: string;
  ac?: string;
  sn?: string;
  address?: string;
  geteway?: string;
  broadcast?: string;
  dns?: string[];
  ip6al?: number;
  ip6address?: string[];
  ip6gw?: string;
  ap6rp?: string;
  ip6ah?: number;
}

interface SetProviderSettingsDTO {
  state: TypeState;
  params: Params;
}

interface IApiSettings {
  setNetworkSettings: ({ state, params: { buob } }: SetProviderSettingsDTO) => any;
}

const setting: IApiSettings = {
  setNetworkSettings: async ({ state, params }) =>
    await fetchSettings({ setNetworkSettings: { state, params } }),
};

export { setting };
