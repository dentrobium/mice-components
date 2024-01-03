import { loadingState } from "@/store/loading";
import { useRecoilState } from "recoil";

const useLoading = () => {
    const [loading, setLoading] = useRecoilState(loadingState);

    return {
        loading,
        setLoading,
    };
};

export default useLoading;
