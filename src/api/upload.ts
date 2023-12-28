import api from "./request";

export async function uploadImages(files: FormData) {
  return (await api.post("/question/upload", files, { headers: { "Content-Type": "multipart/form-data" } })).data;
}
