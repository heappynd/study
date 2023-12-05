```js
const modules = {};

require.m = modules;

const module_cache = {
  // module_id: {
  //   exports: {},
  // },
};

function require(module_id) {
  const cachedModule = module_cache[module_id];
  if (cachedModule != undefined) {
    return cachedModule.exports;
  }
  const module = (module_cache[module_id] = {
    id: module_id,
    loaded: false,
    exports: {},
  });

  modules[module_id](module, module.exports, require);

  module.loaded = true;

  return module.exports;
}
```
