import api from "./request";
import Message from "@/utils/message";
export interface AccessToken {
  access_token: string;
  //token_type: string;
}

export async function login(userid: string, password: string) {
  Message.info("登录中");
  return (await api.post<AccessToken>("/login", {input_id: userid,input_pwd: password })).data;
}

