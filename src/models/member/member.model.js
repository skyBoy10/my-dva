import * as cusHttp from '../../fetch/cusHttp';
import { routerRedux } from 'dva/router';

/** 
 * 初始化store
*/
const getInitState = () => {
    return {
        tabMenus: [],
    };
};

export default {
    namespace: 'member',

    state: getInitState(),

    reducers: {
        updateTabMenus(state, action) {
            return {
                ...state,
                tabMenus: action.data,
            };
        },
    },

    effects: {
        * getTabMenus(action, { put, call }) {
            const result = yield call(cusHttp.post, '/member/getTabMenus', action.data);

            if(result) {
                yield put({
                    type: 'updateTabMenus',
                    data: result,
                });
                
            };
        }
    },

    subscriptions: {
        setup({ dispatch, history }) { 
            history.listen(location => {
                if (location.pathname === '/member') {
                    dispatch(routerRedux.push('/member/list'))
                }
            });
        }
    },
}