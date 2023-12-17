import api from "./request";
import Message from "@/utils/message";
export interface AccessToken {
  access_token: string;
  //token_type: string;
}

export async function register(user_id: string, user_name: string, password: string) {
  return (await api.post("/register", { user_id: user_id, user_name: user_name, password: password })).data;
}

export async function login(userid: string, password: string, code: string) {
  Message.info("登录中");
  return (
    await api.post<AccessToken>("/login", { input_id: userid, input_pwd: password }, { params: { verifyCode: code } })
  ).data;
}
export async function addgoods(
  available_description: string,
  available_id: string,
  available_image: string,
  available_name: string,
  available_status: string,
  available_type_name: string
) {
  return (
    await api.post("/available/insert-single", {
      available_description,
      available_id: Number.parseInt(available_id),
      available_image,
      available_name,
      available_status,
      available_type_name,
    })
  ).data;
}


export async function getallgoods() {
    return (await api.post("/available/select-all")).data;
  }

  export async function getalluser() {
    return (await api.post("/user/select-all")).data;
  }

  export async function editscore(id:string,score:int) {
    console.log(typeof score)
    return (await api.putForm("/user/update-score ",{id,score })).data;
  }

  export async function editrole(id:string,role:string) {
    
    return (await api.putForm("/user/update-role ",{id,role })).data;
  }