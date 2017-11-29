import axios from 'axios';
import qs from 'qs';
import config from '../config'

export default axios.create({
  // 通用请求前缀
  baseURL: config.baseURL,

  // 返回数据解析格式
  responseType: 'json',

  // 跨域请求时会带 Cookie
  // withCredentials: true,

  // 发送请求之前对请求数据做处理, 把 array 转为 string
  transformRequest: [data => {
    if (!data) data = {};
    return qs.stringify(data);
  }],

  // 提前处理返回的数据
  // transformResponse: [res => {
  //   return res;
  // }],

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return true
  },
});
