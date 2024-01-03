/* eslint-disable @typescript-eslint/no-unused-vars */
import { lazy } from "react";
import { LazyComponent } from "@components/common";
import C2vWrapper from "./wrappers/C2vWrapper";

const ExamplePage = lazy(() => import("@pages/Example"));

export const menu = [];

export const routes = [
    {
        path: "/",
        label: "C2vWrapper",
        id: "C2vWrapper",
        element: <C2vWrapper />,
        isProtected: false,
        children: [
            {
                path: "/",
                label: "예제",
                icon: <span className="icon-credit" />,
                id: "example",
                hasChild: false,
                element: <LazyComponent component={<ExamplePage />} />,
            },
        ],
    },
];
