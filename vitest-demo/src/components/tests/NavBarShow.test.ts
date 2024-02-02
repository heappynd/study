// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import NavBarShow from "../NavBarShow.vue";
import { test, expect } from "vitest";

test("does not show the user dropdown", () => {
  const wrapper = mount(NavBarShow);

  expect(wrapper.get("#user-dropdown").isVisible()).toBeFalsy();
});
