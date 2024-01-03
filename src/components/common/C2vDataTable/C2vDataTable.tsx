/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import C2vTableEmpty from "../C2vTable/C2vTableEmpty";

interface iTableProps {
    // rowSelection 관련
    selectedRowKeys?: any;
    onChange?: any;
    getCheckboxProps?: any;
    // 테이블 조작 관련
    onSort?: any;
    showHeader?: boolean;
    // 페이지 네이션
    isPagination?: boolean;
    onPageChange?: any;
    // 데이터 관련
    columns: any[];
    dataSource?: any[];
    rowKey?: string;
    isLoading?: boolean;
    isCheckbox?: boolean;
    pageNum?: number;
    total?: number;
    onRowClick?: (record, rowIndex) => void;
    className?: string;
}

interface iSorterType {
    field: string;
    order: string;
}

const C2vDataTable = (props: iTableProps) => {
    const {
        selectedRowKeys,
        onChange,
        getCheckboxProps,
        columns,
        dataSource,
        isPagination,
        rowKey,
        isLoading,
        onSort,
        onPageChange,
        isCheckbox,
        showHeader = true,
        pageNum = 1,
        total = 50,
        onRowClick,
        className,
    } = props;

    const [currentPage, setCurrentPage] = useState(pageNum);
    const isRow = false;

    useEffect(() => {
        setCurrentPage(pageNum);
    }, [pageNum]);

    const getSearchDirection = (dir: string) => {
        switch (dir) {
            case "ascend":
                return "asc";
            case "descend":
                return "desc";
            default:
                return "desc";
        }
    };

    const createSortQueryString = (sorter: iSorterType) => {
        const { order } = sorter;
        return `${getSearchDirection(order)}`;
    };

    const onChangeTable = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: any,
    ) => {
        console.log("sorter", sorter);
        if (pagination?.current) setCurrentPage(pagination?.current);
        if (sorter && onSort) onSort(sorter, createSortQueryString(sorter));
    };

    const { t } = useTranslation();

    return (
        <Table
            rowSelection={
                isCheckbox
                    ? {
                          selectedRowKeys,
                          onChange,
                          getCheckboxProps,
                      }
                    : undefined
            }
            columns={columns}
            dataSource={dataSource}
            showHeader={showHeader}
            pagination={
                isPagination
                    ? {
                          current: currentPage,
                          pageSize: 10,
                          showSizeChanger: false,
                          position: ["bottomCenter"],
                          total,
                          onChange: onPageChange,
                          locale: { jump_to: "", page: "Page " },
                          hideOnSinglePage: true,
                          showQuickJumper: {
                              goButton: (
                                  <Button
                                      size="xsm"
                                      styleType="primary"
                                      className="ml-24"
                                      border
                                  >
                                      {t("Member_MemberManage_PageMoveButton")}
                                  </Button>
                              ),
                          },
                          className: "customPagination",
                      }
                    : false
            }
            rowKey={rowKey}
            loading={isLoading}
            onChange={onChangeTable}
            locale={{
                emptyText: <>{!isLoading && <C2vTableEmpty />}</>,
            }}
            showSorterTooltip={false}
            sortDirections={["ascend"]}
            onRow={(record, rowIndex) => ({
                onClick: () =>
                    onRowClick ? onRowClick(record, rowIndex) : undefined,
            })}
            className={className}
        />
    );
};

export default C2vDataTable;
