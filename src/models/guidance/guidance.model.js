import * as cusHttp from '../../fetch/cusHttp';

export default {
    namespace: 'guidance',

    state: {
        list: [],
        amount: 0,
        oldList: [],
        demoList: []
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
        },

        * getTList(action, { call, put }) {
            const res = yield call(cusHttp.post, '/guidance/getTList', action.data);

            if(res && res.list.length > 0) {
                yield put({
                    type: 'getDemoList',
                    data: res.list,
                });
            }
        },

        * updateSort(action, { call, put }) {
            const res = yield call(cusHttp.post, '/guidance/updateSort', action.data);

            if(res && res.list.length > 0) {
                yield put({
                    type: 'updateDemoList',
                    data: res.list,
                });
            }
        },
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
        },

        getDemoList(state, action) {
            return {
                ...state,
                demoList: action.data
            }
        },

        updateDemoList(state, action) {
            return {
                ...state,
                oldList: state.demoList,
                demoList: action.data
            };
        }
    }
}