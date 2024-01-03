import { Button } from "@/components/common";
import { useTranslation } from "react-i18next";
import styles from "./authError.module.scss";

const LoginError = () => {
    const { t } = useTranslation();
    console.log("LOGIN ERROR ");

    return (
        <div className={styles.authError}>
            <div className={`${styles.contentWrap} icon-big-blueNotice`}>
                <div className={styles.content}>
                    <p className={styles.title}>
                        {t("NewMemberInformation_Title")}
                    </p>
                    <p className={`${styles.txt} pre-line`}>
                        {t("NewMemberInformation_DetailDescription")}
                    </p>
                </div>
            </div>
            <div className="mt-20">
                <Button
                    size="xl"
                    styleType="primary"
                    link="https://com2verse.com/download"
                    title={t("NewMemberInformation_ToDownloadButton") || ""}
                />
            </div>
        </div>
    );
};

export default LoginError;
