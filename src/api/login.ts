import api from "./request";

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
  return (await api.post("/register", { user_id, user_name, password })).data;
}

export async function login(input_id: string, input_pwd: string, verifyCode: string) {
  return (await api.post<AccessToken>("/login", { input_id, input_pwd }, { params: { verifyCode } })).data;
}

export async function logout() {
  return (await api.post("/auth/logout")).data;
}

export async function verifyToken(token: string) {
  return (await api.post("/user/verify-token", null, { params: { token } })).data;
}

export async function getverifycode() {
  return (await api.get<verifyRes>("/captchaImage/get")).data;
}

export async function getanswer() {
  return (await api.get<verifyAns>("/captchaImage/show")).data;
}

export async function verifyanswer(verifyCode: string) {
  return (await api.get<verifyAns>("/captchaImage/check", { params: { verifyCode } })).data;
}
