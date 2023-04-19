import axios from 'axios';
import qs from 'qs';
import LRUCache from 'lru-cache';
import { Platform } from 'react-native';

import cacheAdapterEnhancer from '@utils/axios-extensions';

const baseURL = process.env.AXIOS_BASE_URL;

export const ax = axios.create({ baseURL });

ax.interceptors.request.use(function (config) {
  let params = config.params;
  const _baseURL = config.baseURL || '';
  const configData = config.data;
  const token = config.headers?.token || config.headers?.ez1;
  if (configData && typeof configData === 'string') {
    params = JSON.parse(configData);
  } else if (configData) {
    params = configData;
  }
  let requestPath = 'request: ' + config.method + '__';
  if (config.url?.includes('http')) {
    requestPath += config.url;
  } else {
    requestPath += _baseURL + config.url;
  }
  if (typeof params === 'object' && params !== null) {
    requestPath += ' params: ' + JSON.stringify(params);
  }
  if (token) {
    requestPath += '__token:' + token;
  }
  console.log('\x1b[33m%s\x1b[0m', requestPath);
  return config;
});

// https://www.hai-fe.com/docs/nuxt/apiCache.html
// https://www.npmjs.com/package/lru-cache
// api資料快取儲存物件
const cacheCfg: any = new LRUCache({
  ttl: 1000 * 60 * 10,
  max: 100
});

const defaultAdapter: any = ax.defaults.adapter;
ax.defaults.adapter = cacheAdapterEnhancer(defaultAdapter, {
  enabledByDefault: false,
  cacheFlag: 'useCache',
  defaultCache: cacheCfg
});

/**
 * 將axios從新封裝
 *
 * @param {string} _method        HTTP方法(GET,POST,PUT,PATCH,DELETE)
 * @param {string} url            API網址
 * @param {object} _params        傳送參數，所有HTTP方法需特殊處理之部分皆內涵，因此以JSON物件傳入即可
 * @param {object} _extendOption  傳送設定，如headers等
 * @param {boolean} useFormData   可透過此參數直接調整是否需要將傳送參數以FormData方式傳送，預設為false
 * @returns {any}
 */
function request(
  _method: string = 'GET',
  url: string,
  _params: any = {},
  _extendOption: any = {},
  useFormData: boolean
) {
  const method = _method.toUpperCase();
  let params: { data?: any; params?: any } = {};

  switch (method) {
    case (method.match(/POST|PUT|PATCH/) || {}).input:
      if (useFormData === true) {
        const formData = new FormData();
        Object.keys(_params).forEach(paramsKey => {
          formData.append(paramsKey, _params[paramsKey]);
        });
        if (Platform.OS === 'android') {
          const { headers = {} } = _extendOption;
          if (
            typeof headers['Content-Type'] !== 'string' ||
            typeof headers['Content-type'] !== 'string'
          ) {
            _extendOption.headers = {
              ...headers,
              'Content-Type': 'multipart/form-data'
            };
          }
        }
        params.data = formData;
      } else {
        params.data = _params;
      }
      break;
    case (method.match(/GET/) || {}).input:
      params.params = _params;
      break;
    default:
      params = {};
      break;
  }
  return ax
    .request({
      url,
      method,
      paramsSerializer: {
        encode: (_params_: any) => {
          return qs.stringify(_params_, { encodeValuesOnly: true });
        },
        indexes: false // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
      },
      ...params,
      ..._extendOption
    })
    .then(response => response?.data)
    .catch(error => {
      console.log('\x1b[31m%s\x1b[0m', error);
      throw error;
    });
}

request.ax = ax;
request.axios = axios;
request.baseURL = baseURL;
/**
 * 將axios從新封裝後的get請求
 *
 * @param {string} url            API網址
 * @param {object} _params        傳送參數，所有HTTP方法需特殊處理之部分皆內涵，因此以JSON物件傳入即可
 * @param {object} _extendOption  傳送設定，如headers等
 * @param {boolean} useFormData   可透過此參數直接調整是否需要將傳送參數以FormData方式傳送，預設為false
 * @returns {any}
 */
request.get = function (
  url: string,
  _params: any = {},
  _extendOption: any = {},
  useFormData = false
) {
  return request('GET', url, _params, _extendOption, useFormData);
};
/**
 * 將axios從新封裝後的post請求
 *
 * @param {string} url            API網址
 * @param {object} _params        傳送參數，所有HTTP方法需特殊處理之部分皆內涵，因此以JSON物件傳入即可
 * @param {object} _extendOption  傳送設定，如headers等
 * @param {boolean} useFormData   可透過此參數直接調整是否需要將傳送參數以FormData方式傳送，預設為false
 * @returns {any}
 */
request.post = function (
  url: string,
  _params: any = {},
  _extendOption: any = {},
  useFormData = false
) {
  return request('POST', url, _params, _extendOption, useFormData);
};
/**
 * 將axios從新封裝後的put請求
 *
 * @param {string} url            API網址
 * @param {object} _params        傳送參數，所有HTTP方法需特殊處理之部分皆內涵，因此以JSON物件傳入即可
 * @param {object} _extendOption  傳送設定，如headers等
 * @param {boolean} useFormData   可透過此參數直接調整是否需要將傳送參數以FormData方式傳送，預設為false
 * @returns {any}
 */
request.put = function (
  url: string,
  _params: any = {},
  _extendOption: any = {},
  useFormData = false
) {
  return request('PUT', url, _params, _extendOption, useFormData);
};
/**
 * 將axios從新封裝後的delete請求
 *
 * @param {string} url            API網址
 * @param {object} _params        傳送參數，所有HTTP方法需特殊處理之部分皆內涵，因此以JSON物件傳入即可
 * @param {object} _extendOption  傳送設定，如headers等
 * @param {boolean} useFormData   可透過此參數直接調整是否需要將傳送參數以FormData方式傳送，預設為false
 * @returns {any}
 */
request.delete = function (
  url: string,
  _params: any = {},
  _extendOption: any = {},
  useFormData = false
) {
  return request('DELETE', url, _params, _extendOption, useFormData);
};
/**
 * 將axios從新封裝後的patch請求
 *
 * @param {string} url            API網址
 * @param {object} _params        傳送參數，所有HTTP方法需特殊處理之部分皆內涵，因此以JSON物件傳入即可
 * @param {object} _extendOption  傳送設定，如headers等
 * @param {boolean} useFormData   可透過此參數直接調整是否需要將傳送參數以FormData方式傳送，預設為false
 * @returns {any}
 */
request.patch = function (
  url: string,
  _params: any = {},
  _extendOption: any = {},
  useFormData = false
) {
  return request('PATCH', url, _params, _extendOption, useFormData);
};

export default request;
