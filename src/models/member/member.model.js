import * as cusHttp from '../../fetch/cusHttp';
import moment from 'moment';

/** 
 * 初始化store
*/
const getInitState = () => {
    return {
        tabMenus: [],
        currentPage: '1',
        memDetail: {
            detail: {},
            record: {}
        },
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

        updateDetail(state, action) {
            return {
                ...state,
                memDetail: {
                    detail: {
                        ...action.data.detail,
                    },
                    record: {
                        ...action.data.record
                    }
                }
            };
        },

        resetStore(state, action) {
            const initStore = getInitState();
            return {
                ...initStore
            }
        },

        resetDetail(state, action) {
            return {
                ...state,
                memDetail: {
                    detail: {},
                    record: {},
                }
            };
        }
    },

    effects: {
        * getTabMenus(action, { put, call }) {
            const result = yield call(cusHttp.post, '/member/getTabMenus', action.data);

            if(result) {
                //yield put(routerRedux.push(result[0].children[0].url))
                yield put({
                    type: 'updateTabMenus',
                    data: result,
                });
            };
        },

        * getMemberDetail(action, { put, call }) {
            const result = yield call(cusHttp.post, '/member/getMemberDetail', action.data);

            if(result) {
                yield put({
                    type: 'updateDetail',
                    data: result,
                });
            }
        }
    },

    subscriptions: {
        
    },
}