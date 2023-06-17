import request from "./request";
import type { RouteRecordNormalized } from "vue-router";
import { UserState } from "@/store/modules/user/types";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return request.post<LoginRes>("/api/user/login", data);
}

export function logout() {
  return request.post<LoginRes>("/api/user/logout");
}

export function getUserInfo() {
  return request.post<UserState>("/api/user/info");
}

export function getMenuList() {
  return request.post<RouteRecordNormalized[]>("/api/user/menu");
}
