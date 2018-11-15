import { message } from 'antd';
import { routerRedux } from 'dva/router';

/** 
 * 获取service
*/
import { getMenus } from './services/base.service';

export default {
    namespace: 'base',

    state: {
        menus: [],
        collapsed: false,
        currentUser: null
    },

    effects: {
        * listenAction(action, { call, put, take }) {
            yield take('login/updateCurrentUser'); //监听action
            const param = JSON.parse(sessionStorage.getItem('currentUser'));
            const res = yield call(getMenus, param);
            if(res) {
                yield put({ type: 'updateMenus', data: res });
            }
            else {
                message.error('菜单获取数据失败！');
            }
        },
        * getMenus(action, { call, put, select, take }) {
            const { menus } = yield select(state => state.base.menus);
            if(menus && menus.length > 0) return;
            const param = JSON.parse(sessionStorage.getItem('currentUser'));
            const res = yield call(getMenus, param);
            if(res) {
                yield put({ type: 'updateMenus', data: res });
            }
            else {
                message.error('菜单获取数据失败！');
            }
        },
        * logout(action, { call, put }) {
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentMenu');
            yield put(routerRedux.push('/login'));
        }
    },

    reducers: {
        updateCurrentMenu(state, action) {
            sessionStorage.setItem('currentMenu', JSON.stringify(action.data));
            return {
                ...state,
                selectedMenu: action.data.nickName
            };
        },
        updateMenus(state, action) {
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            return {
                ...state,
                menus: action.data,
                selectedMenu: action.data[0].nickName,
                currentUser: currentUser
            }
        },
        updateCollapsed(state, action) {
            return {
                ...state
            }
        },
        updateState(state, action) {
            return {
                ...state,
                currentUser: action.data.user,
                selectedMenu: action.data.menu ? action.data.menu.nickName : ''
            }
        }
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                const user = sessionStorage.getItem('currentUser');
                const menu = sessionStorage.getItem('currentMenu');
                if(!location.pathname.includes('login') && !user) {
                    dispatch({
                        type: 'logout'
                    })
                }
                else
                {
                    dispatch(
                        {
                            type: 'updateState',
                            data: {
                                user: JSON.parse(user),
                                menu: JSON.parse(menu)
                            }
                        }
                    );
                }
            });
        }
    }
}