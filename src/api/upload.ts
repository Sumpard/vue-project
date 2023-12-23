import api from "./request";

export async function uploadImages(files: File[]) {
  const form = new FormData();
  for (const file of files) form.append("files", file);
  return (await api.post("/question/upload", form)).data;
}
