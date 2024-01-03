/* eslint-disable react/jsx-props-no-spreading */
import { DatePicker } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";
import styles from "./form.module.scss";
import ErrorMsg from "./ErrorMsg";

dayjs.extend(weekday);
dayjs.extend(localeData);

interface iC2vDatePickerProps {
    name: string;
    control: any;
    rules?: any;
    defaultValue?: string;
    placeholder?: string;
    errorMsg?: any;
    size?: SizeType;
    className?: string;
    readOnly?: boolean;
}

const C2vDatePicker = (props: iC2vDatePickerProps) => {
    const {
        name,
        control,
        rules,
        defaultValue = "",
        placeholder,
        errorMsg,
        size = "middle",
        className,
        readOnly,
    } = props;
    const dateFormat = "YYYY-MM-DD";
    return (
        <div className={styles.formline}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <DatePicker
                        className={className}
                        placeholder={placeholder}
                        onChange={(value, dateString) => {
                            field.onChange(dateString);
                        }}
                        value={
                            field.value ? dayjs(field.value, dateFormat) : null
                        }
                        format={dateFormat}
                        size={size}
                        disabled={readOnly}
                    />
                )}
            />
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </div>
    );
};

export default C2vDatePicker;
