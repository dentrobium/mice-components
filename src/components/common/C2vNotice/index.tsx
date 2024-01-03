/* eslint-disable react/no-array-index-key */
import styles from "./notice.module.scss";

interface iC2vNotice {
    title?: string;
    list: any[];
    className?: string;
    customClassName?: string;
}

const C2vNotice = ({ title, list, className, customClassName }: iC2vNotice) => (
    <dl
        className={`${styles.noticeList} ${className || ""} ${
            customClassName ? styles[customClassName] : ""
        }`}
    >
        <dt>{title}</dt>
        {list?.map((item, index) => (
            <dd key={index}>{item}</dd>
        ))}
    </dl>
);

export default C2vNotice;
