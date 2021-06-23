export default ({ data, closeTask, updateItem }) => ({
  id: data.id,
  buttons: data.buttons || null,
  date: data.startTst || null,
  closeTask,
  data,
  updateItem,
});
