<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { computed, ref } from "vue";

interface Option {
  key: number;
  label: string;
  disabled?: boolean;
}

interface IProps {
  data: Option[];
  modelValue: number[];
  titles: string[];
}

const props = defineProps<IProps>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
}>();

const dataPairs = computed(() => {
  let pairs: Record<number, string> = {};
  props.data.forEach((item) => {
    pairs[item.key] = item.label;
  });
  return pairs;
});

const selected = ref<number[]>([]);

const targetData = ref<Record<number, string>>({});

function transfer() {
  selected.value.forEach((item) => {
    targetData.value[item] = dataPairs.value[item];
  });
  emit("update:modelValue", selected.value);
}

function removeItem(key: number) {
  delete targetData.value[key];
  const keys = Object.keys(targetData.value).map((key) => Number(key));
  emit("update:modelValue", keys);
}
</script>

<template>
  <div :class="$style.transfer">
    <div :class="$style.panel">
      <div :class="$style.panelHeader">
        <div>{{ titles[0] }}</div>
        <div>{{ data.length }}</div>
      </div>
      <div :class="$style.panelBody">
        <ElInput placeholder="请输入账号或昵称进行搜索" />

        <ElScrollbar height="300px">
          <ElCheckboxGroup v-model="selected" :class="$style.panelCheckbox">
            <ElCheckbox v-for="item in data" :key="item.key" :label="item.key">
              {{ item.label }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </ElScrollbar>
      </div>
    </div>

    <div :class="$style.buttons" @click="transfer">
      <ElIcon color="#fff">
        <ArrowRight />
      </ElIcon>
    </div>

    <div :class="$style.panel">
      <div :class="$style.panelHeader">
        <div>{{ titles[1] }}</div>
        <div>{{ Object.keys(targetData).length }}</div>
      </div>
      <div :class="$style.panelBody">
        <ElInput placeholder="请输入账号或昵称进行搜索" />

        <ElScrollbar height="300px">
          <ul :class="$style.list">
            <li v-for="(value, key) in targetData" :key="key">
              <span>{{ value }}</span>
              <span @click="removeItem(key)">移出</span>
            </li>
          </ul>
        </ElScrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.transfer {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel {
  width: 350px;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}

.panelHeader {
  height: 48px;
  line-height: 48px;
  background: #f7f8fa;
  font-size: 16px;
  color: #000;
  font-weight: 700;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & div:last-child {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    font-weight: 400;
  }
}

.panelBody {
  padding: 16px;
}

.panelCheckbox {
  padding-top: 16px;
  :global(.el-checkbox) {
    display: flex;
    &.is-checked {
      background: #f3f6fe;
    }
  }
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2a60e6;
  border-radius: 2px;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.list {
  list-style: none;
  padding: 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 32px;
  font-weight: 400;

  li + li {
    margin-top: 8px;
  }

  li {
    padding: 0 16px 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: rgba(42, 96, 230, 0.06);
      border-radius: 4px;

      span:last-child {
        color: var(--el-color-primary);
        cursor: pointer;
      }
    }

    span:last-child {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
