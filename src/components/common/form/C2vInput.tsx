/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
import { Input, InputProps } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import ErrorMsg from "./ErrorMsg";

interface iC2vInput extends InputProps {
    label?: string;
    name: string;
    control: any;
    defaultValue?: string | number;
    rules?: Object;
    placeholder?: string;
    errors?: any;
    size?: SizeType;
    wrapClassName?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    textOnly?: boolean;
    onClick?: () => void;
    maxLength?: number;
    style?: { [key: string]: any };
    type?: "text" | "password" | "number";
    min?: number;
    max?: number;
    onChange?: (e: any) => void;
    validateOnChange?: boolean;
}

const C2vInput = (props: iC2vInput) => {
    const {
        label,
        name,
        control,
        defaultValue = "",
        placeholder,
        errors = {},
        size = "middle",
        wrapClassName,
        className,
        disabled,
        readOnly,
        textOnly,
        onClick,
        maxLength,
        style,
        type = "text",
        min = 0,
        max,
        rules,
        onChange,
        ...rest
    } = props;

    const { t } = useTranslation();

    return (
        <div className={wrapClassName ?? undefined}>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <Input
                        {...field}
                        className={`${className || ""} ${
                            errors?.[name]?.message ? "errorForm" : ""
                        }`}
                        size={size}
                        status={
                            Object.keys(errors).length > 0 ? "error" : undefined
                        }
                        id={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly || textOnly}
                        onClick={onClick || undefined}
                        maxLength={maxLength}
                        style={style}
                        bordered={!textOnly}
                        type={type}
                        min={min}
                        max={max}
                        onChange={onChange || field.onChange}
                        allowClear={{
                            clearIcon: (
                                <span className="close search_close">
                                    <span className="hiddens">{t("닫기")}</span>
                                </span>
                            ),
                        }}
                        {...rest}
                    />
                )}
            />
            {errors?.[name]?.message && (
                <ErrorMsg>{errors[name].message}</ErrorMsg>
            )}
        </div>
    );
};

export default C2vInput;
