export interface viewMemberViewModel {
    rowNum: number;
    id: number | string;
    name: string;
    verificationCode: string;
    phoneNumber: string;
    email: string | null;
    organization: string;
    position: string;
    grade: string;
    levelName: string;
    teamId: number;
    photoPath?: string;
    accountStatus: string | number;
    authorityCode: number;
    imageUrl: string;
    accountId: number;
}

export interface writeMemberType {
    memberName: string;
    teamId: number;
    telNo: string;
    mailAddress: string;
    positionName: string;
    levelName: string;
    jobGrade: string;
    assignTask: string;
    photoPath: string;
    fileName: string;
}

export interface updateMemberType extends writeMemberType {
    identifyKey: string;
}
