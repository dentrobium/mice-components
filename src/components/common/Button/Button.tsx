/* eslint-disable react/button-has-type */
/*
  styleTYpe: 버튼의 색상 타입
  size: 버튼의 크기
  type: 버튼의 타입
  link : 링크를 전달할 시 링크로 이동 하는 기능
*/

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface iButtonProps {
    title?: string;
    styleType?:
        | "primary"
        | "secondary"
        | "danger"
        | "text"
        | "icon"
        | "default";
    size?: "xsm" | "sm" | "md" | "lg" | "xl" | "default";
    type?: "submit" | "button" | "reset";
    link?: string;
    border?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: any;
    disabled?: boolean;
    active?: boolean;
    icon?: string;
}

const Button = ({
    title,
    children,
    styleType = "primary",
    size = "md",
    type = "button",
    link = "",
    border = false,
    className,
    onClick,
    disabled = false,
    active = false,
    icon,
}: iButtonProps) => (
    <button
        type={type}
        onClick={onClick}
        className={`${styles.btn} ${border ? styles.border : ""} ${
            styles[styleType]
        } ${disabled ? styles.disabled : ""} ${styles[size]} ${
            className || ""
        } ${active ? styles.active : ""}`}
        disabled={disabled}
    >
        {title && !link && (
            <span className={styleType === "icon" ? "hiddens" : ""}>
                {icon ? (
                    <img className={styles.icon} src={icon} alt="icon" />
                ) : null}
                {title}
            </span>
        )}
        {link && (
            <Link to={link} className={styles.link}>
                {icon ? (
                    <img className={styles.icon} src={icon} alt="icon" />
                ) : null}
                {title}
            </Link>
        )}
        {children && children}
    </button>
);

export default Button;
