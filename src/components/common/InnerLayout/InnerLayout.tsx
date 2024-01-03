import { ReactNode } from "react";
import { C2vMainTitle } from "@/components/common";
import { Helmet } from "react-helmet";

interface iInnerLayoutProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
    gaTitle?: string;
}

const InnerLayout = (props: iInnerLayoutProps) => {
    const { title, description, children, className, gaTitle } = props;
    return (
        <div className={`${className || ""} wrap`}>
            <Helmet title={gaTitle} />
            <C2vMainTitle title={title}>{description}</C2vMainTitle>
            {children}
        </div>
    );
};

export default InnerLayout;
