import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./C2vTable.module.scss";

const C2vTableEmpty = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.tableEmpty}>
            <p className={`icon-blueNotice ${styles.content}`}>
                {t("Common_NoSearchResult")}
            </p>
        </div>
    );
};

export default C2vTableEmpty;
