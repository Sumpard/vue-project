import api from "./request";

export interface Question {
  propose_time: string;
  proposer_name: string;
  proposer_phone_number: string;
  question_id: number;
  question_images: string;
  question_status: "SUBMITTED" | "FINISHED";
  question_texts: string;
  reply_images: string;
  reply_texts: string;
}

export interface QuestionCreate {
  propose_time: string;
  proposer_name: string;
  proposer_phone_number: string;
  question_images: string;
  question_texts: string;
}

export interface QuestionReply {
  reply_images: string;
  reply_texts: string;
}

export async function submitQuestion(
  submit_time: string,
  submit_name: string,
  submit_phone: string,
  submit_img: string,
  submit_text: string
) {
  const body: QuestionCreate = {
    propose_time: submit_time,
    proposer_name: submit_name,
    proposer_phone_number: submit_phone,
    question_images: submit_img,
    question_texts: submit_text,
  };
  return (await api.post("question/insertQuestion", body)).data;
}
