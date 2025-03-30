import { atom } from "recoil";
import { User } from "../types/types";

export const loginUserState = atom<User>({
  key: 'user',
  default: {
    id: null,
    lastname: "",
    firstname: "",
    signed_in: false
  }
});
