import styles from "./C2vSubTitle.module.scss";

interface Props {
    title: string;
    className?: string;
    description?: string;
    noBorder?: boolean;
}

const C2vSubTitle = ({
    title,
    description,
    className,
    noBorder = false,
}: Props) => (
    <>
        <h4
            className={`${styles.title} ${className || ""} ${
                noBorder ? styles.noBorder : ""
            }`}
        >
            {title}
            {description && (
                <span className={styles.subTitle}>{description}</span>
            )}
        </h4>
    </>
);

export default C2vSubTitle;
