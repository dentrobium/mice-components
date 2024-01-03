import { Button } from "@/components/common";
import { useTranslation } from "react-i18next";
import styles from "./authError.module.scss";

const ServerError = () => {
    const { t } = useTranslation();

    const handleClickBack = () => {
        window.history.back();
    };

    return (
        <div className={styles.authError}>
            <div className={`${styles.contentWrap} icon-big-blueNotice`}>
                <div className={styles.content}>
                    <p className={styles.title}>
                        {t("NotRespondingServer_Title01")}
                    </p>
                    <p
                        className={`${styles.txt} no-wrap`}
                        style={{ whiteSpace: "nowrap" }}
                    >
                        {t("NotRespondingServer_Description01")}
                    </p>
                    <p className={`${styles.txt} pre-line`}>
                        {t("NotRespondingServer_Description02")}
                    </p>
                </div>
            </div>
            <div className="mt-20">
                <Button
                    size="xl"
                    styleType="primary"
                    onClick={handleClickBack}
                    title={t("NotRespondingServer_RefreshButton") || ""}
                />
            </div>
        </div>
    );
};

export default ServerError;
