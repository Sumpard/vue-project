import api from "./request";

export interface AccessToken {
  access_token: string;
}

export async function addGoods(
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

export async function getAllGoods() {
  return (await api.post("/available/select-all")).data;
}

export async function editdescription(available_id: int, des: string) {
  return (await api.putForm("/available/update-description ", { "available-id": available_id, des })).data;
}
export async function editstatus(available_id: int, status: string) {
  return (await api.putForm("/available/update-status", { "available-id": available_id, status })).data;
}
export async function deletegood(id: int) {
  return (await api.delete("/available/delete", { params: { id } })).data;
}

export async function adduser(
  avatar: string,
  email: string,
  password: string,
  score: int,
  user_id: string,
  user_name: string,
  user_role: string
) {
  return (
    await api.post("/user/insert-single", {
      avatar,
      email,
      password,
      score,
      user_id,
      user_name,
      user_role,
    })
  ).data;
}

export async function upload(id: int, file: File) {
  const form = new FormData();
  form.append("image", file);
  return (await api.put("/available/update-image", form, { params: { "available-id": id } })).data;
}
