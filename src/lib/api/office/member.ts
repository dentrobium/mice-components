import { officeApi as api } from "@/lib/client";
import {
    reqDeleteMemberType,
    reqMemberListParam,
    reqMemberType,
    reqSendEmailType,
    reqUpdateMemberType,
} from "@/types/models/member";

// 멤버 등록
export const postRegisterUnsignedMember = async (payload: reqMemberType) => {
    const response = await api.post(
        "/api/ConsoleMember/RegisterUnsignedMember",
        {
            ...payload,
        },
    );

    return response;
};

// 팀 리스트
export const getTeamSummaryByGroup = async (groupId: number) => {
    const response = await api.post(
        `/api/ConsoleMember/GetTeamSummaryByGroup?groupId=${groupId}`,
        {},
    );

    return response;
};

// 멤버 리스트
export const getMemberList = async (param: reqMemberListParam) => {
    const response = await api.post(
        `/api/ConsoleMember/GetMemberManagePage?groupId`,
        param,
    );

    return response.data;
};

// 멤버 수정
export const updateMember = async (payload: reqUpdateMemberType) => {
    const updatePayload = {
        ...payload,
        mailAddress: !payload.mailAddress ? "" : payload.mailAddress,
    };

    const response = await api.post(
        `/api/ConsoleMember/UpdateGroupMemberInfo`,
        { ...updatePayload },
    );

    return response;
};

// 멤버 삭제
export const deleteMember = async (payload: reqDeleteMemberType) => {
    const { groupId, identifyKeys } = payload;

    const response = await api.post(
        `/api/ConsoleMember/DeleteCheckboxMembers`,
        {
            groupId,
            deleteMembers: identifyKeys,
        },
    );

    return response;
};

// 프로필 이미지 업로드
export const uploadProfileImage = async (groupId: string, form: any) => {
    const response = await api.upload(
        `/api/ConsoleMember/UploadProfileImage?groupId=${groupId}`,
        form,
    );

    return response;
};

// 멤버 등록
export const postSendRegisterEmail = async (payload: reqSendEmailType) => {
    const response = await api.post(
        "/api/ConsoleMember/SendRegisterEmail",
        payload,
    );

    return response;
};
