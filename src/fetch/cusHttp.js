import axios from 'axios';
import { message } from 'antd';
import apiPrefix from '../config/path';

axios.defaults.baseURL = apiPrefix[process.env.ENV];
axios.defaults.headers.post['Content-Type'] = 'application/json;charset:utf-8;';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.timeout = 5000; // 请求超时

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: localStorage.getItem('_auth_token_')
        }
    };
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code == '10002') {
        message.error('token已失效，请重新登录！');
        setTimeout(() => {
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentMenu');
            window.location.href='/login';
        }, 1000);
        return;
    }

    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.log(error)
    return Promise.reject(error);
});

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

const defautlShopId = 'S2019053118571021';

export const post = (api, param) => {
    return new Promise((resolve, reject) => {
        axios.post(api, { shopId: defautlShopId, ...param }).then(checkStatus).then(res => {
            if (res.data.code === '200' || res.data.code === 200) {
                resolve(res.data.data);
            }
            else {
                reject(res.data)
            }
        }, err => {
            reject(err);
            const error = new Error(err);
            throw error
        }).catch(err => { console.log(err);message.error(err.message) })
    })
} 

export const get = (api, param) => {
    return new Promise((resolve, reject) => {
        axios.get(api, {
            params: {
                ...param
            }
        })
        .then(checkStatus)
        .then(res => {
            if (+res.data.code === 200) {
                resolve(res.data.data);
            }
            else {
                reject(res.data)
            }
        }, err => {
            reject(err);
            const error = new Error(err);
            throw error
        }).catch(err => { console.log(err);message.error(err.message) })
    });
}