import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import ErrorMsg from "./ErrorMsg";
import styles from "./form.module.scss";

interface iC2vCheckboxProps {
    label?: string;
    name: string;
    options: any;
    control: any;
    defaultValue?: number | string | boolean;
    rules?: any;
    errors?: any;
    wrapClassName?: string;
    onChange?: (e: any) => void;
    disabled?: boolean;
    checked?: (e: any) => void;
    value?: any;
    className?: string;
    size?: "sm" | "md" | "lg";
}

const C2vCheckbox = (props: iC2vCheckboxProps) => {
    const {
        label,
        name,
        options,
        control,
        defaultValue,
        rules,
        errors,
        wrapClassName,
        onChange,
        disabled,
        value = "",
        size = "md",
    } = props;

    return (
        <div className={`${styles.formline} ${wrapClassName ?? ""} `}>
            {label && <label>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) =>
                    options.length > 1 ? (
                        <Checkbox.Group
                            {...field}
                            options={options}
                            onChange={onChange || field.onChange}
                            disabled={disabled}
                            value={value || field.value}
                            className={`${styles.checkbox} ${styles[size]}`}
                        />
                    ) : (
                        <Checkbox
                            disabled={disabled}
                            onChange={field.onChange}
                            checked={field.value}
                            className={`${styles.checkbox} ${styles[size]}`}
                        >
                            {options[0]?.label}
                        </Checkbox>
                    )
                }
            />

            {errors && <ErrorMsg>{errors.message}</ErrorMsg>}
        </div>
    );
};

export default C2vCheckbox;
