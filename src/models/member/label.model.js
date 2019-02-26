import * as cusHttp from '../../fetch/cusHttp';
import moment from 'moment';
import { message } from 'antd';

/** 
 * 初始化store
*/
const getInitState = () => {
    return {
        labelModalShow: false,
        pageSize: 10,
        pageIndex: 1,
        keyword: '',
        type: '',
        total: 0,
        currentMember: null,
        list: [],
        selectedList: [],
    };
};

export default {
    namespace: 'label',

    state: getInitState(),

    reducers: {
        updateLabels(state, action) {
            return {
                ...state,
                ...action.data
            };
        },

        toggleModal(state, action) {
            switch(action.data.type) {
                case 1:
                    return {
                        ...state,
                        ...getInitState(),
                        currentMember: action.data.member ? action.data.member : null,
                        labelModalShow: action.data.isShow,
                        selectedList: action.data.member ? action.data.member.labels : [],
                    };
                default:
                    return {
                        ...state,
                    }
            }
        },

        switchChecked(state, action) {
            const list = state.list.slice();
            if(list && list.length > 0) {
                for(let i = 0; i < list.length; i++) {
                    if(list[i].id == action.data.id) {
                        list[i].isChecked = !list[i].isChecked;
                        break;
                    }
                }
            }

            return {
                ...state,
                list,
            };
        },
    },

    effects: {
        * searchLabels(action, { put, call, select }) {
            const result = yield call(cusHttp.post, '/member/getLabels', action.data);
            const label = yield select(store => store.label);
            const { selectedList } = label;

            if(result) {
                if(selectedList && selectedList.length > 0 && result.list.length > 0) {
                    for(let i = 0; i < result.list.length; i++) {
                        for(let j = 0; j < selectedList.length; j++) {
                            if(result.list[i].id == selectedList[j].labelId) {
                                result.list[i].isChecked = true;
                                break;
                            }
                        }
                    }
                }

                yield put({
                    type: 'updateLabels',
                    data: {
                        ...result,
                        pageIndex: action.data.pageIndex,
                        pageSize: action.data.pageSize,
                        type: action.data.type,
                        keyword: action.data.keyword,
                    },
                });
            }
        },

        * tickLabels(action, { put, call, select, take }) {
            const { label, memList } = yield select(store => {
                return {
                    label: store.label,
                    memList: store.memList,
                };
            });
            const result = yield call(cusHttp.post, '/member/tickLabel', {
                selected: action.data.selected,
                id: label.currentMember.id,
            });

            if(result) {
                message.success('保存成功！');
                yield put({
                    type: 'toggleModal',
                    data: {
                        type: 1,
                        isShow: false,
                    },
                });
            }
        }
    },

    subscriptions: {
        
    },
}