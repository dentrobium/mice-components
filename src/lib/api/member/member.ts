import { officeApi as api } from "@/lib/client";
import { convertToMemberInfo } from "@/types/mapper/member";

import { reqMember, resMemberType } from "@/types/models/member";

// 그룹 정보 조회 api
export const getMember = async (param: reqMember) => {
    const response = await api.post(
        `/api/ConsoleMember/GetMemberManagePage`,
        param,
    );

    const { data, code } = response;

    if (code !== 200) {
        return {
            totalCount: 0,
            list: [],
        };
    }
    const convertModels = {
        totalCount: data.totalCount,
        list: data.members.map((v: resMemberType) => convertToMemberInfo(v)),
    };

    return convertModels;
};
