import * as loginService from  '../services/login.service';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'login',

    state: {
        isLoading: false,
        username: '',
        password: '',
    },

    effects: {
        *login(action, { call, put, select, take }) {
            const res = yield call(loginService.login, action.data);
            
            if(res) {
                yield put({
                    type: 'updateCurrentUser',
                    data: {
                        ...res
                    }
                });

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