import * as cusHttp from '../../fetch/cusHttp';
import moment from 'moment';

/** 
 * 初始化store数据
*/
const getInitData = () => {
    return {
        activeIndex: 1,
        pageIndex: 1,
        pageSize: 10,
        startDate: moment().subtract(7, 'days').format('YYYY/MM/DD'),
        endDate: moment().format('YYYY/MM/DD'),
        overview: {
            revenueFee: 0,
            receivableFee: 0,
            acceptedFee: 0,
            totalFee: 0,
        },
        report: {
            assembleData: [],
            bargainData: [],
            discountData: [],
            onlineData: [],
            offlineData: [],
            pieData: [],
            circleData: null,
        },
        detail: {
            list: [],
            total: 0,
        },
    };
};

export default {
    namespace: 'statistics',

    state: getInitData(),

    reducers: {
        updateIndex(state, action) {
            return {
                ...state,
                ...action.data,
            };
        },

        updateOverview(state, action) {
            return {
                ...state,
                overview: {
                    ...action.data
                }
            }
        },

        updateReportData(state, action) {
            return {
                ...state,
                report: {
                    ...action.data.lineData,
                    pieData: action.data.pieData,
                    circleData: action.data.circleData,
                }
            }
        },

        updateListData(state, action) {
            return {
                ...state,
                detail: {
                    ...action.data.source,
                },
                ...action.data.pageInfo,
            }
        },

        resetStore(state, action) {
            return {
                ...getInitData()
            }
        },
    },

    effects: {
        * getTotalData(action, { put, call }) {
            const result = yield call(cusHttp.post, '/statistics/getTotal', action.data);
            
            if(result) {
                yield put({
                    type: 'updateOverview',
                    data: result,
                });
            }
        },

        * getReportData(action, { put, call }) {
            const result = yield call(cusHttp.post, '/statistics/getReport', action.data);

            if(result) {
                yield put({
                    type: 'updateReportData',
                    data: result,
                });
            }
        },

        * getDetailData(action, { put, call }) {
            const result = yield call(cusHttp.post, '/statistics/getDetail', action.data);

            if(result) {
                yield put({
                    type: 'updateListData',
                    data: {
                        pageInfo: {
                            pageIndex: action.data.pageIndex,
                            pageSize: action.data.pageSize,
                        },
                        source: result
                    },
                });
            }
        },
    },

    subscriptions: {}
}