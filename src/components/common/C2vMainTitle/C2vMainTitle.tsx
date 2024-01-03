import styles from "./C2vMainTitle.module.scss";

interface Props {
    title: string;
    children?: any;
}

const C2vMainTitle = ({ title, children }: Props) => (
    <>
        <h3 className={styles.title}>
            {title}
            <span className={styles.subTitle}>{children}</span>
        </h3>
    </>
);

export default C2vMainTitle;
