import type { App, ComponentPublicInstance } from "vue";
import { createApp } from "vue";
import Hint, { type HintProps } from "./hint.vue";

type AppHint = App<Element> & { vm?: ComponentPublicInstance; close?(): void };

const createInstance = (cfg: HintProps) => {
  const messageNode = document.createElement("div");
  messageNode.className = "hint";

  const remove = () => {
    app.unmount();
    document.body.removeChild(messageNode);
  };

  const app: AppHint = createApp(Hint, {
    ...cfg,

    remove,
  });

  app.vm = app.mount(messageNode);
  document.body.appendChild(messageNode);

  app.close = remove;

  return app;
};

export default createInstance;
