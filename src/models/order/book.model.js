import * as cusHttp from '../../fetch/cusHttp';

const initState = () => {
    return {
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
        keywords: '',
    };
}

export default {
    namespace: 'bookModel',

    state: initState(),

    reducers: {
        updateList(state, action) {
            return {
                ...state,
                list: action.data.list,
                total: action.data.total,
            };
        },

        updateParam(state, action) {
            return {
                ...state,
                pageNo: action.data.pageIndex,
            };
        }
    },

    effects: {
        * getList(action, { call, put }) {
            const res = yield call(cusHttp.post, '/order/getBookList', action.data);

            if(res) {
                yield put({
                    type: 'updateList',
                    data: res,
                });

                yield put({
                    type: 'updateParam',
                    data: {
                        pageIndex: action.data.pageIndex,
                    }
                });
            }
        }
    },

    subscriptions: {}
}