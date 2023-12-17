import { Page, Pagination, castPagination } from "./page";
import api from "./request";
import { Result } from "./result";

export interface User {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  score: int;
  avatar: string;
  user_role: "REGULAR_USER" | "MANAGER";
}


export type UserStats = {
  total: int;
  register_today: int;
  login_today: int;
  active_today: int;
};

export async function getUserMe() {
  return (await api.post<Result<User>>("/user/select-self")).data.data;
}

export async function updateUser(user_id: string, user_data: any) {
  return (await api.put(`/users/${user_id}`, user_data)).data;
}

export async function getUsers(page: Pagination) {
  const params = castPagination(page);
  return (await api.get<Page<User>>("/users/", { params })).data;
}

export async function updateUserMe(user_data: any) {
  return (await api.putForm<User>("/users/me", user_data)).data;
}

export async function updateUserMeAvatar(user_avatar: File) {
  return (await api.postForm<User>("/users/me/avatar", { file: user_avatar })).data;
}

export async function getUserStats() {
  return (await api.get<UserStats>("/users/stat")).data;
}

export async function updatepassword(oldPassword : string, newPassword: string) {
  return (await api.putForm("/user/update-password", {"old-pwd": oldPassword,"new-pwd": newPassword })).data;
}

export async function updateemail(email: string) {
  return (await api.putForm("/user/update-email", { email })).data;
}