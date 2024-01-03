import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import styles from "./c2vLoading.module.scss";

const antIcon = (
    <LoadingOutlined style={{ fontSize: 72, color: "white" }} spin />
);

const C2vLoading = () => (
    <div className={styles.loadingBackground}>
        {/* <Spin size="large" className={styles.loadingSpinner} /> */}
        <Spin indicator={antIcon} />
    </div>
);
export default C2vLoading;
