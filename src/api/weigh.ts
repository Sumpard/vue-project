import api from "./request";

interface WeighBase {
  canteen_id: int;
  food_id: int;
  weight: int;
}

export interface WeighCreate extends WeighBase {
  record_date: string;
}

export interface Weigh extends WeighBase {
  id: int;
  record_date: string;
  create_time: string;
}

export async function getWeighs() {
  return (await api.get<Weigh[]>("/weigh")).data;
}

export async function createWeigh(payload: WeighCreate) {
  return (await api.post<Weigh>("/weigh", payload)).data;
}

export async function updateWeigh(payload: Weigh) {
  return (await api.put<Weigh>(`/weigh/${payload.id}`, payload)).data;
}

export async function deleteWeigh(id: int) {
  return (await api.delete<Weigh>(`/weigh/${id}`)).data;
}
