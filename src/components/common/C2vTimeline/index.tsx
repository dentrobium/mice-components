import styles from "./C2vTimeline.module.scss";

let id = 0;

interface iC2vTimelineProps {
    items: string[];
}

const C2vTimeline = ({ items }: iC2vTimelineProps) => (
    <ul className={styles.ul}>
        {items && (
            <>
                {items.map((item: string) => (
                    <li key={id++}>{item}</li>
                ))}
            </>
        )}
    </ul>
);
export default C2vTimeline;
