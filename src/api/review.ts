import api from "./request";

export interface SearchBody {
  appointment_status: null | string;
  available_type_name: string;
  day: string;
  needSort: boolean;
  renterIdEmptyOrNull: boolean;
  renter_id: string;
  reviewerIdEmptyOrNull: boolean;
  reviewer_id: string;
  sort_type: string;
  sorted: boolean;
  typeNull: boolean;
}
export interface Review {
  appointment_id: number;
  appointment_status: string;
  reply: string;
  requiredEmpty: true;
  reviewer_id: string;
  reviewer_name: string;
}
export async function getAppointall(status: string) {
  //Message.info("查询中");
  const appointbody: SearchBody = {
    appointment_status: status,
    available_type_name: "",
    day: "",
    needSort: true,
    renterIdEmptyOrNull: false,
    renter_id: "",
    reviewerIdEmptyOrNull: true,
    reviewer_id: "",
    sort_type: "START_TIME",
    sorted: true,
    typeNull: true,
  };
  return (await api.post("appointment/select-condition", appointbody)).data;
}

export async function deleterecord(id: int) {
  return (await api.delete("/appointment/delete", { params: { id } })).data;
}

export async function reviewacc(id: int, reviewer_id: string, reviewer_name: string) {
  const reviewbody: Review = {
    appointment_id: id,
    appointment_status: "ACCEPTED",
    reply: "",
    requiredEmpty: true,
    reviewer_id: reviewer_id,
    reviewer_name: reviewer_name,
  };
  return (await api.put("/appointment/review", reviewbody)).data;
}

export async function reviewref(id: int, reply: string, reviewer_id: string, reviewer_name: string) {
  const reviewbody2: Review = {
    appointment_id: id,
    appointment_status: "REFUSED",
    reply: reply,
    requiredEmpty: true,
    reviewer_id: reviewer_id,
    reviewer_name: reviewer_name,
  };
  return (await api.put("/appointment/review", reviewbody2)).data;
}
