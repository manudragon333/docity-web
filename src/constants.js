import { io } from "socket.io-client";
import { URL_HOSTNAME } from "./endpoint";

export const ROLE_CE = "civil engineer";
export const ROLE_SUPER_ADMIN = "super admin";
export const ROLE_USER = "user";

export const STATUS_LIST = {
  0: {
    id: 0,
    name: "Inactive",
  },
  1: {
    id: 1,
    name: "Active",
  },
  2: {
    id: 2,
    name: "Submitted",
  },
  3: {
    id: 3,
    name: "Assigned",
  },
  4: {
    id: 4,
    name: "Pending",
  },
  5: {
    id: 5,
    name: "In Progress",
  },
  6: {
    id: 6,
    name: "Completed",
  },
  7: {
    id: 7,
    name: "Blocked",
  },
  8: {
    id: 8,
    name: "Success",
  },
  9: {
    id: 9,
    name: "Failed",
  },
  10: {
    id: 10,
    name: "sent",
  },
  11: {
    id: 11,
    name: "resend",
  },
  12: {
    id: 12,
    name: "Accepted",
  },
  13: {
    id: 13,
    name: "Declined",
  },
  14: {
    id: 14,
    name: "Cancelled",
  },
  15: {
    id: 15,
    name: "Approved",
  },
  16: {
    id: 16,
    name: "Deleted",
  },
};

let socket;

export const initSocket = (obj) => {
  socket = io(`wss://${URL_HOSTNAME}`, obj);
};

export const getSocket = () => {
  return socket;
};

if (socket) {
  socket.on("receive_message", (msg) => {
    console.log("msg", msg);
  });
}
