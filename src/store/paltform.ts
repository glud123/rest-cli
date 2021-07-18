import { atom } from "recoil";

export const operationState = atom<any>({
  key: "paltformOperation",
  default: null,
});

export const menuOnOff = atom<boolean>({
  key: "paltformMenuOnOff",
  default: true,
});
