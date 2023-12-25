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

export async function getAppointAll(status: string) {
  const body: SearchBody = {
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
  return (await api.post("appointment/select-condition", body)).data;
}

export async function deleteRecord(id: int) {
  return (await api.delete("/appointment/delete", { params: { id } })).data;
}

export async function reviewAppointmentAccept(id: int, reviewer_id: string, reviewer_name: string) {
  const body: Review = {
    appointment_id: id,
    appointment_status: "ACCEPTED",
    reply: "",
    requiredEmpty: true,
    reviewer_id: reviewer_id,
    reviewer_name: reviewer_name,
  };
  return (await api.put("/appointment/review", body)).data;
}

export async function reviewAppointmentRefuse(id: int, reply: string, reviewer_id: string, reviewer_name: string) {
  const body: Review = {
    appointment_id: id,
    appointment_status: "REFUSED",
    reply: reply,
    requiredEmpty: true,
    reviewer_id: reviewer_id,
    reviewer_name: reviewer_name,
  };
  return (await api.put("/appointment/review", body)).data;
}
