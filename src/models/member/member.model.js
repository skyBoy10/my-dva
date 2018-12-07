import * as cusHttp from '../../fetch/cusHttp';
import moment from 'moment';

/** 
 * 初始化store
*/
const getInitState = () => {
    return {
        tabMenus: [],
        currentPage: '1',
        isShowMore: false,
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
        }
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

        gotoPage(state, action) {
            return {
                ...state,
                currentPage: action.data,
            };
        },

        toggleCon(state, action) {
            return {
                ...state,
                isShowMore: action.data,
            }
        }
    },

    effects: {
        * getTabMenus(action, { put, call }) {
            const result = yield call(cusHttp.post, '/member/getTabMenus', action.data);

            if(result) {
                yield put({
                    type: 'updateTabMenus',
                    data: result,
                });
                
            };
        }
    },

    subscriptions: {
        
    },
}