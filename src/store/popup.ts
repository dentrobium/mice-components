import { atomFamily } from "recoil";

interface iPopupStateType {
    title?: string;
    message: string | React.ReactNode;
    isOpen: boolean;
    isConfirm: boolean;
    isDanger?: boolean;
    okText?: string;
    cancelText?: string;
    icon?: React.ReactNode;
    popId: string;
    maskClosable?: boolean;
    onOk?: (...params: any[]) => void;
    onCancel?: (...params: any[]) => void;
}

export const popupSelector = atomFamily<iPopupStateType, string>({
    key: "popupSelector",
    default: {
        title: "",
        message: "",
        isOpen: false,
        isConfirm: false,
        isDanger: false,
        popId: "",
        maskClosable: true,
    },
});
