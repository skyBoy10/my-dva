import * as cusHttp from '../fetch/cusHttp';

/** 
 * 获取菜单数据
*/
export const getMenus = param => {
    return cusHttp.post('/menus/getMenus', param)
};