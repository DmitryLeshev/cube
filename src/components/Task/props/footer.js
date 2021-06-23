export default ({ data, windowCard }) => ({
  responsible: data.responsible,
  createTst: data.createTst,
  status: data.status,
  isIncident: data.class === 1 || data.class === 2,
  windowCard,
});
