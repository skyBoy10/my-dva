import * as cusHttp from '../../fetch/cusHttp';

export default {
    namespace: 'guidance',

    state: {
        list: [],
        amount: 0,
    },

    subscriptions: {},

    effects: {
        * getList(action, { call, put }) {
            const res = yield call(cusHttp.post, '/guidance/getList', action.data);

            if(res && res.list.length > 0) {
                yield put({
                    type: 'updateList',
                    data: res.list,
                });
            }
        },

        * getAmount(action, { call, put }) {
            const res = yield call(cusHttp.post, '/guidance/getAmount', action.data);

            if(res) {
                yield put({
                    type: 'updateAmount',
                    data: res.amount,
                })
            }
        }
    },

    reducers: {
        updateList(state, action) {
            return {
                ...state,
                list: action.data,
            }
        },

        updateAmount(state, action) {
            return {
                ...state,
                amount: action.data,
            }
        }
    }
}