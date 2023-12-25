import api from "./request";

// 查询岗位列表
export function listPost(query: any) {
  return api.get("/system/post/list", { params: query });
}

// 查询岗位详细
export function getPost(postId: any) {
  return api.get("/system/post/" + postId);
}

// 新增岗位
export function addPost(data: any) {
  return api.post("/system/post", data);
}

// 修改岗位
export function updatePost(data: any) {
  return api.put("/system/post", data);
}

// 删除岗位
export function delPost(postId: any) {
  return api.delete("/system/post/" + postId);
}
