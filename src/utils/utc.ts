import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc); // utc 플러그인 활성화

export const convertToIsoString = (date: string, hour = 0) => {
    const formattedDate = date
        ? dayjs.utc(date).startOf("day").set("hour", hour).toISOString()
        : "";

    return formattedDate;
};
