import { atom } from "recoil";

export const authState = atom<boolean>({
  key: "authState",
  default: false, // 初期状態は未認証
});
