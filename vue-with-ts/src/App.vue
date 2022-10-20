<script setup lang="ts">
import { MessageBox } from './element-minus'

function showMsg() {
  MessageBox({
    confirmBtnText: '确定',
    title: '标题',
    content: '内容',
  })
    .then(() => {})
    .catch(() => {})
}
function showMsgConfirm() {
  MessageBox.confirm({
    showCancelBtn: true,
    cancelBtnText: '取消',
    title: '',
    content: '',
  })
    .then(() => {})
    .catch(() => {})
}
function showMsgPrompt() {
  MessageBox.prompt({
    confirmBtnText: 'OK',
    showCancelBtn: true,
    cancelBtnText: 'Cancel',
    title: 'Prompt',
    content: 'content',
  })
    .then((val) => {
      console.log('ok', val)
    })
    .catch(() => {
      console.log('cancel')
    })
}
</script>

<template>
  <button @click="showMsg">default</button>
  <button @click="showMsgConfirm">confirm</button>
  <button @click="showMsgPrompt">prompt</button>
</template>

<style scoped></style>
