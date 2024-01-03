/* eslint-disable @typescript-eslint/no-unused-vars */
import i18 from "i18next";

export const handleCopyClipBoard = async (text: string) => {
    try {
        return await navigator.clipboard.writeText(text);
    } catch (error) {
        return error;
    }
};

export const debounce = (func: any, wait: number) => {
    let timeout: NodeJS.Timeout | null;
    return (...args: any) => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
};

export const getTranslation = (key: string) => i18.t(key);
export const getParamTranslation = (
    key: string,
    param: { [key: string]: any },
) => {
    const text = i18.t(key, param);

    return text;
};

export const format = (key: string, array: string[]) => {
    let result = i18.t(key);
    array.forEach((word: string, index: number) => {
        result = result.replace(`{{${index}}}`, word);
    });
    return result;
};

export const recoilLocalStorageEffect =
    (key: string) =>
    ({ setSelf, onSet }: any) => {
        const savedValue = localStorage.getItem(key);

        if (savedValue !== null) {
            try {
                setSelf(JSON.parse(savedValue));
            } catch {
                setSelf(savedValue);
            }
        }

        onSet((newValue: any, _: any, isReset: boolean) => {
            if (isReset) localStorage.removeItem(key);
            else if (typeof newValue === "string")
                localStorage.setItem(key, newValue);
            else localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

export const filterAttrInclude = (
    list: { [key: string]: any }[],
    attr: string,
    value: string,
) => list?.filter((elem: { [key: string]: any }) => elem[attr].includes(value));

export const stringTrim = (text: any) => {
    if (typeof text === "string") return text.trim();
    return text || "";
};

export const checkKeyDown = (e: any) => {
    if (e.key === "Enter") e.preventDefault();
};
