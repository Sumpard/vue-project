import api from "./request";

export async function uploadQuestionImages(files: FormData) {
  return (await api.post("/question/upload", files, { headers: { "Content-Type": "multipart/form-data" } })).data;
}

export async function uploadNoticeImages(files: FormData) {
  return (await api.post("/notice/upload", files, { headers: { "Content-Type": "multipart/form-data" } })).data;
}
