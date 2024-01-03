import React from "react";
import styles from "./C2vProfile.module.scss";

const C2vProfile = (props: any) => {
    const {
        imgSrc = "/assets/images/common/icon_noImg.png",
        className,
        onClick,
    } = props;

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            className={`${styles.C2vProfile} ${
                className ? styles[className] : ""
            }`}
            onClick={onClick}
        >
            <img
                src={imgSrc || "/assets/images/common/icon_noImg.png"}
                alt="ProfileImage"
            />
        </div>
    );
};

export default C2vProfile;
