import axios from "axios";
import { message } from "antd";
import { get } from "lodash";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const instance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});
// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.responseType = "json";
    const method = config.method.toLowerCase();
    if (["post", "put"].every((m) => method !== m)) {
      config.params = config.data;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    let { data } = response;
    if ("" + data.code !== "200") {
      console.log("响应拦截 message.error");
      message.error(get(data, "resultMsg", "接口服务故障"));
    }
    // 对响应数据做点什么
    return data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
