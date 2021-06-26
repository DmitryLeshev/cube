async function fetchMockData(path: string) {
  try {
    const response = await fetch(`/mock/${path}.json`);
    console.log({ response });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log({ 'fetch data error': error });
    return error;
  }
}

export { fetchMockData };
