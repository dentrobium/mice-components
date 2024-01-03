import React from "react";
import { useTranslation } from "react-i18next";
// import styles from "./_c2vTable.module.scss";

interface iC2vTableRowProps {
    title?: any;
    essential?: boolean;
    children: React.ReactNode;
    colspan?: number;
    isFlexRow?: boolean;
}

const C2vTableRowElem = ({
    title,
    essential,
    children,
    colspan,
    isFlexRow,
}: iC2vTableRowProps) => {
    const { t } = useTranslation();
    return (
        <>
            {title && (
                <th>
                    {title}
                    {essential && (
                        <span className="essential">
                            {t("Common_MustText")}
                        </span>
                    )}
                </th>
            )}
            {isFlexRow ? (
                <td colSpan={colspan ?? 1} style={{ display: "flex" }}>
                    {children}
                </td>
            ) : (
                <td colSpan={colspan ?? 1}>{children}</td>
            )}
        </>
    );
};
export default C2vTableRowElem;
