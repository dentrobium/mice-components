/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import _ from "lodash";
import ApiClient from "./apiClient";

const AUTH_ROOT_URL = process.env.REACT_APP_AUTH_API_ROOT;
const AUTH_LOGIN_PATH = "/auth/v1/web/refresh" as const;
const AUTH_LOGIN_LOCAL_PATH = "/auth/v1/web/refresh-local" as const;
const AUTH_MODE = process.env.REACT_APP_AUTH_MODE;

let lock = false;
let subscribers: ((token: string) => void)[] = [];

export default class AuthClient extends ApiClient {
    readonly initToken: string = "";

    constructor(baseUrl = "", token = "") {
        super(baseUrl);
        if (!_.isEmpty(token)) {
            this.initToken = token;
        }
        this.initInspector();
    }

    private initInspector() {
        if (!this.axiosInstance) {
            throw new Error("The instance has not been initialized");
        }

        this.axiosInstance.interceptors.request.use(
            (config: any) => this.setRequestInspector(config),
            (error: any) => Promise.reject(error),
        );

        this.axiosInstance.interceptors.response.use(
            (response: any) => this.setResponseInspector(response),
            async (err) => {
                const {
                    config,
                    response: { status },
                } = err;

                const originalRequest = config;

                const authPassErrorUrl =
                    AUTH_MODE === "local"
                        ? AUTH_LOGIN_LOCAL_PATH
                        : AUTH_LOGIN_PATH;

                // 1. refreshtoken에서 에러가 난 경우 에러 반환
                // 2. 401, 419 에러는 refresh 로직 수행
                if (
                    config.url === authPassErrorUrl ||
                    (status !== 401 && status !== 419)
                )
                    return Promise.reject(err);

                if (lock) {
                    return new Promise((resolve) => {
                        this.subscribeTokenRefresh((token: string) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(axios(originalRequest));
                        });
                    });
                }

                lock = true;
                const accessToken = await this.getRefreshToken();

                if (typeof accessToken === "string") {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                    return axios(config);
                }

                return Promise.reject(err);
            },
        );
    }

    private setRequestInspector(config: any) {
        // todo : AccessToken을 로컬스토리지에 저장 하는 것이 맞을지 검토 하여야함
        //     1. 로컬스토리지에 저장시 console 창을 통하여 탈취가 가능 하기 때문에, Cookie 사용 하는 방법
        //         Cookie를 사용 하게 될 경우 인증 처리를 FE 에서 안해야함
        const token = _.isEmpty(this.initToken)
            ? this.getToken()
            : this.initToken;

        config.headers = {
            Authorization: `Bearer ${token}`,
        };

        return config;
    }

    private setResponseInspector(response: any) {
        const { data } = response;
        const codeCheck = Math.floor(data.code / 100) !== 2;

        if (codeCheck) {
            return Promise.reject(data);
        }

        return response;
    }

    private getToken(): string {
        return localStorage.getItem("c2vWebAccessToken") || "";
    }

    // eslint-disable-next-line consistent-return
    getRefreshToken = async (): Promise<string | void> => {
        try {
            if (AUTH_MODE === "local") {
                const oldToken = localStorage.getItem("c2vRefresh");

                const response = await axios.post(
                    `${AUTH_ROOT_URL}${AUTH_LOGIN_LOCAL_PATH}`,
                    {
                        accessExpires: 60,
                        c2vRefreshToken: oldToken,
                    },
                    { withCredentials: true },
                );

                if (response.status === 200) {
                    const { code, data } = response.data;

                    if (code === 200) {
                        lock = false;
                        this.onRrefreshed(data.c2vWebAccessToken);
                        subscribers = [];

                        localStorage.setItem(
                            "c2vWebAccessToken",
                            data.c2vWebAccessToken,
                        );
                        localStorage.setItem(
                            "c2vRefreshToken",
                            data.c2vRefreshToken,
                        );

                        return data.c2vWebAccessToken;
                    }
                }

                // 예상하지 못한 에러인 경우 도메인으로 이동
                window.location.href = `${window.location.origin}/authError`;
            }

            const response = await axios.post(
                `${AUTH_ROOT_URL}${AUTH_LOGIN_PATH}`,
                {},
                { withCredentials: true },
            );

            lock = false;

            if (response.status === 200) {
                const { code, data } = response.data;

                if (code === 200) {
                    this.onRrefreshed(data.c2vWebAccessToken);
                    subscribers = [];

                    localStorage.setItem(
                        "c2vWebAccessToken",
                        data.c2vWebAccessToken,
                    );

                    return data.c2vWebAccessToken;
                }
            }

            if (AUTH_MODE === "dev") {
                console.error("refresh Error!!");
            } else {
                // 예상하지 못한 에러인 경우 도메인으로 이동
                window.location.href = window.location.origin;
            }
        } catch (e) {
            lock = false;
            if (AUTH_MODE === "dev") {
                console.error("refresh Error!!", e);
            } else {
                subscribers = [];
                localStorage.removeItem("c2vWebAccessToken");
                localStorage.removeItem("c2vRefreshToken");

                // 예상하지 못한 에러인 경우 도메인으로 이동
                window.location.href = `${window.location.origin}/authError`;
            }
        }
    };

    subscribeTokenRefresh = (cb: (token: string) => void) => {
        subscribers.push(cb);
    };

    onRrefreshed = (token: string) => {
        subscribers.forEach((cb) => cb(token));
    };
}
