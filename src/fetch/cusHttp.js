import axios from 'axios';
import { message } from 'antd';

/** 
 * 自定义请求
*/
export const post = (api, param) => {
    return new Promise((resolve, reject) => {
        axios.post(api, param).then(res => {
            setTimeout(() => {
                if (res.data.code === '0' || res.data.code === 0) {
                    resolve(res.data.data);
                }
                else {
                    reject(res.data)
                }
            }, 2000);
        }, err => {
            reject(err);
            const error = new Error(err);
            throw error
        }).catch(err => { console.log(err);message.error(err.message) })
    })
} 