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

class RefreshMenuBarCommand {
  constructor(receiver) {
    this.receiver = receiver
  }
  execute() {
    this.receiver.refresh()
  }
}

class AddSubMenuCommand {
  constructor(receiver) {
    this.receiver = receiver
  }
  execute() {
    this.receiver.add()
  }
}

const refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)
const addSubMenuCommand = new AddSubMenuCommand(SubMenu)
</script>
