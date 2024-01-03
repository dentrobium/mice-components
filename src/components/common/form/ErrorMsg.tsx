import React from "react";
import styles from "./form.module.scss";

interface iErrorMsgProps {
    children: React.ReactNode;
}

const ErrorMsg = ({ children }: iErrorMsgProps) => (
    <p className={styles.error}>{children}</p>
);

export default ErrorMsg;
