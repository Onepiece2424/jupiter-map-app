import { atom } from "recoil";
import { FriendType } from "../types/types";

export const friendListState = atom<FriendType[]>({
  key: 'FriendList',
  default: [],
});
