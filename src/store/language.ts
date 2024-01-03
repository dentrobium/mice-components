import { recoilLocalStorageEffect } from "@/utils/common";
import { atom } from "recoil";

export const languageState = atom<string>({
    key: "languageState",
    default: "",
    effects: [recoilLocalStorageEffect("languageCode")],
});
