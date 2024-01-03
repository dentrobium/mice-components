import { Button } from "@/components/common";
import { useTranslation } from "react-i18next";
import styles from "./authError.module.scss";

const AuthError = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.authError}>
            <div className={`${styles.contentWrap} icon-big-blueNotice`}>
                <div className={styles.content}>
                    <p className={styles.title}>
                        {t("DoNotHavePermissionToUse_Description")}
                    </p>
                    <p className={`${styles.txt} pre-line`}>
                        {t("DoNotHavePermissionToUse_DetailDescription")}
                    </p>
                </div>
            </div>
            <div className="mt-20">
                <Button
                    size="lg"
                    styleType="primary"
                    link="/login"
                    title={t("DoNotHavePermissionToUse_ToLoginButton") || ""}
                />
            </div>
        </div>
    );
};

export default AuthError;
