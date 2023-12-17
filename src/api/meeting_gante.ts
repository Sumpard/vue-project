import api from "./request";
import Message from "@/utils/message";
export interface Appointment {
  appoint_end_time: string;
  appoint_start_time: string;
  appointment_description: string;
  appointment_id: number;
  appointment_status: ('SUBMITTED' | 'REFUSED' | 'ACCEPTED');
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
  appointment_status: string,
  available_type_name: string,
  day: string,
  needSort: boolean,
  renterIdEmptyOrNull: boolean,
  renter_id: string,
  reviewerIdEmptyOrNull: boolean,
  reviewer_id: string,
  sort_type: string,
  sorted: boolean,
  typeNull: boolean
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



//目前传参无效
export async function getAppoint_by_day(day: string, appointstatus: string) {
  //Message.info("查询中");
  const appointbody: SearchBody = {
    appointment_status: appointstatus,
    available_type_name: "会议室",
    day: day,
    needSort: true,
    renterIdEmptyOrNull: false,
    renter_id: "",
    reviewerIdEmptyOrNull: true,
    reviewer_id: "",
    sort_type: "START_TIME",
    sorted: true,
    typeNull: true
  };
  return (await api.post("appointment/select-condition", appointbody)).data;
}


export async function submitAppoint(start_time: string, end_time: string, description: string,
  avail_id: number, avail_name: string, avail_type_name: string, user_id: string,
  user_name: string, phone: string, sub_time: string) {
  Message.info("提交中……");
  const appointbody: appoint_order = {
    appoint_end_time: end_time,
    appoint_start_time: start_time,
    appointment: {
      appoint_end_time: end_time,
      appoint_start_time: start_time,
      appointment_description: description,
      appointment_id: 3,
      appointment_status: 'SUBMITTED',
      availableNameInvalid: false,
      available_id: avail_id,
      available_name: avail_name,
      available_type_name: avail_type_name,
      descriptionInvalid: false,
      duration: 30,
      renterIdInvalid: false,
      renterNameInvalid: false,
      renterPhoneInvalid: false,
      renter_id: user_id,
      renter_name: user_name,
      renter_phone: phone,
      reply: "",
      review_time: '',
      reviewer_id: "",
      reviewer_name: "",
      submit_time: sub_time,
      timeInvalid: false,
    },
    appointment_description: description,
    available_id: avail_id,
    available_name: avail_name,
    available_type_name: avail_type_name,
    renter_id: user_id,
    renter_name: user_name,
    renter_phone: phone,
    requiredInvalid: false,
    type: '',
  };
  return (await api.post("appointment/insert", appointbody)).data;
}

