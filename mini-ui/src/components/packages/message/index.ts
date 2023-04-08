import createInstance from "./instance.js";

/**
 * read, config and render Message
 * @param {Object} typeCfg
 * @param {Object/String} cfg
 */
function renderMsg(typeCfg = {}, cfg = "") {
  // allow passing params, need to tell the type
  const isContent = typeof cfg === "string";

  // piece together config and merge them
  cfg = isContent
    ? {
        content: cfg,
      }
    : cfg;

  const config = Object.assign({}, typeCfg, cfg); // merge configuration
  const {
    type = "text", // type of message
    icon = "", // your icon
    content = "", // content
    immersive = false, // show immersive?
    duration = 3000, // set the duration
    close = false, // showClose?
  } = config;

  // create instance
  return createInstance({
    type,
    icon,
    content,
    immersive,
    duration,
    close,
  });
}

export default {
  // purely info
  text(cfg = "") {
    const textCfg = {
      type: "text",
      icon: "",
    };

    return renderMsg(textCfg, cfg);
  },
  // success ere
  success(cfg = "") {
    const successCfg = {
      type: "success",
      icon: "icon-success success",
    };

    return renderMsg(successCfg, cfg);
  },
  // warning here
  warning(cfg = "") {
    const warningCfg = {
      type: "warning",
      icon: "icon-warning warning",
    };

    return renderMsg(warningCfg, cfg);
  },
  // error here
  error(cfg = "") {
    const errorCfg = {
      type: "error",
      icon: "icon-error error",
    };

    return renderMsg(errorCfg, cfg);
  },
};
