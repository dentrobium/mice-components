import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";
import PageRoutes from "@wrappers/PageRoute";
import QueryProvider from "@wrappers/QueryProvider";
import "@i18n";

const App = () => (
    <RecoilRoot>
        <QueryProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#475fff",
                        colorLink: "#475fff",
                        colorTextPlaceholder: "#9d9da7",
                        colorBorderSecondary: "#e3e3e8",
                    },
                }}
            >
                <PageRoutes />
            </ConfigProvider>
        </QueryProvider>
    </RecoilRoot>
);

export default App;
