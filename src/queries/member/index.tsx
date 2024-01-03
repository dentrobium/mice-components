import { useMutation, useQuery } from "react-query";
import {
    deleteMember,
    getMemberList,
    getTeamSummaryByGroup,
    postRegisterUnsignedMember,
    postSendRegisterEmail,
    updateMember,
} from "@/lib/api/office/member";
import {
    reqDeleteMemberType,
    reqMember,
    reqMemberListParam,
    reqMemberType,
    reqSendEmailType,
    reqUpdateMemberType,
} from "@/types/models/member";
import { getMember } from "@/lib/api/member/member";

//
export function useGetTeamSummaryByGroup(groupId: number, options?: any) {
    return useQuery(
        ["getTeamSummaryByGroup"],
        () => getTeamSummaryByGroup(groupId),
        { ...options },
    );
}

export function usePostRegisterUnsignedMember(options?: any) {
    return useMutation(
        [],
        (payload: reqMemberType) => postRegisterUnsignedMember(payload),
        options,
    );
}

export function useGetMemberList(param: reqMemberListParam, options?: any) {
    return useQuery(
        ["getTeamSummaryByGroup", param],
        () => getMemberList(param),
        { ...options },
    );
}

export function useGetMember(param: reqMember, options?: any) {
    return useQuery(
        ["MemberInfo", param],
        () => (param ? getMember(param) : undefined),
        options,
    );
}

export function useUpdateMember(options?: any) {
    return useMutation(
        [],
        (payload: reqUpdateMemberType) => updateMember(payload),
        options,
    );
}

export function useDeleteMember(options?: any) {
    return useMutation(
        [],
        (payload: reqDeleteMemberType) => deleteMember(payload),
        options,
    );
}

export function usePostSendRegisterEmail(options?: any) {
    return useMutation(
        [],
        (payload: reqSendEmailType) => postSendRegisterEmail(payload),
        options,
    );
}
