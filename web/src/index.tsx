import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { getAcessToken, getRefreshToken, setAccessToken } from "./utills/utils";
import { backendUrl } from "./utills/constanst";
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Add a request interceptor
axios.interceptors.request.use(
  async function (config) {
    const accessToken = getAcessToken();
    if (accessToken === "") return config;
    const decoded: any = jwtDecode(accessToken);
    if (decoded.exp * 1000 <= Date.now()) {
      const res = await fetch(`${backendUrl}/auth/tokenChange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: getRefreshToken(),
        }),
      });
      const data = await res.json();
      setAccessToken(data.accessToken);
    }
    config.headers!.Authorization = `Bearer ${getAcessToken()}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
