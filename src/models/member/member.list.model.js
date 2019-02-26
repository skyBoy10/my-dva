import * as cusHttp from '../../fetch/cusHttp';
import moment from 'moment';

/** 
 * 初始化store
*/
const getInitState = () => {
    return {
        isShowMore: false,
        pageIndex: 1,
        pageSize: 10,
        searchParam: {
            keyType: '1',
            keyword: '',
            levelId: '',
            labelId: '',
            startCardDate: moment().format('YYYY/MM/DD'),
            endCardDate: moment().subtract(7, 'days').format('YYYY/MM/DD'),
            gender: '',
            ageType: '',
            recordDateType: '',
        },
        list: [],
        total: 0,
        levels: [],
        labels: [],
    };
};

export default {
    namespace: 'memList',

    state: getInitState(),

    reducers: {
        toggleCon(state, action) {
            return {
                ...state,
                isShowMore: action.data,
            }
        },

        updateList(state, action) {
            return {
                ...state,
                list:  action.data.list,
                total: action.data.total,
                pageIndex: action.data.pageIndex,
            }
        },

        updateLevelAndLabel(state, action) {
            return {
                ...state,
                levels: action.data[0],
                labels: action.data[1].list,
                labelSearch: {
                    pageIndex: 1,
                    pageSize: 10,
                    keyword: '',
                    type: '',
                    total: action.data[1].total,
                },
            };
        },

        switchMemState(state, action) {
            const list = state.list.slice();
            if(list && list.length > 0) {
                for(let i = 0; i < list.length; i++) {
                    if(list[i].id == action.data.id) {
                        list[i].state = action.data.state;
                        break;
                    }
                }
            }

            return {
                ...state,
                list: list,
            };
        },

        resetStore(state, action) {
            return {
                ...getInitState()
            }
        }
    },

    effects: {
        * getMemList(action, { put, call }) {
            const result = yield call(cusHttp.post, '/member/getMemList', action.data);

            if(result) {
                yield put({
                    type: 'updateList',
                    data: {
                        list: result.list,
                        total: result.total,
                        pageIndex: action.data.pageIndex,
                        pageSize: action.data.pageSize,
                    }
                });
            }
        },

        * getLevelAndLabel(action, { put, call }) {
            const result = yield [
                call(cusHttp.post, '/member/getMemLevels', action.data),
                call(cusHttp.post, '/member/getLabels', action.data),
            ];

            if(result) {
                yield put({
                    type: 'updateLevelAndLabel',
                    data: result,
                });
            }
        },
    },

    subscriptions: {
        
    },
}