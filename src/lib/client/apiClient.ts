import axios, { AxiosInstance } from "axios";

export default class ApiClient {
    protected axiosInstance: AxiosInstance | undefined;

    constructor(baseUrl: string | undefined) {
        this.axiosInstance = axios.create({ baseURL: baseUrl || "." });
    }

    async get(
        url: string,
        params = {},
        header?: {
            "Content-type": "application/json; charset=UTF-8";
        },
    ): Promise<any> {
        if (!this.axiosInstance) {
            return Promise.reject(
                new Error("The instance has not been initialized"),
            );
        }
        try {
            const response = await this.axiosInstance.get(url, {
                headers: header,
                params,
                timeout: 5000,
            });

            return response;
        } catch (err: any) {
            const { code } = err;

            if (!code) {
                window.location.href = "/serverError";
                return err;
            }
            return err;
        }
    }

    async post(
        url: string,
        body: any,
        header = {
            "Content-type": "application/json; charset=UTF-8",
        },
    ): Promise<any> {
        try {
            if (!this.axiosInstance) {
                return Promise.reject(
                    new Error("The instance has not been initialized"),
                );
            }
            const response = await this.axiosInstance.post(url, body, {
                headers: header,
                timeout: 5000,
                // cancelToken: source.token,
            });

            return response.data;
        } catch (err: any) {
            const { code } = err;

            if (!code) {
                window.location.href = "/serverError";
                return err;
            }
            return err;
        }
    }

    async upload(url: string, body: any): Promise<any> {
        try {
            if (!this.axiosInstance) {
                return Promise.reject(
                    new Error("The instance has not been initialized"),
                );
            }
            const response = await this.axiosInstance.post(url, body, {
                headers: {
                    "Content-type": "multipart/form-data; charset=UTF-8",
                },
            });

            return response.data;
        } catch (err: any) {
            const { code } = err;

            if (!code) {
                window.location.href = "/serverError";
                return err;
            }
            return err;
        }
    }

    async put(
        url: string,
        body: any,
        header = {
            "Content-type": "application/json; charset=UTF-8",
        },
    ): Promise<any> {
        if (!this.axiosInstance) {
            return Promise.reject(
                new Error("The instance has not been initialized"),
            );
        }
        const response = await this.axiosInstance.put(url, body, {
            headers: header,
        });
        return response;
    }

    async delete(url: string, body?: any, header?: any): Promise<any> {
        if (!this.axiosInstance) {
            return Promise.reject(
                new Error("The instance has not been initialized"),
            );
        }
        const response = await this.axiosInstance.delete(url, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                ...header,
            },
            data: { ...body },
        });
        return response;
    }

    async fileDelete(url: string, body?: any): Promise<any> {
        if (!this.axiosInstance) {
            return Promise.reject(
                new Error("The instance has not been initialized"),
            );
        }

        const config = {
            method: "delete",
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            data: body,
        };

        const response = await this.axiosInstance.delete(url, config);
        return response;
    }

    async patch(
        url: string,
        body: any,
        header = {
            "Content-type": "application/json; charset=UTF-8",
        },
    ): Promise<any> {
        if (!this.axiosInstance) {
            return Promise.reject(
                new Error("The instance has not been initialized"),
            );
        }
        const response = await this.axiosInstance.patch(url, body, {
            headers: header,
        });
        return response;
    }
}
