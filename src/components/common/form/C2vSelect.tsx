/* eslint-disable @typescript-eslint/ban-types */
import { Select, SelectProps } from "antd";

import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";
import styles from "./form.module.scss";
import ErrorMsg from "./ErrorMsg";

interface iC2vSelectProps extends SelectProps {
    label?: string;
    name: string;
    control: any;
    defaultValue?: any;
    rules?: Object;
    options: { value: string | number; label: string; disabled?: boolean }[];
    placeholder?: string;
    errors?: any;
    size?: SizeType;
    wrapClassName?: string;
    className?: string;
    disabled?: boolean;
    onChange?: (v: any) => void;
    style?: { [key: string]: any };
    readonly?: boolean;
}
const C2vSelect = (props: iC2vSelectProps) => {
    const {
        label,
        name,
        control,
        defaultValue,
        rules,
        options,
        placeholder,
        errors,
        size = "middle",
        wrapClassName,
        className,
        disabled,
        onChange,
        style = {},
        ...rest
    } = props;

    return (
        <div className={`${styles.formline} ${wrapClassName ?? ""}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                        {...rest}
                        className={className}
                        size={size}
                        id={name}
                        options={options}
                        placeholder={placeholder}
                        disabled={disabled}
                        onChange={onChange || field.onChange}
                        style={style}
                        suffixIcon={
                            <span className="icon_select">
                                <span className="hiddens">선택</span>
                            </span>
                        }
                    />
                )}
            />
            {errors && <ErrorMsg>{errors.message}</ErrorMsg>}
        </div>
    );
};

export default C2vSelect;
