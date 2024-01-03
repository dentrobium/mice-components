/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useBeforeUnload,
    unstable_usePrompt as usePrompt,
} from "react-router-dom";

const usePreventPage = (dirtyFields: any) => {
    const [sameData, setSameData] = useState(false);
    const { t } = useTranslation();
    const keysLength = useMemo(
        () => Object.keys(dirtyFields).length,
        [Object.keys(dirtyFields)],
    );
    useEffect(() => {
        if (keysLength === 0) {
            setSameData(true);
        } else {
            setSameData(false);
        }
    }, [keysLength]);

    useBeforeUnload(
        useCallback(
            (event) => {
                if (!sameData) {
                    event.preventDefault();
                    event.returnValue = "";
                }
            },
            [sameData],
        ),
    );

    usePrompt({
        when: !sameData,
        message: t("Popup_ChangesDataGuide_Description"),
    });

    return sameData;
};

export default usePreventPage;
