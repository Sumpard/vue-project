import Message from "@/utils/message";

import api from "./request";

export interface notice_submit {
  notice_content: string;
  notice_title: string;
  notice_type: string;
  publish_time: string;
  publisher_name: string;
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

export async function getNotice(get_type: string) {
  //以notice_type查找notice
  return (
    await api.get("/notice/selectNoticeList", {
      params: {
        beginTime: "",
        endTime: "",
        notice_type: get_type,
      },
    })
  ).data;
}
