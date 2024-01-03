import { useCallback, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { popupSelector } from "@store/popup";
import { iPopupProps } from "@/types/common";
import { COMMON_POPUP } from "@/constants";

const usePopup = (name = COMMON_POPUP) => {
    const [popup, setPopup] = useRecoilState(popupSelector(name));
    const resetPopup = useResetRecoilState(popupSelector(name));

    const {
        isOpen: open,
        message,
        isConfirm,
        isDanger,
        title,
        popId,
        okText,
        cancelText,
        maskClosable,
    } = popup;

    const onClose = useCallback(() => {
        setPopup((prev) => ({
            ...prev,
            isOpen: false,
        }));

        resetPopup();
    }, [resetPopup, setPopup]);

    const onOpen = useCallback(
        (options?: iPopupProps) => {
            resetPopup();
            setPopup((prev: any) => ({
                ...prev,
                isOpen: true,
                ...options,
            }));
        },
        [resetPopup, setPopup],
    );

    useEffect(
        () => () => {
            resetPopup();
        },
        [resetPopup],
    );

    const onOk = useCallback(() => {
        if (popup.onOk) popup.onOk();

        onClose();
    }, [onClose, popup]);

    const onCancel = useCallback(() => {
        if (popup.onCancel) popup.onCancel();

        onClose();
    }, [onClose, popup]);

    return {
        open,
        title,
        message,
        isConfirm,
        isDanger,
        okText,
        cancelText,
        popId,
        maskClosable,
        resetPopup,
        onOk,
        onCancel,
        onClose,
        onOpen,
    };
};

export default usePopup;
