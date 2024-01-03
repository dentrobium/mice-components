import { Modal } from "antd";
import { ReactNode } from "react";

import { iPopupProps } from "@/types/common";
import styles from "./C2vContentsPopup.module.scss";

interface iModalProps extends iPopupProps {
    children: React.ReactNode;
    width?: number;
    title?: string;
    footer?: ReactNode;
    noHeader?: boolean;
    closable?: boolean;
    closeIcon?: ReactNode;
    className?: string;
    onOk?: () => void;
}

const C2vContentsPopup = (props: iModalProps) => {
    const {
        isOpen,
        children,
        width,
        onCancel,
        title,
        noHeader = false,
        footer = false,
        closeIcon,
        className,
        onOk,
        closable,
    } = props;

    const updatedClassName = className
        ? `${styles.contentsPopup} ${className}`
        : `${styles.contentsPopup}`;

    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            onOk={onOk}
            footer={footer}
            destroyOnClose
            maskClosable={false}
            keyboard={false}
            width={width || 500}
            className={updatedClassName}
            closable={closable}
            closeIcon={
                closeIcon || (
                    <div className="close">
                        <span className="hiddens">닫기</span>
                    </div>
                )
            }
        >
            {noHeader ? null : (
                <div className={styles.header}>{title || "알림"}</div>
            )}
            {children}
        </Modal>
    );
};

export default C2vContentsPopup;
