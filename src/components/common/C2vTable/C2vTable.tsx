import React from "react";
import styles from "./C2vTable.module.scss";

interface iC2vTableProps {
    children: React.ReactNode;
    colGroup?: React.ReactNode;
    size?: "large" | "middle" | "small";
    type?: string;
    minWidth?: boolean;
}

const C2vTable = ({
    children,
    type = "",
    colGroup,
    size = "middle",
    minWidth = true,
}: iC2vTableProps) => (
    <div
        className={`${styles.c2vTableWrap} ${
            !minWidth ? styles.widthAuto : ""
        }`}
    >
        <table
            className={`${styles.c2vTable} ${styles[size]} ${
                type && styles[type]
            }`}
        >
            {colGroup && colGroup}
            <tbody>{children}</tbody>
        </table>
    </div>
);
export default C2vTable;
