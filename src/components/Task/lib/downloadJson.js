export default async ({ fileName, lang = "ru" }) => {
  const json = await fetch(`/locales/${lang}/${fileName}.json`);
  return await json.json();
};
