// @vitest-environment jsdom

import { expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import BaseCount from "../BaseCount.vue"

test("basic count", () => {
  const wrapper = mount(BaseCount)

  wrapper.find("button").trigger("click")
  wrapper.find("button").trigger("click")

  // `emitted()` accepts an argument. It returns an array with all the
  // occurrences of `this.$emit('increment')`.
  const incrementEvent = wrapper.emitted("increment")

  // We have "clicked" twice, so the array of `increment` should
  // have two values.
  expect(incrementEvent).toHaveLength(2)

  // Assert the result of the first click.
  // Notice that the value is an array.
  expect(incrementEvent[0]).toEqual([{ count: 1, isEven: false }])

  // Then, the result of the second one.
  expect(incrementEvent[1]).toEqual([{ count: 2, isEven: true }])
})