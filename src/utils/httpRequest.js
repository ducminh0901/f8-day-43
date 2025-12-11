import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://api01.f8team.dev/api",
    withCredentials: false,
});

let isRefreshing = false;
let queueJobs = [];

async function sendRefreshToken(refreshToken) {
    const response = await axios.post(
        "https://api01.f8team.dev/api/auth/refresh-token",
        { refresh_token: refreshToken }
    );

    const { access_token, refresh_token } = response.data.data;

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return access_token;
}

httpRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

httpRequest.interceptors.response.use(
    (res) => res.data,

    async (err) => {
        const refreshToken = localStorage.getItem("refreshToken");
        const originalRequest = err.config;

        if (err.response?.status === 401 && refreshToken) {
            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const newAccessToken = await sendRefreshToken(refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    queueJobs.forEach((job) => job.resolve(newAccessToken));
                    queueJobs = [];

                    return httpRequest(originalRequest);
                } catch (error) {
                    queueJobs.forEach((job) => job.reject(error));
                    queueJobs = [];

                    localStorage.clear();
                    window.location.href = "/login";
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve, reject) => {
                queueJobs.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return httpRequest(originalRequest);
            });
        }

        return Promise.reject(err);
    }
);

export default httpRequest;
