import { stringTrim } from "@/utils/common";
import {
    reqMemberType,
    reqUpdateMemberType,
    resMemberType,
    reqDeleteMemberType,
} from "../models/member";
import {
    updateMemberType,
    viewMemberViewModel,
    writeMemberType,
} from "../viewModel/member";

export const convertToMemberInfo = (
    payload: resMemberType,
): viewMemberViewModel => {
    const mapperModel: viewMemberViewModel = {
        rowNum: payload.rowNum,
        id: payload.identifyKey,
        accountId: payload.accountId,
        name: payload.memberName,
        verificationCode: payload.identifyKey,
        phoneNumber: payload.telNo,
        email: payload.mailAddress,
        teamId: payload.teamId,
        organization: payload.teamName,
        position: payload.positionName,
        grade: payload.task,
        levelName: payload.levelName,
        photoPath: payload.photoPath,
        accountStatus: payload.authorityCode,
        authorityCode: payload.authorityCode as number,
        imageUrl: payload.imageUrl,
    };
    return mapperModel;
};

export const convertToRequestMember = (
    groupId: number,
    payload: writeMemberType,
): reqMemberType => {
    const mapperModel: reqMemberType = {
        groupId,
        memberName: stringTrim(payload.memberName),
        teamId: payload.teamId,
        levelName: stringTrim(payload.levelName),
        positionName: stringTrim(payload.positionName),
        task: stringTrim(payload.assignTask),
        telNo: payload.telNo,
        mailAddress: payload.mailAddress,
        photoPath: payload.photoPath,
    };
    return mapperModel;
};

export const convertToRequestUpdateMember = (
    groupId: number,
    payload: updateMemberType,
): reqUpdateMemberType => {
    const mapperMode: reqUpdateMemberType = {
        groupId,
        identifyKey: payload.identifyKey,
        memberName: stringTrim(payload.memberName),
        teamId: payload.teamId,
        levelName: stringTrim(payload.levelName),
        positionName: stringTrim(payload.positionName),
        task: stringTrim(payload.assignTask),
        telNo: payload.telNo || "",
        mailAddress: payload.mailAddress || "",
        photoPath: payload.photoPath || "",
    };
    return mapperMode;
};

export const convertToRequestDeleteMember = (
    groupId: number,
    payload: string[],
): reqDeleteMemberType => {
    const mapperModel: reqDeleteMemberType = {
        groupId,
        identifyKeys: payload,
    };
    return mapperModel;
};
