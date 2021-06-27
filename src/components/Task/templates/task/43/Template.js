export default ({ data, children }) => {
  const { type } = data?.body;
  const isCookie = type === 'Cookie';
  return isCookie ? children : '—';
};
