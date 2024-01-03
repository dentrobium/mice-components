import { forwardRef } from "react";

import styles from "./index.module.scss";

interface iUploadProps {
    accept?: string;
    name: string;
    multiple?: boolean;
    onChange?: (file: File | null) => void;
}

const C2vUpload = forwardRef<HTMLInputElement, iUploadProps>((props, ref) => {
    const { accept, name, multiple, onChange } = props;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const file = files[0];

            if (onChange) {
                onChange(file);
            }
        } else if (onChange) {
            onChange(null);
        }
    };

    return (
        <input
            ref={ref}
            className={styles.file}
            type="file"
            name={name}
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
        />
    );
});

export default C2vUpload;
