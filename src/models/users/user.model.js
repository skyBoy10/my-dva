
import * as cusHttp from '../../fetch/cusHttp';
import { message } from 'antd';

const getInitData = () => {
    return {
        keyword: '',
        pageIndex: 1,
        pageSize: 10,
        list: [],
        total: 0,
        nodes: [],
        currentStore: null,
        isShow: false,
        isEdit: false,
        roles: [],
        departs: [],
        currentUser: null,
        selectedList: [],
        checkedAll: false,
    };
}

export default {
    namespace: 'user',

    state: getInitData(),

    reducers: {
        updateUserList(state, action) {
            return {
                ...state,
                list: action.data.list,
                total: action.data.total
            };
        },

        updateReq(state, action) {
            return {
                ...state,
                ...action.data
            };
        },

        updateTreeData(state, action) {
            let data = state.nodes.slice();
            
            if(action.data.id) {
                for(let i = 0; i < data.length; i++) {
                    if(data[i].id === action.data.id) {
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
                nodes: data || []
            }
        },

        updateCurrentNode(state, action) {
            return {
                ...state,
                currentStore: action.data
            }
        },

        switchModal(state, action) {
            return {
                ...state,
                isShow: action.data.isShow,
                isEdit: action.data.isEdit,
            }
        },

        updateRoles(state, action) {
            return {
                ...state,
                roles: action.data
            };
        },

        updateDeparts(state, action) {
            return {
                ...state,
                departs: action.data
            }
        },

        updateCurrentUser(state, action) {
            return {
                ...state,
                ...action.data
            };
        },

        updateSelectedList(state, action) {
            return {
                ...state,
                selectedList: action.data.selectedList,
                checkedAll: action.data.isCheckAll
            };
        },

        initData(state, action) {
            return getInitData();
        }
    },

    effects: {
        * getUserList(action, { call, put }) {
            const res = yield call(cusHttp.post, '/user/getUserList', action.data);

            yield put({
                type: 'updateReq',
                data: action.data
            });
            yield put({
                type: 'updateUserList',
                data: res
            });
        },

        * addUser(action, { call, put, select }) {
            const res = yield call(cusHttp.post, '/user/addUser', action.data);

            if(res) {
                message.success('保存成功！');
                yield put({
                    type: 'switchModal',
                    data: {
                        isEdit: false,
                        isShow: false,
                    }
                });
                const { keyword, pageIndex, pageSize } = yield select(state => state.user);
                
                const list = yield call(cusHttp.post, '/user/getUserList', {
                    keyword: keyword,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                });

                yield put({
                    type: 'updateUserList',
                    data: list,
                })
            }
        },

        * getTreeNodes(action, { call, put }) {
            const res = yield call(cusHttp.post, '/user/getTreeNodes', action.data);
            yield put({
                type: 'updateTreeData',
                data: {
                    id: action.data.id,
                    list: res
                }
            })
        },

        * getAllRoles(action, { call, put }) {
            const res = yield call(cusHttp.post, '/user/getAllRoles', action.data);
            if(res) {
                yield put({
                    type: 'updateRoles',
                    data: res
                });
            }
        },

        * getAllDeps(action, { call, put }) {
            const res = yield call(cusHttp.post, '/user/getAllDeps', action.data);
            if(res) {
                yield put({
                    type: 'updateDeparts',
                    data: res
                });
            }
        },

        * deleteUser(action, { call, put, select }) {
            const res = yield call(cusHttp.post, '/user/deleteUser', action.data);
            if(res) {
                message.success('已删除！');
                const { keyword, pageIndex, pageSize } = yield select(state => state.user);
                
                const list = yield call(cusHttp.post, '/user/getUserList', {
                    keyword: keyword,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                });

                yield put({
                    type: 'updateUserList',
                    data: list,
                })
            }
        },

        * editUser(action, { call, put, select }) {
            const  res = yield call(cusHttp.post, '/user/editUser', action.data);
            if(res) {
                message.success('保存成功！');
                const { keyword, pageIndex, pageSize } = yield select(state => state.user);
                
                const list = yield call(cusHttp.post, '/user/getUserList', {
                    keyword: keyword,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                });

                yield put({
                    type: 'updateUserList',
                    data: list,
                })
            }
        }
    },

    subscriptions: {}
}