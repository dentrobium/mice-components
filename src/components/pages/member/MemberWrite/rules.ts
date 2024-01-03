import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from "@/constants/regex";
import { getTranslation } from "@/utils/common";
import { checkOnlySpaces } from "@/utils/validate";

const rules = {
    memberName: {
        required: getTranslation("Popup_MemberManageCommon_NameErrorText01"),
        maxLength: {
            value: 50,
            message: getTranslation("Application_Common_ErrorText01"),
        },
        validate: {
            checkOnlySpaces: checkOnlySpaces(
                getTranslation("Popup_MemberManageCommon_NameErrorText01"),
            ),
            // checkDoubleSpaces: checkDoubleSpaces("테스트"),
        },
    },
    identifyKey: {},
    telNo: {
        maxLength: {
            value: 30,
            message: getTranslation("Application_Common_ErrorText01"),
        },
        pattern: {
            value: PHONE_NUMBER_REGEX,
            message: getTranslation(
                "Popup_MemberManageCommon_PhoneErrorText01",
            ),
        },
    },
    mailAddress: {
        maxLength: {
            value: 50,
            message: getTranslation("Application_Common_ErrorText01"),
        },
        pattern: {
            value: EMAIL_REGEX,
            message: getTranslation(
                "DefaultEnvironment_GroupInformation_GroupEmailErrorText02",
            ),
        },
    },
    positionName: {},
    levelName: {
        maxLength: {
            value: 30,
            message: getTranslation("Application_Common_ErrorText01"),
        },
    },
    jobGrade: {
        maxLength: {
            value: 30,
            message: getTranslation("Application_Common_ErrorText01"),
        },
    },
    assignTask: {
        maxLength: {
            value: 30,
            message: getTranslation("Application_Common_ErrorText01"),
        },
    },
};

export default rules;
