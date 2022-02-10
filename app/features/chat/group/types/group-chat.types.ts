export interface ICreateGroupChat {
  member_ids: string[] | null;
  token: string;
  meta?: {
    talk_room_type: string;
    name: string;
  };
}

export interface IGetSingleGroup {
  group_id: string;
  token: string;
}

export interface ISignleGroup {
  id: string;
  members: string[] | null;
  meta: {
    name: string;
    talk_room_type: string;
  };
  status: number | null;
}

export interface IGroupResponse {
  created_at: string;
  id: string;
  last_message_at: string;
  members: string[];
  meta: any;
}

export interface ISentMessage {
  group_id: string;
  message: string;
  token: string;
}

export interface IAddMember {
  token: string;
  group_id: string;
  user_ids: string[];
}

export interface IMessageRecieve {
  attachments: [];
  group_id: string;
  id: string;
  mentions: [];
  message: string;
  parent_message_id: string;
  reply_count: number;
  sender_id: string;
  sent_at: string;
  updated_at: string;
}
