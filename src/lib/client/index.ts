import ApiClient from "./apiClient";
import AuthClient from "./authClient";
// import PaymentClient from "./paymentClient";
// import AuthClient from "./AuthClient";

// API 클라이언트들을 관리
// 로그인, 오피스, 결제 API 3개를 관리 해야 할것 같음

const apiUrl = process.env.REACT_APP_API_ROOT;
const authUrl = process.env.REACT_APP_AUTH_API_ROOT;
const paymentUrl = process.env.REACT_APP_PAYMENT_API_ROOT;

export const officeApi = new AuthClient(apiUrl);
export const authApi = new AuthClient(authUrl);
export const paymentApi = new AuthClient(paymentUrl);
export const loginApi = new ApiClient(".");
