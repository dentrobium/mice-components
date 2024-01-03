import React, { useRef, useEffect } from "react";

interface iC2vOutsideAlerter {
    children: any;
    onClickOutside: () => void;
    className?: string;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useC2vOutsideAlerter(ref, onClickOutside) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const callBackFn = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };
        // Bind the event listener
        document.addEventListener("mousedown", callBackFn);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", callBackFn);
        };
    }, [ref, onClickOutside]);
}

/**
 * Component that alerts if you click outside of it
 */
const C2vOutsideAlerter = ({
    children,
    onClickOutside,
    className,
}: iC2vOutsideAlerter) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useC2vOutsideAlerter(wrapperRef, onClickOutside);

    return (
        <div className={className} ref={wrapperRef}>
            {children}
        </div>
    );
};

export default C2vOutsideAlerter;
