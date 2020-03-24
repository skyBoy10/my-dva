import { post } from '../../fetch/cusHttp';


const initState = () => {
    return {
        checkedIds: [],
        list: [],
        total: 0,
        pageNo: 1,
        pageSize: 15,
        roomTypeDetail: null, 
    };
}

export default {
    namespace: 'roomTypeModel',

    state: initState(),

    reducers: {
        updateList(state, action) {
            return {
                ...state,
                list: action.data.list,
                total: action.data.total,
                pageNo: action.data.pageNo,
                checkedIds: [],
            };
        },

        updateChecked(state, action) {
            return {
                ...state,
                checkedIds: action.data,
            }
        },

        updateRoomTypeDetail(state, action) {
            return {
                ...state,
                roomTypeDetail: action.data,
            };
        },

        clearRoomDetail(state, action) {
            return {
                ...state,
                roomTypeDetail: null,
            };
        }
    },

    effects: {
        * getList(action, { call, put }) {
            const res = yield call(post, '/business/getRoomTypeList', action.data);

            if(res) {
                yield put({
                    type: 'updateList',
                    data: {
                        list: res.list,
                        total: res.total,
                        pageNo: action.data.pageIndex
                    }
                });
            }
        },

        * getRoomList(action, { call, put }) {
            const res = yield call(post, '/business/getRoomsByType', action.data);

            if(res) {
                yield put({
                    type: 'updateRoomTypeDetail',
                    data:  res,
                });
            }
        },

        * updateRoomType(action, { call, put }) {
            yield call(post, '/business/roomType/create', action.data);
        },

        * uploadFile(action, { call, put }) {
            yield call(post, '/common/upload', action.data);
        }
    },
}