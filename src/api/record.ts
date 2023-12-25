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

export async function getAppointSelf(status: string, id: string) {
  const body: SearchBody = {
    appointment_status: status,
    available_type_name: "",
    day: "",
    needSort: true,
    renterIdEmptyOrNull: false,
    renter_id: id,
    reviewerIdEmptyOrNull: true,
    reviewer_id: "",
    sort_type: "START_TIME",
    sorted: true,
    typeNull: true,
  };
  return (await api.post("appointment/select-self", body)).data.data;
}
