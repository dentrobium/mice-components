/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useLayoutEffect, useState } from "react";
import { getTranslation } from "@/utils/common";
import { useTranslation } from "react-i18next";
import { languageState } from "@/store/language";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import C2vOutsideAlerter from "../C2vOutsideAlerter";
import styles from "./C2vLanguage.module.scss";

interface iC2vLanguageProps {
    darkMode?: boolean;
}

const C2vLanguage = ({ darkMode = false }: iC2vLanguageProps) => {
    const { i18n } = useTranslation();
    const [langCode, setLangCode] = useRecoilState(languageState);
    const navigate = useNavigate();
    const languages = [
        {
            id: 1,
            value: getTranslation("Common_Language01"),
            active: langCode === "ko",
            code: "ko",
        },
        {
            id: 2,
            value: getTranslation("Common_Language02"),
            active: langCode === "en",
            code: "en",
        },
    ];
    const [langOpen, setLangOpen] = useState(false);

    const toggleLangSelected = (code: string) => {
        // setLangSelectedIdx(1 - langSelectedIndx);
        setLangCode(code);
        // i18n.changeLanguage(code);
        // window?.location.reload();
        navigate(0);
    };

    useLayoutEffect(() => {
        const langCode = window.localStorage.getItem("languageCode") || "ko";
        setLangCode(langCode);

        // window?.location.reload();
        // setLanguages(
        //     languages.map((lang: { [key: string]: any }, idx: number) => ({
        //         ...lang,
        //         active: idx === langSelectedIndx,
        //     })),
        // );
    }, []);

    return (
        <div id={darkMode ? styles.darkMode : ""} className={styles.language}>
            <C2vOutsideAlerter
                className={styles.userDetails}
                onClickOutside={() => setLangOpen(false)}
            >
                <button
                    type="button"
                    onClick={() => setLangOpen((prev) => !prev)}
                    className={`${styles.trigger} ${
                        langOpen ? styles.active : ""
                    }`}
                >
                    {/* {languages[langSelectedIndx].value} */}
                    {languages.find((lang) => lang.code === langCode)?.value ||
                        ""}
                </button>
                {langOpen && (
                    <ul>
                        {languages.map((lan) => (
                            <li
                                key={lan.id}
                                className={lan.active ? styles.active : ""}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLangOpen(false);
                                        toggleLangSelected(lan.code);
                                    }}
                                >
                                    {lan.value}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </C2vOutsideAlerter>
        </div>
    );
};

export default C2vLanguage;
