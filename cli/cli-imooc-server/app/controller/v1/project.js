const Controller = require('egg').Controller;

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
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Project.find({});
    // console.log('res', ctx.model);
    ctx.body = res;
  }

  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.model.Project.find({ value: id });
    ctx.body = res;
  }

  create() {
    const { ctx } = this;
    // ctx.model.Project.create({ name: 111, value: 222 });
    ctx.body = 'ok';
  }

  update() {
    const { ctx } = this;
    console.log(ctx.params);
    ctx.body = 'update';
  }

  destroy() {
    const { ctx } = this;
    console.log(ctx.params);
    ctx.body = 'destroy';
  }
}

module.exports = ProjectController;
