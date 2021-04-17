import { pool } from "../../connection";

export const validNotificationModel = async (
  user_id: number,
  notificationId: number
) => {
  const selectQuery = {
    text:
      "SELECT * FROM notifications WHERE receiving_user = $1 AND notification_id = $2",
    values: [user_id, notificationId],
  };
  return (await pool.query(selectQuery)).rows;
};

export const getNotificationsModel = async (userId: number) => {
  const selectQuery = {
    text:
      "SELECT * FROM notifications WHERE receiving_user = $1 ORDER BY date DESC",
    values: [userId],
  };
  return (await pool.query(selectQuery)).rows;
};

export const updateNotificationsModel = async (
  notificationsIds: [number][]
) => {
  const updateQuery = {
    text: "UPDATE notifications SET seen = true WHERE notification_id IN ($1)",
  };
  await pool.query(updateQuery, notificationsIds);
};

export const deleteNotificationModel = async (notificationId: number) => {
  const deleteQuery = {
    text: "DELETE FROM notifications WHERE notification_id = $1",
    values: [notificationId],
  };
  await pool.query(deleteQuery);
};
