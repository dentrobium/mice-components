export const responseCode = {
    Success: 200,
    TokenExpired: 419,
    Fail: 500,
    LoginMismatchEmployeenoAccountid: 1000,
    MismatchAccountId: 1001,
    DBError: 1051,
    DbException: 1052,
    NotExistGroup: 3000,
    NotExistTeam: 3001,
    NotExistTeamMember: 3002,
    MemberExist: 3003,
    DuplicatedTeamName: 3004,
    TeamCreateFail: 3005,
    NotExistMember: 3006,
    NotJoinAnyGroup: 3007,
    NotMatchGroupId: 3008,
    NotMatchTeamId: 3009,
    FailUpdateTeam: 3010,
    EmptyMemberResult: 3011,
    NotGroupManager: 3012,
    FailUpdateMemberTeam: 3013,
    DuplicatedGroupName: 3014,
    ExistMember: 3015,
    FailCreateGroup: 3016,
    CannotDeleteManager: 3021,
    DuplicateMemberName: 3036,
    ContainsForbiddenWord: 3041,
    DuplicateFileName: 4000,

    // 사전예약
    PreventCreateOK: 3211, // 사전예약된 데이터로 생성 성공 (보상OK)
    PreventDifferentEmail: 3212, // 사전예약된 데이터에서 이메일이 다르다 ( 보상 X 그룹생성 X )
    PreventPaymentCreateOk: 3210, // 사전예약된 데이터가 맞지만 이미 보상을 받았다 ( 보상 X 그룹생성 O )
};

export const adultAuthCode = {
    Success: "100", // 성인인증 성공
    checkAdult: "200", // 성인인증 필요
    parameterError: "201", // 요청 파라미터 검증 실패
    requiredParameter: "202", // 필수 파라미터 검증 실패
    passAdult: "206", // 성인인증 완료 상태
    diffPidPassAdult: "207", // 다른 아이디로 성인인증 완료
    isNotAdult: "209", // 18세 미만 사용자
    failed: "210", // 성인인증 실패
    isNotAppId: "213", // 성인인증 비대상 app id
    isNotCountry: "214", // 성인인증 비대상 국가
    serviceError: "218", // 서비스 점검중
    timeOut: "221", // 타임아웃
};

export const templateCode = {
    WhiteModern: 30300401000,
    StudyClub: 10300401002,
    Space: 10300401003,
    Camping: 10300401004,
    Cafe: 10300401005,
};
