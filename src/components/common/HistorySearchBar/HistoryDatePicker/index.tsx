/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, C2vDatePicker } from "@/components/common";
import dayjs from "dayjs";
import { convertToIsoString } from "@/utils/utc";
import { getTranslation } from "@/utils/common";
import styles from "./searchComp.module.scss";

const today = dayjs().format("YYYY-MM-DD");

const refDatastoryDatePicker = ({
    control,
    setValue,
    errors,
}: {
    control: any;
    setValue: any;
    errors: any;
}) => {
    const handleToday = () => {
        setValue("startDate", today);
        setValue("endDate", today);
    };
    const handleWeek = () => {
        const weekLater = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        setValue("startDate", weekLater);
        setValue("endDate", today);
    };
    const handleMonth = () => {
        const monthAgo = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        setValue("startDate", monthAgo);
        setValue("endDate", today);
    };

    const validateEndDate = (endDate: any, refData: any) => {
        const { startDate } = refData;
        if (dayjs(startDate) && dayjs(endDate).isBefore(startDate)) {
            return getTranslation("Common_CalendarErro3");
        }
        return true;
    };

    return (
        <div className={styles.search}>
            <C2vDatePicker
                name="startDate"
                control={control}
                placeholder={getTranslation("Common_Calendar2")}
                rules={{
                    required: getTranslation("Common_CalendarErro1"),
                }}
            />
            <span className={styles.hypen}> ~ </span>
            <C2vDatePicker
                name="endDate"
                control={control}
                placeholder={getTranslation("Common_Calendar3")}
                rules={{
                    required: getTranslation("Common_CalendarErro2"),
                    validate: validateEndDate,
                }}
            />
            <div className={styles.btnWrap}>
                <Button size="xsm" border onClick={handleToday}>
                    {getTranslation("Common_CalendarQuick1")}
                </Button>
                <Button size="xsm" border onClick={handleWeek}>
                    {getTranslation("Common_OneWeekButton")}
                </Button>
                <Button size="xsm" border onClick={handleMonth}>
                    {getTranslation("Common_OneYearButton")}
                </Button>
            </div>
        </div>
    );
};

export default refDatastoryDatePicker;
