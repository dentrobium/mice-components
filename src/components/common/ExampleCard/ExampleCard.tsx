/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import { Card, Divider } from "antd";
import {
    PlusSquareOutlined,
    MinusSquareOutlined,
    CopyOutlined,
} from "@ant-design/icons";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getTranslation } from "@/utils/common";
import Button from "../Button/Button";

interface Props {
    title: string;
    body: string;
    children: any;
}

const ExampleCard = ({ title = "", body = "", children }: Props) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(body);
            alert(getTranslation("Popup_CopySuccess_Description"));
        } catch (err) {
            alert("복사 실패");
        }
    };
    return (
        <>
            <Card
                title={title}
                style={{ width: "100%", border: "1px solid #000" }}
            >
                {children}
                <Divider />
                <Button
                    styleType="default"
                    size="default"
                    onClick={handleClick}
                >
                    {active ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
                </Button>
                <Button
                    styleType="default"
                    size="default"
                    onClick={handleCopy}
                    className="ml-10"
                >
                    <CopyOutlined />
                </Button>
                {/* {active && (
                    <SyntaxHighlighter language="javascript" style={dark}>
                        {body}
                    </SyntaxHighlighter>
                )} */}
            </Card>
        </>
    );
};

export default ExampleCard;
