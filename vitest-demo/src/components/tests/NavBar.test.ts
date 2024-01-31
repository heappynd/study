// @vitest-environment jsdom
import { mount } from "@vue/test-utils";
import NavBar from "../NavBar.vue";
import { test, expect } from "vitest";

test("renders a profile link", () => {
  const wrapper = mount(NavBar);

  const profileLink = wrapper.get("#profile");

  expect(profileLink.text()).toBe("My Profile");
});

test("does not render an admin link", () => {
  const wrapper = mount(NavBar);

  expect(wrapper.find("#admin").exists()).toBeFalsy();
});

test("renders an admin link", () => {
  const wrapper = mount(NavBar, {
    data() {
      return { admin: true };
    },
  });

  expect(wrapper.get('#admin').text()).toBe("Admin");
});
