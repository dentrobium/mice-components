import { getTranslation } from "@/utils/common";

interface iTranslationParagraphProps {
    keyStr: string;
}

const TranslationParagraph = (props: iTranslationParagraphProps) => {
    const { keyStr } = props;
    const str = getTranslation(keyStr).replace("\n", "<br />");

    return (
        <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: str,
            }}
        />
    );
};

export default TranslationParagraph;
