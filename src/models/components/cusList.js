import * as cusHttp from '../../fetch/cusHttp';

export default {
    namespace: 'userList',

    state: {
        list: [],
        isFetching: false,
        total: 0
    },

    reducers: {
        updateUserList(state, action) {
            return {
                ...state,
                list: action.data.list,
                total: action.data.total
            };
        },
    },

    effects: {
        * getUserList(action, { call, put, select }) {
            const res = yield call(cusHttp.post, '/user/getUserList');
            yield put({
                type: 'updateUserList',
                data: res
            });
        }
    },

    subscriptions: {

    }
}