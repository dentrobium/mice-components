/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";
import styles from "./form.module.scss";
import ErrorMsg from "./ErrorMsg";

interface iC2vTextareaProps {
    label?: string;
    name: string;
    control: any;
    defaultValue?: string;
    rules?: Object;
    placeholder?: string;
    errorMsg?: any;
    size?: SizeType;
    wrapClassName?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    textOnly?: boolean;
    rows?: number;
    maxLength?: number;
    maxByte?: number | undefined;
}
const C2vTextarea = (props: iC2vTextareaProps) => {
    const {
        label,
        name,
        control,
        defaultValue,
        rules,
        placeholder,
        errorMsg,
        size = "middle",
        wrapClassName,
        className,
        disabled,
        readOnly,
        textOnly,
        rows,
        maxLength,
        maxByte,
    } = props;
    const [byteSize, setByteSize] = useState(0);

    return (
        <div className={`${styles.formline} ${wrapClassName ?? ""}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <TextArea
                        {...field}
                        className={className}
                        size={size}
                        id={name}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={rows}
                        maxLength={maxLength}
                        readOnly={readOnly || textOnly}
                        autoSize={readOnly}
                        bordered={!textOnly}
                        onChange={(event) => {
                            const { value } = event.target;
                            const textEncoder = new TextEncoder();
                            const encodedText = textEncoder.encode(value);
                            const byteSize = encodedText.byteLength;
                            setByteSize(byteSize);
                            if (!maxByte || byteSize < maxByte) {
                                field.onChange(event);
                            }
                        }}
                    />
                )}
            />
            {maxByte && !readOnly && (
                <div className="w-60 t-right">
                    <span>
                        {byteSize}/{maxByte}
                    </span>
                </div>
            )}
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </div>
    );
};

export default C2vTextarea;
