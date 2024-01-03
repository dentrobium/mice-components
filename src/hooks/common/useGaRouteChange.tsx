/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const GA_KEY = process.env.REACT_APP_GA_KEY;

const useGaRouteChange = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    // localhost는 기록하지 않음
    useEffect(() => {
        // if (!window.location.href.includes("localhost")) {
        if (GA_KEY) ReactGA.initialize(GA_KEY);
        setInitialized(true);
        // }
    }, []);

    // location 변경 감지시 pageview 이벤트 전송
    // useEffect(() => {
    //     if (initialized) {
    //         ReactGA.set({ page: location.pathname });
    //         ReactGA.send("pageview");
    //     }
    // }, [initialized, location]);

    // 개발용
    // useEffect(() => {
    //     if (GA_KEY) {
    //         ReactGA.initialize(GA_KEY, { gtagOptions: { debug: true } });
    //         ReactGA.set({ page: location.pathname });
    //         ReactGA.send("pageview");
    //     }
    // }, [location]);
};

export default useGaRouteChange;
