import { recoilLocalStorageEffect } from "@utils/common";
import { atom } from "recoil";
import { UserAuthInfo } from "@/types/auth/auth";

export const c2vWebAccessToken = atom<string>({
    key: "c2vWebAccessToken",
    default: "",
    effects: [recoilLocalStorageEffect("c2vWebAccessToken")],
});

export const userAuthInfoState = atom<UserAuthInfo>({
    key: "userAuthInfoState",
    default: {
        groupId: -1,
        teamId: -1,
        authorityCode: -1,
        isGroupNameEvent: "N",
    },
});

export const accountIdState = atom<string>({
    key: "accountIdState",
    default: "",
});

export const userAuthState = atom<string>({
    key: "userAuthState",
    default: "",
});
