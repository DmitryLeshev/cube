export default ({ data, windowCard, closeTask }) => ({
  id: data.id,
  taskNumber: data.type,
  titleVars: data.titleVars,
  taskType: data.class,
  crt: data.crt,
  priority: data.priority,
  windowCard,
  closeTask,
});
