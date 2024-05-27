const MyComponent = {
  name: 'MyComponent',
  props: {
    title: String,
  },
  data() {
    return {
      count: 0,
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created', this.count)
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  render() {
    return {
      type: 'div',
      props: {
        onClick: () => {
          this.count = this.count + 1
        },
      },
      children: `foo 的值是: ${this.count} ${this.title}`,
    }
  },
}

const CompVNode = {
  type: MyComponent,
  props: {
    title: 'A big Title',
    other: '1',
  },
}
renderer.render(CompVNode, document.querySelector('#app'))

setTimeout(() => {
  const CompVNode = {
    type: MyComponent,
    props: {
      title: 'A big Title 2',
      other: '2',
    },
  }
  renderer.render(CompVNode, document.querySelector('#app'))
}, 1000)
