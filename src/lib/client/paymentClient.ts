import axios, { AxiosInstance } from "axios";

export default class PaymentClient {
    protected axiosInstance: AxiosInstance | undefined;

    constructor(baseUrl: string | undefined) {
        this.axiosInstance = axios.create({ baseURL: baseUrl || "." });
    }

    async get(url: string, params = {}): Promise<any> {
        if (!this.axiosInstance) {
            return Promise.reject(
                new Error("The instance has not been initialized"),
            );
        }

        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url,
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            data: JSON.stringify(params),
        };

        const response = await this.axiosInstance.request(config);
        // header가 parameter로 넣을거아냐 customheader를 넣을거자나 넣는애가없으면 기본으로 default로 content-type을 넣고 param 잇으면 , 그냥 그 거 꽂히게 하면된다.

        return response;
    }

    async post(
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
        const response = await this.axiosInstance.post(url, body, {
            headers: header,
        });

        return response;
    }

    async upload(url: string, body: any): Promise<any> {
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

        return response;
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
