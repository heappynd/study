<script lang="ts" setup>
import { h, reactive, toRefs } from 'vue'
import { fields } from '.'

const props = defineProps({
  title: {
    type: String,
    default: 'Message',
  },
  content: {
    type: String,
    default: 'Message content.',
  },
  showCancelBtn: {
    type: Boolean,
    default: false,
  },
  confirmBtnText: {
    type: String,
    default: 'Ok',
  },
  cancelBtnText: {
    type: String,
    default: 'Cancel',
  },
  field: {
    type: String,
    validator: (value: string) => {
      return fields.includes(value)
    },
  },
})

const state = reactive({
  visible: false,
  promptValue: '',
  type: 'confirm',
})

const { visible } = toRefs(state)

const setVisible = (isVisible: boolean) => {
  state.visible = isVisible
}

function confirmBtnClick() {
  state.type = 'confirm'
  setVisible(false)
}
function cancelBtnClick() {
  state.type = 'cancel'
  setVisible(false)
}

const ContentView = ({ field }: { field?: 'confirm' | 'prompt' }) => {
  switch (field) {
    case !field || 'confirm':
      return h('p', null, props.content)
    case 'prompt':
      return h('input', {
        value: state.promptValue,
        onInput: (e: Event) => (state.promptValue = e.target!.value),
        class: 'message-input',
      })
    default:
      return ''
  }
}

defineExpose({
  setVisible,
  state,
})
</script>

<template>
  <transition name="messagebox-fade">
    <div class="message-box" v-show="visible" @click="cancelBtnClick">
      <div class="message-box-wrapper" @click.stop>
        <div class="message-box-title">
          <h2>{{ title }}</h2>
          <span @click="cancelBtnClick">x</span>
        </div>
        <div class="message-box-content">
          <content-view :field="field"></content-view>
        </div>
        <div class="message-box-btn-group">
          <button @click="confirmBtnClick">{{ confirmBtnText }}</button>
          <button v-if="showCancelBtn" @click="cancelBtnClick">
            {{ cancelBtnText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.messagebox-fade-enter-from,
.messagebox-fade-leave-to {
  opacity: 0;
}
.messagebox-fade-enter-active {
  transition: opacity 0.5s ease-in;
}
.messagebox-fade-leave-active {
  transition: opacity 0.5s ease-out;
}

h2,
p {
  margin: 0;
  font-weight: 400;
}

.message-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.message-box-wrapper {
  width: 420px;
  height: 136px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200%);
  background-color: #fff;
  border-radius: 3px;
}
.message-box-title {
  padding: 15px;

  h2 {
    display: inline-block;
    font-size: 18px;
  }
  span {
    font-size: 20px;
    float: right;
    color: #999;
  }
}
.message-box-content {
  padding: 10px 15px;
  p {
    font-size: 14px;
  }
}
.message-box-btn-group {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px 15px 15px;
  width: 100%;
  box-sizing: border-box;

  button {
    float: right;
  }
}
</style>
