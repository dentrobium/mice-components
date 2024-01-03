import { C2vMessagePopup } from "@/components/common";
import C2vLoading from "@/components/common/C2vLoading";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useGaRouteChange, useLoading, usePopup } from "@/hooks/common";
import { Outlet } from "react-router-dom";

const C2vWrapper = () => {
    const {
        message,
        title,
        onCancel,
        onOk,
        open: isOpen,
        isConfirm,
        isDanger,
        okText,
        cancelText,
        maskClosable,
    } = usePopup();
    const { loading } = useLoading();
    useGaRouteChange();

    return (
        <>
            {loading && <C2vLoading />}
            <Outlet />
            <C2vMessagePopup
                isOpen={isOpen}
                message={message}
                title={title}
                onOk={onOk}
                onCancel={onCancel}
                isConfirm={isConfirm}
                okText={okText}
                cancelText={cancelText}
                isDanger={isDanger}
                maskClosable={maskClosable}
            />
        </>
    );
};

export default C2vWrapper;
