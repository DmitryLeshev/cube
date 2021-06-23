import { READY_TEMPLATES } from "../config/templates";

export default ({ number, controller }) => {
  const fileName = READY_TEMPLATES[controller].find(
    (temp) => temp === Number(number)
  );
  return require(`../templates/${controller}/${fileName || "default"}`);
};
