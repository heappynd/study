// @vitest-environment jsdom
import { expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import BaseInput from "../BaseInput.vue"

test('sets the value', async ()=> {
  const wrapper = mount(BaseInput)

  const input = wrapper.find("input")
  await input.setValue('my@email.com')

  expect(input.element.value).toBe('my@email.com')

  await wrapper.find('button').trigger('click')

  expect(wrapper.emitted()).toHaveProperty('submit')
})