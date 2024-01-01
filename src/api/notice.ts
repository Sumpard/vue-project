import { Notice } from "@/interfaces/notice";

import api from "./request";

export interface notice_submit {
  notice_content: string;
  notice_title: string;
  notice_type: string;
  publish_time: string;
  publisher_name: string;
}

export interface notice_modify {
  notice_id: number;
  notice_content: string;
  notice_title: string;
  notice_type: string;
}

export async function postNotice( //发布notice
  put_content: string,
  put_title: string,
  put_type: string,
  put_time: string,
  put_publisher: string
) {
  const noticePostBody: notice_submit = {
    notice_content: put_content,
    notice_title: put_title,
    notice_type: put_type,
    publish_time: put_time,
    publisher_name: put_publisher,
  };
  return (await api.post("notice/insertNotice", noticePostBody)).data;
}

export async function getNotice(notice_id: int): Promise<Notice> {
  return (await api.get("/notice/selectNotice/", { params: { notice_id } })).data.data;
}

export async function deleteNotice(del_id: int) {
  return (await api.delete("/notice/deleteNotice", { params: { notice_id: del_id } })).data;
}

export async function modifyNotice(noticeUpdate: Notice) {
  return (await api.put("/notice/updateNotice", noticeUpdate)).data;
}

export async function getNoticeByType(get_type?: string): Promise<Notice[]> {
  //以notice_type查找notice的概要（不含content）
  return (
    await api.get("notice/selectNoticeList", { params: { beginTime: "", endTime: "", notice_type: get_type ?? "" } })
  ).data.data;
}
