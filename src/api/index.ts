let api = {
  wizard: {
    getStatus: [],
    checkAuth: [],
    checkKey: ['key'],
    createNewUser: ['key', 'login', 'password', 'firstname', 'lastname'],
    login: ['password', 'login'],
    getDevices: [],
    getWifi: [],
    protect: ['devices', 'wifi'],
    getLicenses: ['getLicenses'],
  },
  auth: {
    status: [],
    login: ['password', 'login'],
    logout: [],
  },
  main: {
    index: [],
    getJsonLang: ['lang'],
    getMainData: [],
    getGraphicData: ['age'],
  },
};

const build = (api: any) => {
  Object.entries(api).forEach(([interfaceName, methods]: any) => {
    Object.entries(methods).forEach(([methodName, params]: any) => {
      const codeMethod = `async (args) => {
        console.log('${interfaceName + '/' + methodName}', {args});
        const res = await args;
        console.log('${interfaceName + '/' + methodName}', {res});
        return res;
      }`;
      api[interfaceName][methodName] = {
        params,
        method: eval(codeMethod),
      };
    });
  });
  return api;
};

export default build(api);
