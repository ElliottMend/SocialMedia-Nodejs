import { pool } from "../../connection";
import { v4 as uuidv4 } from "uuid";

interface IRooms {
  room_id: string;
  host_id?: number;
  room_name: string;
  user_id?: number;
}

interface ICreateRoom {
  room_id: string;
}
interface IMessage {
  message_timestamp: string;
  body: string;
  photo: string;
  username: string;
}

export const createMessageRoomModel = async (
  hostId: number,
  roomName: string
) => {
  const roomId = uuidv4();
  const insertQuery = {
    text:
      "INSERT INTO message_rooms(room_id, host_id, room_name) VALUES ($1,$2,$3)\
      RETURNING room_id ",
    values: [roomId, hostId, roomName],
  };
  return (await pool.query<ICreateRoom>(insertQuery)).rows;
};

export const createRoomInviteModel = async (
  userId: number,
  inviteId: number[],
  room: string
) => {
  let invites: [number, number, string, string][] = [];
  inviteId.forEach((invite) => {
    invites.push([userId, invite, "room_invite", room]);
  });
  const insertQuery = {
    text:
      "\
      INSERT INTO\
        notifications(sending_user, receiving_user, type, notification_message)\
      VALUES ($1,$2,$3,$4)",
  };
  await pool.query(insertQuery, ...invites);
};

export const getMessageRoomsModel = async (userId: number) => {
  const selectQuery = {
    text:
      "\
      SELECT mr.room_name, mr.room_id FROM message_rooms mr\
      LEFT JOIN user_message_rooms umr ON mr.room_id = umr.room_id\
        WHERE mr.host_id = $1 OR umr.user_id = $1",
    values: [userId],
  };
  return (await pool.query<IRooms>(selectQuery)).rows;
};

export const acceptRoomInviteModel = async (userId: number, roomId: string) => {
  const insertQuery = {
    text: "INSERT INTO user_message_rooms VALUES($1,$2)",
    values: [userId, roomId],
  };
  await pool.query(insertQuery);
};

export const validRoomModel = async (roomId: string, userId: number) => {
  const selectQuery = {
    text:
      "SELECT * FROM message_rooms mr\
    LEFT JOIN user_message_rooms umr ON mr.room_id = umr.room_id\
    WHERE mr.room_id = $1 AND (umr.user_id = $2 OR mr.host_id = $2)",
    values: [roomId, userId],
  };
  return (await pool.query<IRooms>(selectQuery)).rows;
};

export const sendMessageModel = async (
  userId: number,
  roomId: string,
  message: string
) => {
  const insertQuery = {
    text: "INSERT INTO messages(user_id, room_id, body) VALUES($1,$2,$3)",
    values: [userId, roomId, message],
  };
  await pool.query(insertQuery);
};

export const getMessagesModel = async (roomId: string, offset: number) => {
  const selectQuery = {
    text:
      "\
    SELECT m.message_timestamp, m.message_id, m.body, up.photo, ua.username FROM messages m\
      INNER JOIN user_profiles up ON m.user_id = up.user_id\
      LEFT JOIN user_accounts ua ON up.user_id = ua.user_id\
      WHERE m.room_id = $1\
    ORDER BY message_id DESC OFFSET $2 LIMIT 10",
    values: [roomId, offset],
  };
  return (await pool.query<IMessage>(selectQuery)).rows;
};
