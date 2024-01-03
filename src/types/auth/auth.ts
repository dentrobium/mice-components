export interface Authorization {
    accessToken: string;
    permission?: string;
    code: number;
    msg: string;
}

export interface UserAuthInfo {
    groupId: number;
    teamId: number;
    authorityCode: number;
    isGroupNameEvent?: string;
}
