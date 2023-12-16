const { Controller } = require('egg');

const ADD_TEMPLATE = [
  {
    name: 'vue3项目模板',
    value: 'template-vue3',
    npmName: '@imooc.com/template-vue3',
    version: '1.0.1',
  },
  {
    name: 'react18项目模板',
    value: 'template-react18',
    npmName: '@imooc.com/template-react18',
    version: '1.0.0',
  },
];

class ProjectController extends Controller {
  async template() {
    const { ctx } = this;
    ctx.body = ADD_TEMPLATE;
  }
}

module.exports = ProjectController;
