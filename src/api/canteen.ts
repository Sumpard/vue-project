import api from "./request";

export interface Canteen {
  id: int;
  name: string;
  aliases: string[];
}

export async function getCanteens() {
  return (await api.get<Canteen[]>("/canteen")).data;
}
