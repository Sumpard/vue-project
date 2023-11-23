import api from "./request";

export interface Food {
  id: int;
  name: string;
  aliases: string[];
  price: int;
  desc: string;
  create_time: string;
}

export type FoodCreate = Pick<Food, "name" | "aliases" | "price" | "desc">;

export async function getFoods() {
  return (await api.get<Food[]>("/food")).data;
}

export async function createFood(payload: FoodCreate) {
  return (await api.post<Food>("/food", payload)).data;
}

export async function updateFood(payload: Food) {
  return (await api.put<Food>(`/food/${payload.id}`, payload)).data;
}

export async function getRecentFoods() {
  return (await api.get<Food[]>("/food/rec")).data;
}
