export const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// export const EMAIL_REGEX =
//     /^[a-zA-Z0-9_.+-]+\s*@\s*[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
export const GROUPNAME_REGEX =
    /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣!@#$%^&*(),.?":{}|<>]{1,30}$/;

export const SUBMISSION_GROUP_NAME_REGEX =
    /^(?!.*\s{2,})[\p{L}\p{N}\p{P}]+(\s[\p{L}\p{N}\p{P}]+)*$/;

export const PHONE_NUMBER_REGEX = /^\s*[0-9#+-]+\s*$/;
