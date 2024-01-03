/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "antd";
import { handleCopyClipBoard } from "@/utils/common";
import { useCallback } from "react";

interface iuseToastMessage {
    key?: any;
    toastMsg?: string;
    style?: any;
}

const useToastMessage = ({
    key,
    toastMsg = "번호가 클립보드에 복사되었습니다",
    style,
}: iuseToastMessage) => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = useCallback(
        (text: any) => {
            messageApi.open({
                content: text,
                onClick: () => message.destroy(key),
            });
        },
        [key, messageApi],
    );

    const handleCopy = async (copyMessage: string | undefined) => {
        try {
            const result = copyMessage || "";
            await handleCopyClipBoard(result);
            info(toastMsg);
        } catch (error) {
            info("클립보드 복사에 실패했습니다.");
        }
    };

    return {
        handleCopy,
        contextHolder,
        info,
    };
};

export default useToastMessage;
