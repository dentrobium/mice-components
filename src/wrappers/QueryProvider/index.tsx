import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryProvider = ({ children }: { children: React.ReactElement }) => {
    // const { handleError } = useApiError();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                cacheTime: Infinity,

                retry: 0,
                // onError: handleError,
            },
            mutations: {},
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
