export interface reqMemberType {
    identifyKey?: string;
    groupId: number;
    teamId: number;
    memberName: string;
    levelName: string;
    positionName: string;
    mailAddress: string;
    telNo: string;
    photoPath: string;
    createUserId?: string;
    task: string;
}

export interface resMemberType {
    rowNum: number;
    accountId: number;
    authorityCode: number | string;
    createDateTime: string;
    groupId: number;
    identifyKey: string;
    levelName: string;
    mailAddress: null | string;
    memberName: string;

    positionName: string;

    teamId: number;
    teamName: string;
    telNo: string;
    photoPath: string;
    task: string;
    imageUrl: string;
}

export interface respTeamInfoType {
    teamId: number;
    teamName: string;
    totalCount: number;
    parentTeamId: number;
    spaceId?: number;
}

export interface reqMemberListParam {
    [key: string]: any;
}

export interface reqMember {
    groupId: number;
    pageNo: number;
    limit: number;
    sortType: string;
}

export interface reqUpdateMemberType {
    identifyKey: string;
    groupId: number;
    memberName: string;
    teamId: number;
    levelName: string;
    positionName: string;
    telNo: string;
    mailAddress: string;
    photoPath: string;
    task: string;
}

export interface reqDeleteMemberType {
    groupId: number;
    identifyKeys: string[];
}

export interface reqSendEmailType {
    groupId: number;
    name: string;
    identifyKey: string;
    emailAddress: string;
}
