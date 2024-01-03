import { useForm } from "react-hook-form";
import {
    Button,
    C2vTable,
    C2vTableRowElem,
    ErrorMsg,
} from "@/components/common";

import { Form } from "antd";

import { convertToIsoString } from "@/utils/utc";

import { useListContext } from "@/context/list-context";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { checkKeyDown } from "@/utils/common";
import HistoryDatePicker from "./HistoryDatePicker";

const colGroup = (
    <colgroup>
        <col width="30px" />
        <col width="*" />
    </colgroup>
);

const HistorySearchBar = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            startDate: "",
            endDate: "",
        },
    });
    const { setParams } = useListContext();

    const onSubmit = (values: any) => {
        const { startDate, endDate } = values;
        const startDatetime = convertToIsoString(startDate);
        const endDatetime = convertToIsoString(endDate, 24);

        setParams((prev: any) => ({
            ...prev,
            pageNum: 0,
            startDatetime,
            endDatetime,
        }));
    };
    const onerror = (e: any) => {
        console.log(e, "error");
    };
    const firstError = useCallback(
        () =>
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(errors).reduce((acc: any, [_, value]) => {
                if (!acc && value) {
                    return value.message;
                }
                return acc;
            }, null),
        [errors],
    );

    const { t } = useTranslation();

    return (
        <Form
            onFinish={handleSubmit(onSubmit, onerror)}
            onKeyDown={(e) => checkKeyDown(e)}
        >
            <C2vTable colGroup={colGroup}>
                <C2vTableRowElem
                    rtList={[
                        {
                            title: t("Common_Check"),
                            essential: false,
                            colspan: 0,
                            isFlexRow: false,
                            value: (
                                <HistoryDatePicker
                                    control={control}
                                    setValue={setValue}
                                    errors={errors}
                                />
                            ),
                        },
                    ]}
                />
            </C2vTable>
            {errors && (
                <>
                    <ErrorMsg>{firstError()}</ErrorMsg>
                </>
            )}
            <div className="flex j-center mtb-30">
                <Button type="submit">{t("Common_CalendarInquiry")}</Button>
            </div>
        </Form>
    );
};

export default HistorySearchBar;
