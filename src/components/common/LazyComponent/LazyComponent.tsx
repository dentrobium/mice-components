import { Spin } from "antd";
import { ReactNode, Suspense } from "react";

import styles from "./suspense.module.scss";
// import SuspenseSkeleton from "./Skeleton";

interface iLazyComponentProps {
    component: ReactNode;
}

const LazyComponent = (props: iLazyComponentProps) => {
    const { component } = props;

    return (
        <Suspense
            fallback={
                <div className={styles.suspenseWrapper}>
                    <Spin />
                </div>
            }
        >
            {component}
        </Suspense>
    );
    // return <Suspense fallback={<div />}>{component}</Suspense>;
};

export default LazyComponent;
