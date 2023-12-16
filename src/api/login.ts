import api from "./request";
import Message from "@/utils/message";
export interface AccessToken {
  access_token: string;
  //token_type: string;
}

export interface verifyRes {
  msg: string;
  img: string;
  code: string;
  //token_type: string;
}

export interface verifyAns {
  msg: string;
  code: string;
  //token_type: string;
}

export async function register(user_id: string, user_name: string, password: string) {
  return (await api.post("/register", { user_id: user_id, user_name: user_name, password: password })).data;
}

export async function login(userid: string, password: string, code: string) {
  Message.info("登录中");
  return (await api.post<AccessToken>("/login", { input_id: userid, input_pwd: password  },  {params: { verifyCode: code } })).data;
}

export async function logout() {
  return (await api.post("/auth/logout")).data;
}

export async function auth(admin?: boolean, perm?: string) {
  return (await api.post("/auth", { admin, perm })).data;
}

export async function getverifycode() {
  return (await api.get<verifyRes>("/captchaImage/get")).data;
}

export async function getanswer() {
  return (await api.get<verifyAns>("/captchaImage/show")).data;
}

export async function verifyanswer(code: string) {
  return (await api.get<verifyAns>("/captchaImage/check", { params: { verifyCode: code } }
  )).data;
}