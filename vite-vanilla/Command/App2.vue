<template>
  <div>
    <button @click="setCommand(refreshMenuBarCommand)">1</button>
    <button @click="setCommand(addSubMenuCommand)">2</button>
  </div>
</template>

<script setup>
import { MenuBar, SubMenu } from './Logic'

function setCommand(command) {
  command.execute()
}

function RefreshMenuBarCommand(receiver) {
  return {
    execute() {
      receiver.refresh()
    },
  }
}

function AddSubMenuCommand(receiver) {
  return {
    execute() {
      receiver.add()
    },
  }
}

const refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
const addSubMenuCommand = AddSubMenuCommand(SubMenu)
</script>
