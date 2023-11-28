// import { h } from "vue";
import { h } from "./runtime-core/h";
import { Text, Comment, Fragment } from "./runtime-core/vnode";
import { render } from "./runtime-dom";

const component1 = {
  data() {
    return {
      msg: "hello comp",
    };
  },
  render() {
    return h("div", this.msg);
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created", this.msg);
    setTimeout(() => {
      this.msg = "created";
    }, 2000);
  },
  beforeMount() {
    console.log("beforeMount", this.msg);
  },
  mounted() {
    console.log("mounted", this.msg);
  },
};
const vnode = h(component1);
render(vnode, document.querySelector("#app"));
