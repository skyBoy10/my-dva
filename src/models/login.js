import * as loginService from  '../services/login.service';
import { routerRedux } from 'dva/router';
import md5 from 'md5';

export default {
    namespace: 'login',

    state: {
        isLoading: false,
        username: '',
        password: '',
    },

    effects: {
        *login(action, { call, put, select, take }) {
            const param = {
                account: action.data.username,
                password: md5(action.data.password, 32)
            }
            const res = yield call(loginService.login, param);
            
            if(res) {
                yield put({
                    type: 'updateCurrentUser',
                    data: {
                        ...res.user
                    }
                });

                localStorage.setItem('_auth_token_', res.token);
                yield take('base/updateMenus');
                const menus = yield select(state => state.base.menus);
                yield put(routerRedux.push(menus[0].url));
                yield put({type: 'base/updateCurrentMenu', data: menus[0]})
            }
        }
    },

    reducers: {
        updateCurrentUser: (state, action) => {
            sessionStorage.setItem('currentUser', JSON.stringify(action.data));
            return {
                ...state,
                ...action.data
            };
        }
    },

    subscriptions: {}
};