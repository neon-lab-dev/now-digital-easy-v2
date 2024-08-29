import a from "axios";
import Cookies from "js-cookie";
const axios = a.create();

axios.interceptors.request.use((req) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default axios;
