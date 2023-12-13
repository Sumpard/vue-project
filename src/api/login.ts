import api from "./request";
import Message from "@/utils/message";
export interface AccessToken {
  access_token: string;
  //token_type: string;
}

export async function register(stu_id: string,  password: string) {
  return (await api.postForm("/auth/register", { stu_id,  password })).data;
}

export async function login(userid: string, password: string) {
  Message.info("登录中");
  return (await api.post<AccessToken>("http://120.46.203.58:8080/login", {input_id: userid,input_pwd: password })).data;
}

export async function logout() {
  return (await api.post("/auth/logout")).data;
}

export async function auth(admin?: boolean, perm?: string) {
  return (await api.post("/auth", { admin, perm })).data;
}
