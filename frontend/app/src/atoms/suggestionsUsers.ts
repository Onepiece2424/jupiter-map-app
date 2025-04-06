import { atom } from "recoil";
import { SuggestionsUsersType } from "../types/types";

export const suggestionsUsersListState = atom<SuggestionsUsersType[]>({
  key: 'SuggestionsUsersList',
  default: [],
});
