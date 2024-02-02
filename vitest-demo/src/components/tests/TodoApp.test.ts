// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import TodoApp from "../TodoApp.vue";
import { test, expect } from "vitest";

test("renders a todo", () => {
  const wrapper = mount(TodoApp);

  const todo = wrapper.get('[data-test="todo"]');

  expect(todo.text()).toBe("Learn Vue.js 3");
});

test("creates a todo", async () => {
  const wrapper = mount(TodoApp);
  // Vue, however, updates the DOM asynchronously
  // 在可能导致 DOM 更改的任何方法上调用 await
  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);
  await wrapper.get('[data-test="new-todo"]').setValue("New todo");
  await wrapper.get('[data-test="form"]').trigger("submit");

  expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
});

test("completes a todo", async () => {
  const wrapper = mount(TodoApp);

  await wrapper.get('[data-test="todo-checkbox"]').setValue(true);

  expect(wrapper.get('[data-test="todo"]').classes()).toContain("completed");
});
