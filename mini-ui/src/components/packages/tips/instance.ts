import { createApp, watch } from "vue";
import Tips, { type IProps } from "./tips.vue";

type PromiseParams = { resolve(value?: unknown): void; reject(): void };

const createInstance = (props: IProps, { resolve, reject }: PromiseParams) => {
  const app = createApp(Tips, { ...props });

  const show = () => {
    const node = document.createElement("div");
    node.className = "hint";
    const vm = app.mount(node) as InstanceType<typeof Hint>;
    document.body.appendChild(node);
    vm.state.visible = true;

    watch(vm.state, (state) => {
      if (!state.visible) {
        switch (state.type) {
          case "cancel":
            reject();
            break;
          case "ok":
            resolve();
            break;
          default:
            break;
        }
        hide(node);
      }
    });
  };

  show();

  const hide = (node: HTMLElement) => {
    app.unmount();
    document.body.removeChild(node);
  };

  return app;
};

export default createInstance;
