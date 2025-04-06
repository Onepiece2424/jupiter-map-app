import { atom } from "recoil";
import { UsersType } from "../types/types";

export const notificationsUsersListState = atom<UsersType[]>({
  key: 'NotificationsUsersList',
  default: [],
});
