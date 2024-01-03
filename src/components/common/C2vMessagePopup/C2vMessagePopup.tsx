import { Modal } from "antd";

import { iPopupProps } from "@/types/common";
import { getTranslation } from "@/utils/common";

import styles from "./C2vMessagePopup.module.scss";
import Button from "../Button/Button";

const C2vMessagePopup = (props: iPopupProps) => {
    const {
        isOpen,
        message,
        title,
        okText,
        cancelText,
        onCancel,
        onOk,
        isConfirm,
        isDanger,
        maskClosable,
    } = props;

    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            footer={false}
            destroyOnClose
            width={610}
            className={styles.contentsPopup}
            closable={false}
            maskClosable={maskClosable}
        >
            <div
                className={`${styles.header} ${isDanger ? styles.danger : ""}`}
            >
                {title || "알림"}
            </div>
            <div className={styles.content}>
                {isDanger && (
                    <div className="flex j-center mb-30">
                        <span className="icon-danger">
                            <span className="hiddens">경고</span>
                        </span>
                    </div>
                )}

                {message}
            </div>
            <div className={styles.btnGroup}>
                {isConfirm ? (
                    <>
                        <Button onClick={onCancel} border size="lg">
                            {cancelText ||
                                getTranslation("Common_CancelButton")}
                        </Button>
                        <Button
                            onClick={onOk}
                            styleType={isDanger ? "danger" : "primary"}
                            size="lg"
                        >
                            {okText || getTranslation("Common_OKButton")}
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={onOk}
                        styleType={isDanger ? "danger" : "primary"}
                        size="lg"
                    >
                        {okText || getTranslation("Common_OKButton")}
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default C2vMessagePopup;
