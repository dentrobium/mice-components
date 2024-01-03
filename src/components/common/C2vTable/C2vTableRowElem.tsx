/* eslint-disable react/no-array-index-key */
import React from "react";
import { getTranslation } from "@/utils/common";
import styles from "./C2vTable.module.scss";

interface iC2vTableRowProps {
    title?: any;
    essential?: boolean;
    essentialNoIcon?: boolean;
    colspan?: number;
    isFlexRow?: boolean;
    value: any;
}

interface Props {
    rtList: iC2vTableRowProps[];
    className?: string;
    noBorder?: boolean;
    customClassName?: string;
}

const C2vTableRowElem = ({
    rtList,
    noBorder = false,
    className,
    customClassName,
}: Props) => {
    const tableRow = rtList.map((item, index) => (
        <React.Fragment key={index}>
            {item.title && (
                <th>
                    <div className="flex a-center">
                        {item.title}
                        {item.essential && !item.essentialNoIcon && (
                            <span className="essential">
                                {getTranslation("Common_MustText")}
                            </span>
                        )}
                    </div>
                </th>
            )}
            {item.isFlexRow ? (
                <td colSpan={item.colspan ?? 1}>
                    <div className="flex a-center">{item.value}</div>
                </td>
            ) : (
                <td colSpan={item.colspan ?? 1}>{item.value}</td>
            )}
        </React.Fragment>
    ));

    return (
        <tr
            className={`${noBorder ? styles.noBorder : ""} ${className || ""} ${
                customClassName ? styles[customClassName] : ""
            }`}
        >
            {tableRow}
        </tr>
    );
};

export default C2vTableRowElem;
