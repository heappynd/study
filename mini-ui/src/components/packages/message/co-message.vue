<template>
  <transition name="slide-fade">
    <div class="message-container" v-show="visible">
      <!-- content -->
      <div class="message-content">
        <!-- message icon -->
        <div class="message-icon" v-if="config.icon">
          <i :class="config.icon"></i>
        </div>
        <span v-text="config.content" class="message-text"></span>
        <div class="option" v-if="!config.close">
          <!-- manually close the message by clicking close icon -->
          <i class="meta-iconfont meta-Close" @click="onClose"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs } from "vue";
import "./co-message.scss"; // import style here

export default {
  props: {
    config: { type: Object, default: () => {} }, // configuration
    remove: { type: Function, default: () => {} }, // unmount callback
  },
  setup(props) {
    const state = reactive({
      visible: false,
    });
    // open message
    const onOpen = (config) => {
      setTimeout(() => {
        state.visible = true;
      }, 10);
      // remove message after duration
      if (config.duration !== 0) {
        setTimeout(() => {
          onClose();
        }, config.duration);
      }
    };
    onOpen(props.config);
    // onClose event
    const onClose = () => {
      state.visible = false;
      setTimeout(() => {
        props.remove();
      }, 200);
    };
    return {
      ...toRefs(state),
      onOpen,
      onClose,
    };
  },
};
</script>
