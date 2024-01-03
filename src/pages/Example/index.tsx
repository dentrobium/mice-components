import { Link } from "react-router-dom";
import {
    Button,
    C2vCheckbox,
    C2vInput,
    C2vNotice,
    C2vRadio,
    C2vSubTitle,
    C2vTable,
    C2vTableRowElem,
} from "@components/common";
import { Divider, List } from "antd";
import { useForm } from "react-hook-form";
import ExampleCard from "@components/common/ExampleCard/ExampleCard";

import { usePopup } from "@/hooks/common";
import C2vContentsPopup from "@/components/common/C2vContentsPopup/C2vContentsPopup";
import { MBMWRITE_POPUP } from "@/constants";
import { useTranslation } from "react-i18next";
import MemberWrite from "@/components/pages/member/MemberWrite";

export const noticeList = [
    <span>
        컴투워스에서 탈퇴 시 서비스를 이용하던 사용자의 정보 및 데이터가
        <br />
        영구 삭제되며 복구할 수 없습니다.
    </span>,
    <span>서비스 탈퇴 처리는 신청 후 일정 기간이 소요될 수 있습니다.</span>,
    <span>
        기타 문의는{" "}
        <Link to="https://www.naver.com" className="link" target="_blank">
            고객센터
        </Link>
        로 문의 부탁드립니다
    </span>,
];

const ExamplePage = () => {
    const { control } = useForm();
    const { onOpen } = usePopup();
    const { open, onOpen: onModalOpen, onCancel } = usePopup(MBMWRITE_POPUP);
    const { t } = useTranslation();

    const handleClick = () => {
        onModalOpen();
    };

    const handleClick2 = () => {
        onOpen({
            title: "알림팝업",
            message: (
                <p style={{ whiteSpace: "pre-line" }}>
                    {t("OrgChart_OrgChartManage_TopSelectGuideText")}
                </p>
            ),
            isConfirm: true,
        });
    };

    const handleClick3 = () => {
        onOpen({
            title: "경고팝업",
            message: <p>{t("Popup_ChangesDataGuide_Description")}</p>,
            isConfirm: true,
            isDanger: true,
        });
    };

    return (
        <div style={{ padding: "20px 40px" }}>
            <List>
                <List.Item>
                    <ExampleCard
                        title="서브타이틀 컴포넌트"
                        body='<C2vSubTitle title="서브타이틀" />'
                    >
                        <C2vSubTitle title="서브타이틀" />
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="summary Table"
                        body={`
                        <C2vTable>
                            colGroup={
                                <colgroup>
                                    <col width="150px" />
                                    <col width="*" />
                                    <col width="150px" />
                                    <col width="*" />
                                </colgroup>
                            }
                        >
                            <C2vTableRowElem
                                rtList={[
                                    {
                                        title: "title1",
                                        essential: false,
                                        colspan: 0,
                                        isFlexRow: false,
                                        value: (
                                            <div>
                                                value1
                                                <b>hihihi</b>
                                            </div>
                                        ),
                                    },
                                    {
                                        title: "title2",
                                        essential: true,
                                        colspan: 1,
                                        isFlexRow: true,
                                        value: <p>value2</p>,
                                    },
                                ]}
                            />
                        </C2vTable>`}
                    >
                        <C2vTable
                            colGroup={
                                <colgroup>
                                    <col width="150px" />
                                    <col width="*" />
                                    <col width="150px" />
                                    <col width="*" />
                                </colgroup>
                            }
                        >
                            <C2vTableRowElem
                                rtList={[
                                    {
                                        title: "title1",
                                        essential: false,
                                        colspan: 0,
                                        isFlexRow: false,
                                        value: (
                                            <div>
                                                value1
                                                <b>hihihi</b>
                                            </div>
                                        ),
                                    },
                                    {
                                        title: "title2",
                                        essential: true,
                                        colspan: 1,
                                        isFlexRow: true,
                                        value: <p>value2</p>,
                                    },
                                ]}
                            />
                        </C2vTable>
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="팝업"
                        body={`
                        const {onOpen} = usePopup() // 기본 alert, confirm Popup은 매게변수를 넣지 않음
                        
                        const handleClick2 = () => {
                            onOpen({
                                title: "테스트",
                                message: "테스트",
                                isConfirm: false,
                            });
                        };

                        const { open, onOpen: onModalOpen, onCancel } = usePopup("Example");

                        const handleClick = () => {
                            onModalOpen();
                        };

                        <Button
                        styleType="primary"
                        size="md"
                        title="커스텀팝업"
                        className="name"
                        onClick={handleClick}
                        />
                        
                        <Button
                            styleType="primary"
                            size="md"
                            title="메세지팝업"
                            onClick={handleClick2}
                            className="ml-10"
                        />

                        <C2vContentsPopup
                            isOpen={open}
                            onCancel={onCancel}
                            width={1000}
                        >
                            <MemberWrite />
                        </C2vContentsPopup>
                        
                     `}
                    >
                        <Button
                            styleType="primary"
                            size="md"
                            title="커스텀팝업"
                            className="name"
                            onClick={handleClick}
                        />
                        <Button
                            styleType="primary"
                            size="md"
                            title="알림팝업"
                            onClick={handleClick2}
                            className="ml-10"
                        />
                        <Button
                            styleType="primary"
                            size="md"
                            title="경고팝업"
                            onClick={handleClick3}
                            className="ml-10"
                        />
                        <C2vContentsPopup
                            isOpen={open}
                            onCancel={onCancel}
                            width={1000}
                        >
                            <MemberWrite
                                viewDetail={1}
                                setViewDetail={() => {
                                    console.log("hi");
                                }}
                            />
                        </C2vContentsPopup>
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="버튼 type"
                        body={`
                      <Button
                      styleType="primary"
                        size="md"
                        title="버튼"
                    />

                    <Button
                    styleType="primary"
                    border
                        size="md"
                        title="버튼"
                    />

                    <Button
                    styleType="disabled"
                        size="md"
                        title="버튼"
                    />

                    <Button
                    styleType="primary"
                        size="xsm"
                        title="버튼xsm"
                    />

                    <Button
                        styleType="primary"
                        size="md"
                        title="홈으로 가기(링크버튼)"
                        link="/"
                    />
                    `}
                    >
                        <>
                            <Button
                                styleType="primary"
                                size="lg"
                                title="버튼lg"
                            />
                            <Button
                                styleType="primary"
                                size="md"
                                title="버튼md"
                                className="ml-10"
                            />
                            <Button
                                styleType="primary"
                                size="xsm"
                                title="버튼xsm"
                                className="ml-10"
                            />
                            <Divider />
                            <Button
                                styleType="primary"
                                size="md"
                                title="버튼 primary border"
                                border
                            />
                            <Divider />
                            <Button
                                styleType="danger"
                                size="md"
                                title="버튼 danger"
                            />
                            <Divider />
                            <Button
                                styleType="danger"
                                size="md"
                                border
                                title="버튼 danger border"
                            />
                            <Divider />
                            <Button
                                styleType="primary"
                                size="md"
                                title="홈으로 가기(링크버튼)"
                                link="/"
                            />
                            <Divider />
                            <Button title="버튼 disabled" disabled />
                            <Button title="버튼 disabled" disabled border />
                            <Button
                                title="버튼 disabled"
                                styleType="danger"
                                disabled
                            />
                            <Button
                                title="버튼 disabled"
                                styleType="danger"
                                disabled
                                border
                            />

                            <Divider />
                            <Button title="버튼 active" active />
                            <Button title="버튼 active" border active />
                            <Button
                                title="버튼 active"
                                styleType="danger"
                                active
                            />
                            <Button
                                title="버튼 active"
                                styleType="danger"
                                border
                                active
                            />
                        </>
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="체크박스"
                        body={`
                        <C2vCheckbox
                        name="checkboxName"
                        options={[
                            {
                                value: 0,
                                label: "체크박스 라벨입니다",
                            },
                            {
                                value: 1,
                                label: "체크박스 라벨입니다",
                            },
                        ]}
                        control={control}
                    />
                    `}
                    >
                        <C2vCheckbox
                            name="checkboxName1"
                            options={[
                                {
                                    value: "0",
                                    label: "선택 가능, 선택 표시 해제 상태",
                                },
                            ]}
                            control={control}
                        />
                        <C2vCheckbox
                            name="checkboxName2"
                            options={[
                                {
                                    value: "0",
                                    label: "선택 불가능, 강제 해제 상태",
                                },
                            ]}
                            control={control}
                            disabled
                        />
                        <C2vCheckbox
                            name="checkboxName3"
                            options={[
                                {
                                    value: "0",
                                    label: "선택 가능, 표시 설정 상태",
                                },
                            ]}
                            control={control}
                            defaultValue="0"
                        />
                        <C2vCheckbox
                            name="checkboxName4"
                            options={[
                                {
                                    value: "0",
                                    label: "선택 불가능, 강제 표시 설정 상태",
                                },
                            ]}
                            control={control}
                            defaultValue="0"
                            disabled
                        />
                        <C2vCheckbox
                            name="checkboxName5"
                            options={[
                                {
                                    value: "0",
                                    label: "size-sm",
                                },
                            ]}
                            control={control}
                            defaultValue="0"
                            size="sm"
                        />
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="라디오 박스"
                        body={`
                        <C2vRadio
                        name="radioName1"
                        options={[
                            {
                                value: 0,
                                label: "체크박스 라벨입니다",
                            },
                            {
                                value: 1,
                                label: "체크박스 라벨입니다",
                            },
                        ]}
                        control={control}
                    />
                    `}
                    >
                        <C2vRadio
                            name="radioName1"
                            options={[
                                {
                                    value: "0",
                                    label: "라디오 박스",
                                },

                                {
                                    value: "1",
                                    label: "라디오 박스",
                                },
                            ]}
                            control={control}
                            defaultValue="1"
                            readOnly
                        />
                        <Divider />
                        <C2vRadio
                            name="radioName2"
                            options={[
                                {
                                    value: "0",
                                    label: "라디오 박스",
                                },

                                {
                                    value: "1",
                                    label: "라디오 박스",
                                },
                            ]}
                            control={control}
                            defaultValue="0"
                        />
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="Input Detail"
                        body={`
                        <div className="formDetail">
                            <C2vInput
                                control={control}
                                name="test2"
                                value="상세페이지 readOnly"
                                readOnly
                            />
                        </div>
                        <Divider />
                        <div>
                            <C2vInput control={control} name="test" />
                        </div>
                    `}
                    >
                        <div className="formDetail">
                            <C2vInput
                                control={control}
                                name="test2"
                                value="상세페이지 readOnly"
                                readOnly
                            />
                        </div>
                        <Divider />
                        <div>
                            <C2vInput control={control} name="test" />
                        </div>
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="파일 업로드"
                        body={`
                    
                    `}
                    >
                        {/* <C2vProfileUploader /> */}
                        <p>업로드</p>
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="유의사항"
                        body={`
                    
                    `}
                    >
                        <C2vNotice
                            title="유의사항"
                            list={noticeList}
                            className=""
                        />
                    </ExampleCard>
                </List.Item>
                <List.Item>
                    <ExampleCard
                        title="아이콘"
                        body={`
                    
                    `}
                    >
                        <Button
                            styleType="icon"
                            size="default"
                            className="icon-copy"
                            disabled
                        />
                        <Button
                            styleType="icon"
                            size="default"
                            className="icon-copy"
                        />
                        <Button
                            styleType="icon"
                            size="default"
                            className="icon-search"
                        />
                        <Button
                            styleType="icon"
                            size="default"
                            className="icon-camera"
                        />
                        <Divider />
                        <Button
                            styleType="icon"
                            size="default"
                            className="close"
                        />
                        <Button
                            styleType="icon"
                            size="default"
                            className="close selectGroup"
                        />
                        <Button
                            styleType="icon"
                            size="default"
                            className="close search_close"
                        />
                        <Divider />
                        <Button
                            styleType="icon"
                            size="default"
                            className="icon_select"
                        />

                        <Button
                            styleType="icon"
                            size="default"
                            className="icon_select up"
                        />
                        <Divider />
                        <Button
                            styleType="icon"
                            size="default"
                            className="icon-danger"
                        />
                        <p className="icon-blueNotice" />
                    </ExampleCard>
                </List.Item>
            </List>
        </div>
    );
};

export default ExamplePage;
