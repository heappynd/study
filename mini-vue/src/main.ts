import { parse } from './parse'

const template = `<div :id="dynamicId" @click="handler" v-on:mousedown="onMouseDown" ></div>`

console.log(parse(template))
