/* eslint-disable react/jsx-props-no-spreading */
import { Radio, RadioChangeEvent } from "antd";
import { Control, Controller } from "react-hook-form";
import styles from "./form.module.scss";
import ErrorMsg from "./ErrorMsg";

interface iC2vRadioProps {
    label?: string;
    name?: string;
    options: any[];
    control?: Control<any>;
    defaultValue?: any;
    rules?: any;
    errors?: any;
    wrapClassName?: string;
    readOnly?: boolean;
    onChange?: (e: RadioChangeEvent) => void;
    custom?: boolean;
    children?: any;
    size?: "sm" | "md" | "lg";
}

const C2vRadio = (props: iC2vRadioProps) => {
    const {
        label,
        name = "",
        options,
        control,
        rules,
        errors,
        wrapClassName,
        onChange,
        defaultValue,
        custom = false,
        children,
        readOnly = false,
        size = "md",
    } = props;

    return (
        <div className={`${styles.formline} ${wrapClassName ?? ""}`}>
            {label && <label>{label}</label>}
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field }) =>
                    !custom ? (
                        <Radio.Group
                            {...field}
                            defaultValue={defaultValue}
                            options={options}
                            onChange={(e: RadioChangeEvent) => {
                                if (onChange) {
                                    onChange(e);
                                }
                                field.onChange(e);
                            }}
                            disabled={readOnly}
                            className={`${styles.radio} ${styles[size]}`}
                        />
                    ) : (
                        <Radio.Group
                            {...field}
                            defaultValue={defaultValue}
                            onChange={(e: RadioChangeEvent) => {
                                if (onChange) {
                                    onChange(e);
                                }
                                field.onChange(e);
                            }}
                            disabled={readOnly}
                            className={`${styles.radio} ${styles[size]}`}
                        >
                            {children}
                        </Radio.Group>
                    )
                }
            />
            {errors && <ErrorMsg>{errors.message}</ErrorMsg>}
        </div>
    );
};

export default C2vRadio;
