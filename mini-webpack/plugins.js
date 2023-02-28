class WebpackRunPlugin {
  apply(compiler) {
    compiler.hooks.run.tap("WebpackRunPlugin", (compilation) => {
      console.log("开始编译");
    });
  }
}
class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("WebpackDonePlugin", () => {
      console.log("结束编译");
    });
  }
}

module.exports = {
  WebpackRunPlugin,
  WebpackDonePlugin,
};
