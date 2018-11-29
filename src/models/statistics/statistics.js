import * as cusHttp from '../../fetch/cusHttp';
import { message } from 'antd';
import moment from 'moment';

const getInitData = () => {
    return {
        activeIndex: 1,
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
        }
    };
};

export default {
    namespace: 'statistics',

    state: getInitData(),

    reducers: {
        updateIndex(state, action) {
            let startDate = '';
            let endDate = '';

            switch(action.data) {
                case 1: //最近七天
                case '1':
                    startDate = moment().subtract(7, 'days').format('YYYY/MM/DD');
                    endDate = moment().format('YYYY/MM/DD');
                    break;
                case 2: //最近一个月
                case '2':
                    startDate = moment().subtract(1, 'months').format('YYYY/MM/DD');
                    endDate = moment().format('YYYY/MM/DD');
                    break;
                case 3: //最近三个月
                case '3':
                    startDate = moment().subtract(3, 'months').format('YYYY/MM/DD');
                    endDate = moment().format('YYYY/MM/DD');
                    break;
                default:
                    break;
            }
            return {
                ...state,
                activeIndex: action.data,
                startDate: startDate,
                endDate: endDate,
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
                    assembleData: action.assembleData,
                    bargainData: action.bargainData,
                    discountData: action.discountData,
                }
            }
        }
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
        }
    },

    subscriptions: {}
}