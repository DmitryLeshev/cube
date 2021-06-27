// // import customQuery from "../../../assets/utils/customQuery";
// const customQuery = (a) => (b, c) => console.log({ a, b, c });
// const taskQuery = (method, args) => customQuery('task')(method, args);
// const incidentQuery = (method, args) => customQuery('incident')(method, args);

// export default {
//   task: {
//     get: async ({ id, lang = 'ru' }) => await taskQuery('get', { id, lang }),
//     getResponsibles: async () => await taskQuery('getResponsibles'),
//     getDevices: async () => await taskQuery('getDevices'),
//     list: async ({
//       progressId,
//       status = 0, // 0 - все, 1 - ИБ, 3 - ИТ
//       classesId = [], // 1
//       responsibles = [], // [id],
//       devices = [], // {entityId, entityType}
//       limit = 20,
//       lastId = 1,
//       minCrt = 0,
//       maxCrt = 10,
//       minCreateDate = 0,
//       maxCreateDate,
//     }) =>
//       await taskQuery('list', {
//         progressId,
//         classesId: [...classesId, 2],
//         limit,
//         lastId,
//         minCrt,
//         maxCrt,
//         responsibles,
//         status,
//         devices,
//         minCreateDate,
//         maxCreateDate,
//       }),
//     getMessages: async ({ id }) => await taskQuery('getMessages', { id }),
//     sendMessage: async ({ id, message }) =>
//       await taskQuery('sendMessage', { id, message }),
//     button: {
//       cancelTask: async ({ id, comment }) =>
//         await taskQuery('cancelTask', { id, comment }),
//       remindTask: async ({ id, time }) => await taskQuery('remindTask', { id, time }),
//       toWorkTask: async ({ id, time }) => await taskQuery('toWorkTask', { id, time }),
//       setDecision: async ({ id, action, params }) =>
//         await taskQuery('setDecision', { id, action, params }),
//       setDecisionIsOff: async ({ id, isOff }) =>
//         await taskQuery('setDecision', {
//           id,
//           params: { off: isOff },
//           action: 'set',
//         }),
//       setDecisionAction: async ({ id, ip, domain }) =>
//         await taskQuery('setDecision', {
//           id,
//           params: { ip, domain },
//           action: 'addWhiteList',
//         }),
//       closeIncident: async ({ id, comment }) =>
//         await incidentQuery('closeIncident', { id, comment }),
//     },
//   },
//   incident: {
//     list: async ({
//       isClosed,
//       limit,
//       lastId,
//       timeCreate,
//       timeCreateUp,
//       devices,
//       responsibles,
//     }) =>
//       await incidentQuery('list', {
//         isClosed,
//         limit,
//         lastId,
//         timeCreate,
//         timeCreateUp,
//         devices,
//         responsibles,
//       }),
//     get: async ({ id }) => await incidentQuery('get', { id }),
//     setDecision: async () => await incidentQuery('setDecision'),
//     closeIncident: async () => await incidentQuery('closeIncident'),
//     getMessages: async ({ id }) => await incidentQuery('getMessages', { id }),
//     sendMessage: async ({ id, message }) =>
//       await incidentQuery('sendMessage', { id, message }),
//     buttons: {
//       setDecision: async ({ id, action, params }) =>
//         await incidentQuery('setDecision', { id, action, params }),
//       setDecisionAction: async ({ id, ip, domain }) =>
//         await incidentQuery('setDecision', {
//           id,
//           params: { ip, domain },
//           action: 'addWhiteList',
//         }),
//       changePriority: async ({ id }) => await incidentQuery('changePriority', { id }),
//     },
//   },
// };
const api: any = {};

export default api;
