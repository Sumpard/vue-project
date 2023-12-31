import api from "./request";

export async function uploadQuestionImages(files: File[]) {
  const form = new FormData();
  for (const file of files) form.append("files", file);
  return (await api.post("/question/upload", form)).data;
}

export async function uploadNoticeImages(files: File[]) {
  const form = new FormData();
  for (const file of files) form.append("files", file);
  return (await api.post("/notice/upload", form)).data;
}
