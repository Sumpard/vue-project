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
export async function getUserMe() {
  return (await api.post<Result<User>>("/user/select-self")).data.data;
}

export async function updatepassword(oldPassword: string, newPassword: string) {
  return (await api.putForm("/user/update-password", { old_pwd: oldPassword, new_pwd: newPassword })).data;
}

export async function updateemail(email: string) {
  return (await api.putForm("/user/update-email", { email })).data;
}

export async function getAllUsers() {
  return (await api.post("/user/select-all")).data;
}

export async function updateUserScore(id: string, score: int) {
  console.log(typeof score);
  return (await api.putForm("/user/update-score ", { id, score })).data;
}

export async function updateUserRole(id: string, role: string) {
  return (await api.putForm("/user/update-role ", { id, role })).data;
}
