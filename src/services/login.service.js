import * as cusHttp from '../fetch/cusHttp';

/** 
 * 登录
*/
export const login = (param) => {
    return cusHttp.post('/login', param);
}