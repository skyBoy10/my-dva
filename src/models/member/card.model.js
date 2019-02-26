import * as cusHttp from '../../fetch/cusHttp';
import moment from 'moment';

/** 
 * 初始化store
*/
const getInitState = () => {
    return {
        storeName: '',
        logo: '',
        title: '',
        themeColor: '#2db7f5',
        backUrl: '',
        cardNo: '',
        expireDate: '',
        privilege: '',
        notice: '',
        activeType: '1',
        info: [],
        tipStr: '', 
    };
};

export default {
    namespace: 'memCard',

    state: getInitState(),

    reducers: {
        updateDetail(state, action) {
            return {
                ...state,
                ...action.data,
            };
        },

        updateState(state, action) {
            return {
                ...state,
                ...action.data,
            }
        },

        resetStore(state, action) {
            const initStore = getInitState();
            return {
                ...initStore
            }
        },
    },

    effects: {
        * getCardDetail(action, { call, put }) {
            const result = yield call(cusHttp.post, '/member/getCardDetail', action.data);

            if(result) {
                yield put({
                    type: 'updateDetail',
                    data: result
                })
            }
        },
    },

    subscriptions: {
        
    },
}