import { DataNode } from "antd/es/tree";
import { ModalProps } from "antd";

export interface iTableProps {
    onSort?: (query: string) => void;
    onRowChange?: (...args: any) => void;
    pageSize?: number;
    setPageSize?: any;
    total?: number;
    currentPage?: number;
    setCurrentPage?: any;
    selectionType?: "checkbox" | "radio" | undefined;
    selector?: any;
    hideSelectAll?: any;
    selectedRowKeys?: any;
    setParams?: any;
    params?: any;
}

export interface iPopupProps extends ModalProps {
    isOpen?: boolean;
    message?: string | React.ReactNode;
    isConfirm?: boolean;
    isDanger?: boolean;
    /* okText?: string;
    cancelText?: string;
    icon?: React.ReactNode;
    onCancel?: () => void;
    onOk?: () => void;
    title?: string; */
}

// 부모 key 알 수 있도록 확장
export interface C2vDataNode extends DataNode {
    parent?: string | number;
    children?: C2vDataNode[];
    text?: string;
    spaceId?: string | null;
    value: string | number;
    totalCount: number;
    depth?: number;
}

export interface iSelectType {
    label: string;
    value: any;
}
