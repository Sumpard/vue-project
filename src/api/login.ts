import api from "./request";
import { Result } from "./result";

export interface VerifyResult {
  msg: string;
  img: string;
  code: string;
}

export async function register(user_id: string, user_name: string, password: string) {
  return (await api.post("/register", { user_id, user_name, password })).data;
}

export async function login(input_id: string, input_pwd: string, verifyCode: string) {
  return (await api.post<Result<string>>("/login", { input_id, input_pwd }, { params: { verifyCode } })).data;
}

export async function logout() {
  return (await api.post("/auth/logout")).data;
}

export async function verifyToken(token: string) {
  return (await api.post("/user/verify-token", null, { params: { token } })).data;
}

export async function getCaptcha() {
  return (await api.get<VerifyResult>("/captchaImage/get")).data;
}

export async function getCaptchaAnswer() {
  return (await api.get<Result>("/captchaImage/show")).data;
}

export async function checkCaptcha(verifyCode: string) {
  return (await api.get<Result>("/captchaImage/check", { params: { verifyCode } })).data;
}
