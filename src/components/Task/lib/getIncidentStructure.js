import { downloadJson } from ".";

const fileName = "incident";

export default async ({ number }) => {
  const { incidents } = await downloadJson({ fileName });
  return incidents[number];
};
