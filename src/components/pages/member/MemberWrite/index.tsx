/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Button,
    C2vInput,
    C2vSelect,
    C2vTable,
    C2vTableRowElem,
} from "@/components/common";
import { Tooltip, Form } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useForm, useWatch } from "react-hook-form";
import { usePopup } from "@/hooks/common";
import { checkKeyDown, getTranslation } from "@/utils/common";
import {
    MBMWRITE_POPUP,
    MEMBER_ADDED,
    MEMBER_UPDATE,
    MEMBER_DETAIL,
} from "@/constants";
import useToastMessage from "@/hooks/common/useToastMessage";
import usePreventPage from "@/hooks/common/usePreventPage";

// import { convertToRequestMember } from "@/types/mapper/member";
import { useListContext } from "@/context/list-context";
import { gaEventClick } from "@/utils/ga";
import { responseCode } from "@/constants/code";
import { EMAIL_REGEX } from "@/constants/regex";
import { userAuthInfoState } from "@/store/authorization";
import { useRecoilValue } from "recoil";
import { usePostSendRegisterEmail } from "@/queries/member";
import { reqSendEmailType } from "@/types/models/member";
import { updateMemberType, writeMemberType } from "@/types/viewModel/member";
import C2vProfileUploader from "@/components/common/C2vProfileUploader";
import stylesIndex from "@/pages/Member/index.module.scss";
import styles from "./member.module.scss";
import rules from "./rules";

const colGroup = (
    <colgroup>
        <col width="180px" />
        <col width="*" />
    </colgroup>
);

const tooltipTxt = getTranslation("Popup_MemberManageRegistComplete_GuideText");
interface iMemberWrite {
    viewDetail: number;
    setViewDetail: (data) => void;
    teams?: any;

    handleInsert?: (data: writeMemberType) => any;
    handleUpdate?: (data: updateMemberType) => any;
    handleDelete?: (data: any, callback: any) => void;
}

const NOT_SELECTED = 0;

/* viewDetail 1: 멤버등록 ,2:멤버수정 3:멤버조회  */

const MemberWrite = ({
    viewDetail,
    setViewDetail,
    teams,
    handleInsert,
    handleUpdate,
    handleDelete,
}: iMemberWrite) => {
    const { t } = useTranslation();
    const { groupId } = useRecoilValue(userAuthInfoState);
    // const { contextHolder, info } = useToastMessage({
    //     key: "MemberEmailKey",
    // });
    const { open, onClose } = usePopup(MBMWRITE_POPUP);

    const { onOpen } = usePopup();
    const { selectedRecord, queryResult } = useListContext();
    const { refetch } = queryResult;
    // const [teamList, setTeamList] = useState(teams);

    const teamList = useMemo(() => teams, [teams]);
    const [emailSuccess, setEmailSuccess] = useState(false);

    const valiDetail = viewDetail === MEMBER_DETAIL;
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        getValues,
        setError,
        clearErrors,
        formState: { errors, dirtyFields },
    } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            memberName: "",
            teamId: NOT_SELECTED,
            telNo: "",
            mailAddress: "",
            positionName: "",
            levelName: "",
            assignTask: "",
            photoPath: "",
            fileName: "",
            imageUrl: "",
        },
    });

    const originPhotoPath = useMemo(
        () => selectedRecord?.photoPath || "",
        [selectedRecord],
    );

    const watchPhotoPath = useWatch({
        control,
        name: "photoPath",
    });

    const sameData = usePreventPage(dirtyFields); // 뒤로가기,새로고침 방지
    const sameImage = useMemo(
        () => originPhotoPath === watchPhotoPath,
        [watchPhotoPath, originPhotoPath],
    );

    const isSame = useMemo(() => sameData && sameImage, [sameData, sameImage]);

    const { handleCopy, contextHolder, info } = useToastMessage({
        toastMsg: t("Popup_MemberManageCommon_AuthNumberCopyToast") || "",
    });

    const onCancel = () => {
        if (!isSame) {
            onOpen({
                title: t("Popup_ChangesDataGuide_Title"),
                isConfirm: true,
                isDanger: true,
                message: t("Popup_ChangesDataGuide_Description"),
                onOk: () => onClose(),
            });
        } else {
            onClose();
        }
    };

    const onSubmit = async (data: any) => {
        let code = 0;
        if (handleInsert && viewDetail === MEMBER_ADDED)
            code = await handleInsert(data);
        if (handleUpdate && viewDetail === MEMBER_UPDATE)
            code = await handleUpdate(data);

        if (code === responseCode.DuplicateMemberName) {
            setError("memberName", {
                type: "manual",
                message:
                    t(
                        "DefaultEnvironment_GroupInformation_GroupNameErrorText02",
                    ) || "",
            });
            return;
        }

        refetch();
    };
    const onError = (data: any) => {
        console.log(data, "onERror");
    };

    const onDelete = () => {
        if (handleDelete) {
            const payload = [
                [selectedRecord.name],
                [selectedRecord.verificationCode],
            ];
            handleDelete(payload, refetch);
        }
    };

    const setFileName = (name: string) => {
        setValue("photoPath", name);
    };

    useEffect(() => {
        // 팝업이 열렸다 닫힐때마다 form을 reset 시킴
        if (open) {
            reset();
        }
    }, [open, reset]);

    const renderSubmit = useCallback(
        (value: number) => {
            switch (value) {
                case MEMBER_ADDED: {
                    return (
                        <>
                            <Button
                                type="button"
                                border
                                onClick={() => {
                                    onCancel();
                                    gaEventClick(
                                        "SPAXE 콘솔_멤버 관리",
                                        "멤버등록 취소 버튼 클릭",
                                    );
                                }}
                            >
                                {t("Common_CancelButton")}
                            </Button>
                            <Button type="submit" disabled={isSame}>
                                {t("Popup_MemberManageRegist_RegistButton")}
                            </Button>
                        </>
                    );
                }
                case MEMBER_UPDATE: {
                    return (
                        <>
                            <Button type="button" border onClick={onCancel}>
                                {t("Common_CancelButton")}
                            </Button>
                            <Button type="submit" disabled={isSame}>
                                {t("Common_SaveButton")}
                            </Button>
                        </>
                    );
                }
                case MEMBER_DETAIL: {
                    return (
                        <>
                            <Button
                                type="button"
                                styleType="danger"
                                border
                                onClick={onDelete}
                            >
                                {t("Common_DeleteButton")}
                            </Button>
                            <Button
                                type="button"
                                onClick={(e) => {
                                    setViewDetail(2);
                                    e.preventDefault();
                                }}
                            >
                                {t("Common_MoidfyButton")}
                            </Button>
                        </>
                    );
                }
                default: {
                    return (
                        <>
                            <Button type="button" border onClick={onCancel}>
                                {t("Common_CancelButton")}
                            </Button>
                            <Button type="submit" disabled={isSame}>
                                {t("Popup_MemberManageRegist_RegistButton")}
                            </Button>
                        </>
                    );
                }
            }
        },
        [isSame],
    );

    useEffect(() => {
        if (selectedRecord && valiDetail) {
            reset((formValues) => ({
                ...formValues,
                memberName: selectedRecord.name,
                mailAddress: selectedRecord.email,
                teamId: selectedRecord.teamId,
                identifyKey: selectedRecord.verificationCode,
                levelName: selectedRecord.levelName,
                positionName: selectedRecord.position,
                assignTask: selectedRecord.grade,
                telNo: selectedRecord.phoneNumber,
                teamName: selectedRecord.organization,
                photoPath: selectedRecord.photoPath,
                imageUrl: selectedRecord?.imageUrl || "",
            }));
        }
        clearErrors();
    }, [reset, selectedRecord, valiDetail]);

    const sendEmailHandler = (res: any) => {
        const { code } = res;

        switch (code) {
            case responseCode.Success: {
                info(t("Popup MemberManageCommon_EmailSendToast01"));
                setEmailSuccess(true);
                return;
            }
            default: {
                onOpen({
                    title: getTranslation("Common_LeftTabMiddleCategory03"),
                    isDanger: true,
                    message: (
                        <p>
                            {getTranslation("Popup_CommonErrorDescription01")}
                        </p>
                    ),
                });
            }
        }
    };

    const { mutateAsync: sendEmail } = usePostSendRegisterEmail({
        onSuccess: sendEmailHandler,
    });

    // 멤버 이메일 인증 관련
    const onClickSendEmail = async () => {
        const emailAddress = getValues("mailAddress");
        // 유효성 검사
        if (!emailAddress || emailAddress === "") {
            setError("mailAddress", {
                message:
                    t("Popup_MemberManageDetail_EmailSendErrorText01") || "",
            });
            return;
        }

        const memberName = getValues("memberName");
        const identifyKey = selectedRecord.verificationCode;

        // 이메일 발송
        const payload: reqSendEmailType = {
            groupId,
            name: memberName,
            emailAddress,
            identifyKey,
        };

        await sendEmail(payload);
    };

    return (
        <div
            className={`${styles.contentInner} ${
                viewDetail === MEMBER_DETAIL ? "formDetail" : ""
            }`}
        >
            <button
                className={`close ${styles.customClose}`}
                onClick={onCancel}
                type="button"
            >
                <span className="hiddens">닫기</span>
            </button>
            <Form
                onFinish={handleSubmit(onSubmit, onError)}
                onKeyDown={(e) => checkKeyDown(e)}
            >
                {contextHolder}
                {/* {contextHolder2} */}
                <C2vTable colGroup={colGroup}>
                    <C2vTableRowElem
                        className="pd-0"
                        rtList={[
                            {
                                essential: false,
                                colspan: 2,
                                isFlexRow: false,
                                value: (
                                    <C2vProfileUploader
                                        viewOnly={valiDetail}
                                        viewDetail={viewDetail}
                                        photoPath={watchPhotoPath}
                                        setFileName={setFileName}
                                        imageUrl={watchPhotoPath}
                                    />
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        rtList={[
                            {
                                title: t("Popup_MemberManageCommon_Name"),
                                essential: true,
                                colspan: 0,
                                isFlexRow: false,
                                value: (
                                    <>
                                        <C2vInput
                                            name="memberName"
                                            control={control}
                                            placeholder={
                                                t(
                                                    "Popup_MemberManageCommon_NameDefaultText",
                                                ) || ""
                                            }
                                            rules={rules.memberName}
                                            disabled={valiDetail}
                                            errors={errors}
                                        />
                                    </>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        rtList={[
                            {
                                title: (
                                    <>
                                        {t(
                                            "Popup_MemberManageCommon_AuthNumber",
                                        )}
                                        <Tooltip
                                            title={tooltipTxt}
                                            trigger="click"
                                            placement="topLeft"
                                            overlayClassName="c2vTooltip"
                                        >
                                            <QuestionCircleOutlined className="ml-10" />
                                        </Tooltip>
                                    </>
                                ),
                                essential: false,
                                colspan: 0,
                                isFlexRow: true,
                                value: (
                                    <>
                                        <C2vInput
                                            name="identifyKey"
                                            control={control}
                                            wrapClassName="flex-grow1"
                                            readOnly
                                            errors={errors}
                                            disabled
                                            placeholder={
                                                t(
                                                    "Popup_MemberManageRegist_AuthNumberGuideText",
                                                ) || ""
                                            }
                                        />
                                        <div
                                            className={`${stylesIndex.copy} flex`}
                                        >
                                            <Button
                                                onClick={(e: any) => {
                                                    e.stopPropagation();
                                                    handleCopy(
                                                        selectedRecord.verificationCode,
                                                    );
                                                }}
                                                styleType="icon"
                                                size="default"
                                                title={getTranslation(
                                                    "Popup_MemberManageCommon_AuthNumberCopyToast",
                                                )}
                                                className="icon-copy"
                                            />
                                        </div>
                                    </>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        rtList={[
                            {
                                title: t("Popup_MemberManageCommon_Phone"),
                                essential: false,
                                colspan: 0,
                                isFlexRow: false,
                                value: (
                                    <>
                                        <C2vInput
                                            name="telNo"
                                            control={control}
                                            placeholder={
                                                (!valiDetail &&
                                                    t(
                                                        "Popup_MemberManageCommon_PhoneDefaultText",
                                                    )) ||
                                                ""
                                            }
                                            rules={rules.telNo}
                                            disabled={valiDetail}
                                            errors={errors}
                                        />
                                    </>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        rtList={[
                            {
                                title: t("Popup_MemberManageCommon_Email"),
                                essential: false,
                                colspan: 0,
                                isFlexRow: false,
                                value: (
                                    <div className={styles.emailWrapper}>
                                        <C2vInput
                                            name="mailAddress"
                                            control={control}
                                            placeholder={
                                                (!valiDetail &&
                                                    t(
                                                        "Popup_MemberManageCommon_EmailDefaultText",
                                                    )) ||
                                                ""
                                            }
                                            rules={rules.mailAddress}
                                            disabled={valiDetail}
                                            errors={errors}
                                        />
                                        {valiDetail && (
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={onClickSendEmail}
                                                disabled={emailSuccess}
                                            >
                                                {emailSuccess
                                                    ? t(
                                                          "Popup_MemberManageDetail_SendCompleteButton",
                                                      )
                                                    : t(
                                                          "Popup_MemberManageRegistComplete_EmailSendButton",
                                                      )}
                                            </Button>
                                        )}
                                    </div>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        noBorder
                        rtList={[
                            {
                                title: t(
                                    "Popup_MemberManageCommon_Organization",
                                ),
                                essential: false,
                                colspan: 0,
                                isFlexRow: true,
                                value: valiDetail ? (
                                    <>
                                        <C2vInput
                                            name="teamName"
                                            control={control}
                                            disabled
                                        />
                                    </>
                                ) : (
                                    <>
                                        <C2vSelect
                                            control={control}
                                            name="teamId"
                                            placeholder={
                                                (!valiDetail &&
                                                    t(
                                                        "Popup_MemberManageCommon_OrgSelectBoxDefaultText",
                                                    )) ||
                                                ""
                                            }
                                            className="w-268"
                                            defaultValue={0}
                                            rules={rules.positionName}
                                            options={teamList}
                                            showSearch
                                            disabled={valiDetail}
                                            optionFilterProp="label"
                                        />
                                        {!valiDetail && (
                                            <Button
                                                type="button"
                                                styleType="icon"
                                                className="close selectGroup ml-10"
                                                size="default"
                                                onClick={() =>
                                                    setValue(
                                                        "teamId",
                                                        NOT_SELECTED,
                                                        {
                                                            shouldDirty: true,
                                                        },
                                                    )
                                                }
                                            >
                                                <span className="hiddens">
                                                    {t("Common_CancelButton")}
                                                </span>
                                            </Button>
                                        )}
                                    </>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        noBorder
                        rtList={[
                            {
                                title: t("Popup_MemberManageCommon_Duty"),
                                essential: false,
                                colspan: 0,
                                isFlexRow: true,
                                value: (
                                    <>
                                        <C2vInput
                                            wrapClassName="w-310"
                                            name="levelName"
                                            control={control}
                                            placeholder={
                                                (!valiDetail &&
                                                    t(
                                                        "Popup_MemberManageCommon_DutyDefaultText",
                                                    )) ||
                                                ""
                                            }
                                            rules={rules.levelName}
                                            disabled={valiDetail}
                                            errors={errors}
                                        />
                                    </>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        rtList={[
                            {
                                title: t("Popup_MemberManageCommon_Class"),
                                essential: false,
                                colspan: 0,
                                isFlexRow: true,
                                value: (
                                    <>
                                        <C2vInput
                                            wrapClassName="w-310"
                                            name="positionName"
                                            control={control}
                                            rules={rules.positionName}
                                            placeholder={
                                                (!valiDetail &&
                                                    t(
                                                        "Popup_MemberManageCommon_ClassDefaultText",
                                                    )) ||
                                                ""
                                            }
                                            disabled={valiDetail}
                                            errors={errors}
                                        />
                                    </>
                                ),
                            },
                        ]}
                    />
                    <C2vTableRowElem
                        rtList={[
                            {
                                title: t("Popup_MemberManageCommon_Role"),
                                essential: false,
                                colspan: 0,
                                isFlexRow: true,
                                value: (
                                    <>
                                        <C2vInput
                                            name="assignTask"
                                            wrapClassName="w-310"
                                            rules={rules.assignTask}
                                            control={control}
                                            placeholder={
                                                (!valiDetail &&
                                                    t(
                                                        "Popup_MemberManageCommon_RoleDefaultText",
                                                    )) ||
                                                ""
                                            }
                                            disabled={valiDetail}
                                            errors={errors}
                                        />
                                    </>
                                ),
                            },
                        ]}
                    />
                </C2vTable>
                <div className="btn-group mt-35">
                    {renderSubmit(viewDetail)}
                </div>
            </Form>
        </div>
    );
};
export default MemberWrite;
