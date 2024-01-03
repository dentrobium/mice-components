/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Button, C2vUpload } from "@components/common";

import { uploadProfileImage } from "@/lib/api/office/member";
import { useLoading, usePopup } from "@/hooks/common";
import { responseCode } from "@/constants/code";
import { getTranslation } from "@/utils/common";
import { userAuthInfoState } from "@/store/authorization";
import { useRecoilValue } from "recoil";
import C2vProfile from "../C2vProfile";
import styles from "./c2vProfileUploader.module.scss";

const accept = ".png, .pjp, .jpg, .jpeg, .pjpeg, .jfif";

interface iC2vProfileUploader {
    viewOnly?: boolean;
    photoPath?: string;
    viewDetail?: number;
    imageUrl?: string;
    setFileName?: (path: string) => void;
}

const C2vProfileUploader = ({
    viewOnly = false,
    viewDetail,
    photoPath,
    imageUrl,
    setFileName,
}: iC2vProfileUploader) => {
    const { t } = useTranslation();
    const uploadRef = useRef<HTMLInputElement>(null);
    const [imgSrc, setImgSrc] = useState<string | undefined>(imageUrl);
    const { groupId } = useRecoilValue(userAuthInfoState);
    const { setLoading } = useLoading();
    const { onOpen } = usePopup();

    useEffect(() => {
        console.log(imageUrl);
        if (viewDetail !== 1) setImgSrc(imageUrl);
    }, [imageUrl, viewDetail]);

    const isImageFile = () => {
        const a = ".png, .pjp, .jpg, .jpeg, .pjpeg, .jfif";
        return true;
    };

    const isFileSizeVaild = () => {
        const size = "10";
        return true;
    };

    const handleFileChange = async (file: File | null) => {
        // if (isImageFile()) return false;
        // if (isFileSizeVaild()) return false;
        if (!file) return;

        // const fileInput = document.getElementById("file-input");
        // const file = fileInput.files[0];
        // const timestamp = new Date().getTime();
        // const newFileName = `${timestamp}_${file.name}`;
        setLoading(true);
        const form = new FormData();
        // orm.append("groupId", "1");
        const strGroupId = groupId.toString();
        // form.append("groupId", strGroupId);
        form.append("file", file);

        const res = await uploadProfileImage(strGroupId, form);

        if (res.code === 200) {
            setLoading(false);
            setImgSrc(res.data.url);
            if (setFileName) setFileName(res.data.url);
            return;
        }
        if (res.code === 500) {
            setLoading(false);
            onOpen({
                title: getTranslation("Common_LeftTabMiddleCategory03"),
                isDanger: true,
                message: (
                    <p>{getTranslation("Popup_CommonErrorDescription01")}</p>
                ),
            });
            return;
        }

        if (res.code === responseCode.DuplicateFileName) {
            setLoading(false);
            onOpen({
                title: getTranslation("Common_LeftTabMiddleCategory03"),
                isDanger: true,
                message: (
                    <p>{getTranslation("Popup_CommonErrorDescription01")}</p>
                ),
            });
        }
    };

    // png, pjp, jpg, pjpeg, jpeg, jfif
    const handleClick = () => {
        uploadRef.current?.click();
    };

    return (
        <div className={styles.upload}>
            <C2vUpload
                name="upload"
                ref={uploadRef}
                accept={accept}
                onChange={handleFileChange}
            />
            <div
                className={`${styles.profileWrapper} ${
                    imgSrc && imgSrc !== "" ? styles.profileImg : ""
                }`}
            >
                <C2vProfile className="profileSetting" imgSrc={imgSrc} />
                {!viewOnly && (
                    <Button
                        styleType="icon"
                        size="default"
                        title={
                            t(
                                "Main_DefaultProfilInformationButtonDescription",
                            ) || ""
                        }
                        className={`icon-camera ${styles.profileSetting}`}
                        onClick={handleClick}
                    />
                )}
            </div>
            <p className={styles.title}>
                {t("DefaultEnvironment_ProfilInformation_ProfilePortrait")}
            </p>
        </div>
    );
};

export default C2vProfileUploader;
