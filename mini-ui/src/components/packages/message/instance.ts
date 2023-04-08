import { createApp } from "vue";
import COMessage from "./co-message.vue";

/**
 * Message instance operation
 * @param {*} cfg configuration
 */
const createInstance = (cfg) => {
  const config = cfg || {};

  // create a container and set its class
  let messageNode = document.createElement("div");
  let attr = document.createAttribute("class");
  attr.value = "CO-message";
  messageNode.setAttributeNode(attr);

  // set a counter, when the next message happens, it will have a distance from the previous one
  const height = 100; // height, play around
  const messageList = document.getElementsByClassName("CO-message");
  messageNode.style.top = `${messageList.length * height}px`;

  // reset each message's distance (Top value) to the top
  const resetMsgTop = () => {
    for (let i = 0; i < messageList.length; i++) {
      messageList[i].style.top = `${i * height}px`;
    }
  };

  const handleRemove = () => {
    app.unmount(messageNode);
    document.body.removeChild(messageNode);
    resetMsgTop();
  };

  // create a Vue instance and append to Body
  const app = createApp(COMessage, {
    config,

    // remove the element, close message and unmount and remove from DOM
    remove() {
      handleRemove();
    },
  });

  // mount the instance and append to end of Body
  app.vm = app.mount(messageNode);
  document.body.appendChild(messageNode);

  app.close = () => {
    handleRemove();
  };
  return app;
};

export default createInstance;
