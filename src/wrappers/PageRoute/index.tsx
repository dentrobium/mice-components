/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "@/routes";

// import { useGaRouteChange } from "@hooks/common";

const PageRoutes = () => {
    // useGaRouteChange();
    const router = createBrowserRouter(
        routes.map((router) => ({
            id: router.id,
            path: router.path,
            element: router.element,
            children: router.children,
        })),
    );
    // const { router } = useDynamicRoutes();

    return (
        <RouterProvider
            router={router}
            fallbackElement={<div>Loading....</div>}
        />
    );
};

export default PageRoutes;
