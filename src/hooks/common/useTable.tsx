import { useMemo, useCallback, useState } from "react";
import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/lib/table/interface";
import { iTableProps } from "@/types/common";

export default function useTable(props: iTableProps) {
    const {
        onSort,
        onRowChange,
        // total,
        // pageSize,
        // setPageSize,
        // currentPage,
        // setCurrentPage,
        selectionType,
        hideSelectAll,
        selectedRowKeys,
        setParams,
        params,
    } = props;

    const [currentPage, setCurrentPage] = useState<any>(1);
    // const [pageSize, setPageSize] = useState<any>(params.pageSize);
    const getSearchDirection = (dir: string) => {
        switch (dir) {
            case "ascend":
                return "ASC";
            case "descend":
                return "DESC";
            default:
                return "DESC";
        }
    };

    const createSortQueryString = (sorter: any) => {
        const { field, order } = sorter;
        return `${field}:${getSearchDirection(order)}`;
    };

    const onChangeTable = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: any,
    ) => {
        setCurrentPage(pagination.current);
        if (sorter && onSort) onSort(createSortQueryString(sorter));
    };

    const handleRowChange = useCallback(
        (selectedRowKeys: any[], selectedRows: any[], info: any) => {
            if (onRowChange) onRowChange(selectedRowKeys, selectedRows, info);
        },
        [onRowChange],
    );

    const rowSelection: any = useMemo(() => {
        if (!selectionType) return undefined;
        return {
            selectedRowKeys,
            type: selectionType,
            onChange: handleRowChange,
            hideSelectAll: !!hideSelectAll,
        };
    }, [handleRowChange, hideSelectAll, selectedRowKeys, selectionType]);

    const pagination = {
        current: currentPage,
        pageSize: params.pageSize,
        showSizeChanger: false,
    };

    const onChangeSelect = (value: number) => {
        setParams((prev: any) => ({ ...prev, pageSize: value, pageNum: 1 }));
        // setPageSize(value);
        setCurrentPage(1);
    };

    return {
        onChangeTable,
        rowSelection,
        pagination,
        selectionType,
        onChangeSelect,
    };
}
