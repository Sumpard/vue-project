import api from "./request";
import Message from "@/utils/message";
export interface AccessToken {
  access_token: string;
  //token_type: string;
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


  export async function adduser(
    avatar: string,
    email: string,
    password: string,
    score:int,
    user_id: string,
    user_name: string,
    user_role: string,
  ) {
    return (await api.post("/user/insert-single",{
      avatar,
      email,
      password,
      score,
      user_id,
      user_name,
      user_role,
    })).data;
  }
 