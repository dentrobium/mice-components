/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    createContext,
    useState,
    useMemo,
    useCallback,
    useContext,
} from "react";
import { useQuery } from "react-query";

interface SearchParams {
    [key: string]: any;
}

interface ListContextType {
    params: SearchParams;
    updateParams: (fieldName: string, value: any) => void;
    setParams: (value: any) => void;
    queryResult?: any;
    selectedRows: any[];
    setSelectedRows: (array: any[]) => void;
    selectedRecord: any;
    setSelectedRecord: (record: any) => void;
    selectedRowKeys: any[];
    setSelectedRowKeys: (keys: React.Key[]) => void;
}

const ListContext = createContext<ListContextType>({
    params: {},
    updateParams: () => {},
    setParams: () => {},
    queryResult: {},
    selectedRows: [],
    setSelectedRows: () => {},
    selectedRecord: {},
    setSelectedRecord: () => {},
    selectedRowKeys: [],
    setSelectedRowKeys: () => {},
});

export const ListProvider = ({
    initialState,
    children,
    fetch,
    queryKey,
}: {
    initialState: any;
    children: any;
    fetch?: any;
    queryKey?: any;
}) => {
    const [params, setParams] = useState<{ [key: string]: any }>(initialState);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const queryResult = useQuery(
        [queryKey, { ...params }],
        () => fetch(params),
        {
            keepPreviousData: true,
        },
    );

    const updateParams = useCallback((fieldName: string, value: any) => {
        setParams((prev: any) => ({ ...prev, [fieldName]: value }));
    }, []);

    const searchContextValue = useMemo(
        () => ({
            params,
            updateParams,
            setParams,
            selectedRows,
            setSelectedRows,
            queryResult,
            selectedRecord,
            setSelectedRecord,
            selectedRowKeys,
            setSelectedRowKeys,
        }),
        [
            params,
            updateParams,
            selectedRows,
            queryResult,
            selectedRecord,
            selectedRowKeys,
        ],
    );

    // useEffect(() => {
    //     console.log("PARAMS", params);
    // }, [params]);

    // useEffect(() => {
    //     console.log("SELECTED_ROWs", selectedRows);
    // }, [selectedRows]);

    return (
        <ListContext.Provider value={searchContextValue}>
            {children}
        </ListContext.Provider>
    );
};

export const useListContext = (): ListContextType => useContext(ListContext);
