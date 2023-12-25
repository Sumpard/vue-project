import Message from "@/utils/message";

import api from "./request";

export interface avail {
  available_description: string;
  available_id: number;
  available_image: string;
  available_name: string;
  available_status: string;
  available_type_name: string;
}
export interface Appointment {
  appoint_end_time: string;
  appoint_start_time: string;
  appointment_description: string;
  appointment_id: number;
  appointment_status: "SUBMITTED" | "REFUSED" | "ACCEPTED";
  availableNameInvalid: boolean;
  available_id: number;
  available_name: string;
  available_type_name: string;
  descriptionInvalid: boolean;
  duration: number;
  renterIdInvalid: boolean;
  renterNameInvalid: boolean;
  renterPhoneInvalid: boolean;
  renter_id: string;
  renter_name: string;
  renter_phone: string;
  reply: string;
  review_time: string;
  reviewer_id: string;
  reviewer_name: string;
  submit_time: string;
  timeInvalid: boolean;
}

export interface SearchBody {
  appointment_status: string;
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

export interface appoint_order {
  appoint_end_time: string;
  appoint_start_time: string;
  appointment: Appointment;
  appointment_description: string;
  available_id: number;
  available_name: string;
  available_type_name: string;
  renter_id: string;
  renter_name: string;
  renter_phone: string;
  requiredInvalid: boolean;
  type: string;
}

export interface appoint_sub {
  renter_id: string;
  renter_name: string;
  renter_phone: string;
  available_id: number;
  available_name: string;
  available_type_name: string;
  appointment_description: string;
  appoint_end_time: string;
  appoint_start_time: string;
}

export async function getAppoint_by_day(day: string, appointstatus: string, type: string) {
  //Message.info("查询中");
  const appointbody: SearchBody = {
    appointment_status: appointstatus,
    available_type_name: type,
    day: day,
    needSort: true,
    renterIdEmptyOrNull: false,
    renter_id: "",
    reviewerIdEmptyOrNull: true,
    reviewer_id: "",
    sort_type: "START_TIME",
    sorted: true,
    typeNull: true,
  };
  return (await api.post("appointment/select-condition", appointbody)).data.data;
}

export async function submitAppoint(
  start_time: string,
  end_time: string,
  description: string,
  avail_id: number,
  avail_name: string,
  avail_type_name: string,
  user_id: string,
  user_name: string,
  phone: string
) {
  //Message.info("提交中……");
  const appointbody: appoint_sub = {
    appoint_end_time: end_time,
    appoint_start_time: start_time,
    appointment_description: description,
    available_id: avail_id,
    available_name: avail_name,
    available_type_name: avail_type_name,
    renter_id: user_id,
    renter_name: user_name,
    renter_phone: phone,
  };
  return (await api.post("appointment/insert", appointbody)).data;
}

export async function get_avail_set(avail: string) {
  return (await api.post("/available/select-by-type", { type_description: "", type_id: 0, type_name: avail })).data;
}

export async function get_all() {
  return (await api.post("available/select-all")).data;
}

export async function update_img(id: number, img: FormData) {
  return await api.put("/available/update-image"), img, { params: { available_id: id } };
}
