import * as cusHttp from '../../fetch/cusHttp';

export default {
    namespace: 'tree',

    state: {
        data: [],
        currentStore: null
    },

    reducers: {
        updateTreeData(state, action) {
            let data = state.data.slice();
            
            if(action.data.id) {
                for(let i = 0; i < data.length; i++) {
                    if(data[i].id == action.data.id) {
                        data[i].children = action.data.list;
                        break;
                    }
                }
            }
            else
            {
                data = action.data.list;
            }

            return {
                ...state,
                data: data || []
            }
        },
        updateCurrentNode(state, action) {
            return {
                ...state,
                currentStore: action.data
            }
        }
    },

    effects: {
        * getTreeNodes(action, { call, put, select }) {
            const res = yield call(cusHttp.post, '/user/getTreeNodes', action.data);
            yield put({
                type: 'updateTreeData',
                data: {
                    id: action.data.id,
                    list: res
                }
            })
        }
    },

    subscriptions: {
        
    }
}