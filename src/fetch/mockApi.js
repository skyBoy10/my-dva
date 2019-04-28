import Mock from 'mockjs';
import moment from 'moment';
import { getTabMenus, getMemList, getLabels, getMemLevels, updateLabel, getDetail, getCardDetail } from './member.api';
import { getOrderList } from './order.api';
import { getRoomTypeList, getRoomsByType } from  './business.api';
import { getList, getAmount } from './guidance.api';

const Random = Mock.Random;

Random.extend({
    role: function(con) {
        const list = ['超级管理员', '管理员', '员工', '访客'];
        return this.pick(list);
    }
});

Random.extend({
    position: function(con) {
        const list = ['店长', '店员', '副店长', '经理', '会计', '服务员'];
        return this.pick(list);
    }
});

Random.extend({
    activities: function() {
        const list = ['拼团', '砍价', '限时折扣'];
        return this.pick(list);
    }
});

const store = {
    user: {
        users: [],
        total: 0,
    },
    role: {
        list: [],
    },
    statistics: {
        list: [],
        total: 0,
    },
}

const getParam = req => {
    if(req.body) {
        return JSON.parse(req.body);
    }

    return null;
}

/** 
 * 登录
*/
const login = (req) => {
    const enableUser = {
        username: 'admin',
        password: '123456',
        isAdmin: true
    };
    const param = getParam(req);

    if(param.username === enableUser.username && param.password === enableUser.password) {
        return {
            code: '0',
            message: '',
            data: enableUser
        };
    }

    return  {
        code: '1000',
        message: '登录失败',
        data: null
    }
}

/** 
 * 获取菜单
*/
const getMenus = (req) => {
    const param = getParam(req);

    const menus = [
        {
            id: Random.id(),
            name: '概况',
            nickName: 'dashboard',
            url: '/app/dashboard',
            type: 'home'
        },
        {
            id: Random.id(),
            name: '房态图',
            nickName: 'roommap',
            url: '/app/room/map',
            type: 'schedule'
        },
        {
            id: Random.id(),
            name: '业务',
            nickName: 'business',
            url: '/app/business/roomTypes',
            type: 'desktop'
        },
        {
            id: Random.id(),
            name: '订单',
            nickName: 'order',
            url: '/app/order/bookList',
            type: 'solution'
        },
        {
            id: Random.id(),
            name: '营销',
            nickName: 'market',
            url: '/app/market',
            type: 'inbox'
        },
        {
            id: Random.id(),
            name: '会员管理',
            nickName: 'member',
            url: '/app/member/list',
            type: 'user'
        },
        {
            id: Random.id(),
            name: '数据统计',
            nickName: 'statistics',
            url: '/app/statistics',
            type: 'line-chart'
        },
        {
            id: Random.id(),
            name: '用户管理',
            nickName: 'users',
            url: '/app/users',
            type: 'team'
        }
    ];

    return {
        code: '0',
        message: '',
        data: menus
    };
}

/** 
 * 获取节点数据
*/
const getTreeNode = (req) => {
    const param = getParam(req);
    const nodeList = [];
        
    if(param.type == 1) {
        for(let i = 0; i < 10; i++) {
            const address = Random.region();
            nodeList.push(
                {
                    id: Random.id(),
                    title: address+'区域', 
                    name: address+'区域',
                    children: [],
                    isLeaf: false
                }
            );
        };
    };

    if(param.type == 2) {
        for(let i = 0; i < 10; i++) {
            const city = Random.city();
            nodeList.push(
                {
                    id: Random.id(),
                    title: city+'分店', 
                    name: city+'分店',
                    isLeaf: true,
                }
            );
        };
    }

    return {
        code: '0',
        message: '',
        data: nodeList
    }
};

const initUsers = () => {
    const users = [];
    let total = 0;
    
    for(let i = 0; i < 35; i++) {
        total++;
        users.push(
            {
                id: Random.id(),
                name: Random.cname(),
                gender: Random.natural(1, 2),
                age: Random.natural(20, 50),
                position: Random.position(),
                createTime: Random.datetime('yyyy-MM-dd'),
                role: Random.role(),
                state: Random.natural(1, 3)
            }
        );
    };

    store.user.users = users;
    store.user.total = total;
}

/** 
 * 获取用户列表
*/
const getUsersByCity = req => {
    const param = getParam(req);
    let userList = [];
    let result = [];
    const { user } = store;
    const { users } = user;
    
    if(users.length <= 0) {
        initUsers();
    }

    if(param.keyword) {
        userList = users.filter(item => item.name.includes(param.keyword));
    }
    else {
        userList = users;
    }

    if(userList.length > param.pageSize) {
        const start = param.pageSize * (param.pageIndex - 1);
        const end = userList.length - 1 > (start + 10) ? start + 10 : userList.length - 1;

        result = userList.slice(start, end);
    }
    else {
        result = userList;
    }
    

    return {
        code: '0',
        message: '',
        data: {
            total: userList.length,
            list: result
        }
    };
}

/** 
 * 添加用户
*/
const addUser = req => {
    const param = getParam(req);
    const { user } = store;

    user.users.push({
        ...param,
        id: Random.id(),
        createTime: Random.datetime('yyyy-MM-dd'),
        state: Random.natural(1, 3)
    })

    return {
        code: 0,
        message: '',
        data: true
    }
};

const initRoles = req => {
    const list = [
        {
            id: Random.id(),
            name: '超级管理员',
            code: '0000',
        },
        {
            id: Random.id(),
            name: '管理员',
            code: '0001',
        },
        {
            id: Random.id(),
            name: '普通用户',
            code: '0002',
        },
        {
            id: Random.id(),
            name: '访客',
            code: '0003',
        }
    ];

    store.role.list = list;
}

/** 
 * 获取所有角色
*/
const getAllRoles = req => {
    const param = getParam(req);
    let list = [];

    if(store.role.list.length <= 0) {
        initRoles();
    }

    list = store.role.list;

    return {
        code: 0,
        message: '',
        data: list
    }
}

/** 
 * 获取所有部门
*/
const getAllDeps = req => {
    const param = getParam(req);

    const list = [
        {
            id: Random.id(),
            name: '销售部',
            des: '负责销售',
            children: [
                {
                    id: Random.id(),
                    name: '总经理'
                },
                {
                    id: Random.id(),
                    name: '副经理'
                },
                {
                    id: Random.id(),
                    name: '助理'
                },
                {
                    id: Random.id(),
                    name: '组长'
                },
                {
                    id: Random.id(),
                    name: '员工'
                },
            ],
        },
        {
            id: Random.id(),
            name: '运维部',
            des: '负责管理店铺运营',
            children: [
                {
                    id: Random.id(),
                    name: '总经理'
                },
                {
                    id: Random.id(),
                    name: '副经理'
                },
                {
                    id: Random.id(),
                    name: '策划'
                },
                {
                    id: Random.id(),
                    name: '组长'
                },
                {
                    id: Random.id(),
                    name: '员工'
                },
            ],
        },
        {
            id: Random.id(),
            name: '财务部',
            des: '负责管理店铺财务',
            children: [
                {
                    id: Random.id(),
                    name: '总经理'
                },
                {
                    id: Random.id(),
                    name: '副经理'
                },
                {
                    id: Random.id(),
                    name: '财务组长'
                },
                {
                    id: Random.id(),
                    name: '会计'
                },
                {
                    id: Random.id(),
                    name: '清算员工'
                },
            ],
        },
        {
            id: Random.id(),
            name: '行政部',
            des: '负责规范公司，以及采购等',
            children: [
                {
                    id: Random.id(),
                    name: '总经理'
                },
                {
                    id: Random.id(),
                    name: '副经理'
                },
                {
                    id: Random.id(),
                    name: '采购'
                },
                {
                    id: Random.id(),
                    name: '纪检员'
                },
                {
                    id: Random.id(),
                    name: '大组长'
                },
            ],
        }
    ];

    return {
        code: '0',
        message: '',
        data: list
    };
};

/** 
 * 删除用户
*/
const deleteUser = req => {
    return {
        code: '0',
        message: '',
        data: true
    }
};

/** 
 * 编辑用户
*/
const editUser = req => {
    return {
        code: '0',
        message: '',
        data: true,
    };
};

/** 
 * 获取总数据
*/
const getStatisticsTotal = req => {
    const param = getParam(req);

    return {
        code: '0',
        message: '',
        data: {
            revenueFee: Random.float(1000, 10000000, 0, 3),
            receivableFee: Random.float(1000, 10000000, 0, 3),
            acceptedFee: Random.float(1000, 10000000, 0, 3),
            totalFee: Random.float(10000, 10000000, 0, 3)
        },
    };
};

/** 
 * 获取报表数据
*/
const getReportData = req => {
    const param = getParam(req);
    const len = moment(param.endDate).dayOfYear() - moment(param.startDate).dayOfYear();
    const result = {
        assembleData: [],
        bargainData: [],
        discountData: [],
        onlineData: [],
        offlineData: [],
    };

    for(let i = 0; i < len; i++) {
        result.assembleData.push({
            datetime: moment(param.startDate).add(i, 'days').format('YYYY-MM-DD'),
            revenueFee: Random.float(200, 5000, 1, 3),
        });

        result.bargainData.push({
            datetime: moment(param.startDate).add(i, 'days').format('YYYY-MM-DD'),
            revenueFee: Random.float(100, 6000, 1, 3),
        });

        result.discountData.push({
            datetime: moment(param.startDate).add(i, 'days').format('YYYY-MM-DD'),
            revenueFee: Random.float(100, 5000, 1, 3),
        });

        result.onlineData.push({
            datetime: moment(param.startDate).add(i, 'days').format('YYYY-MM-DD'),
            fee: Random.float(10000, 500000, 0, 2),
        });

        result.offlineData.push({
            datetime: moment(param.startDate).add(i, 'days').format('YYYY-MM-DD'),
            fee: Random.float(10000, 500000, 0, 2),
        });
    }

    return {
        code: '0',
        message: '',
        data: {
            lineData: result,
            pieData: [
                {
                    total: Random.float(2000, 8000, 0, 2),
                    name: '拼团',
                },
                {
                    total: Random.float(2000, 8000, 0, 2),
                    name: '砍价',
                },
                {
                    total: Random.float(2000, 8000, 0, 2),
                    name: '限时折扣',
                }
            ],
            circleData: {
                online: {
                    grossIncome: Random.float(10000, 300000, 0, 2),
                    perCapita: Random.float(0, 6000, 0, 2),
                    totalSales: Random.float(100000, 1000000, 0, 2),
                    perSales: Random.float(0, 10000, 0, 2),
                    perPay: Random.float(0, 5000, 0, 2),
                    totalPay: Random.float(0, 20000, 0, 2),
                },
                offline: {
                    grossIncome: Random.float(10000, 300000, 0, 2),
                    perCapita: Random.float(0, 6000, 0, 2),
                    totalSales: Random.float(100000, 800000, 0, 2),
                    perSales: Random.float(0, 10000, 0, 2),
                    perPay: Random.float(0, 5000, 0, 2),
                    totalPay: Random.float(0, 20000, 0, 2),
                },
            },
        },
    }
};

const initStatisticsList = param => {
    store.statistics.total = 34;
    for(let i = 0; i <= 34; i++) {
        store.statistics.list.push(
            {
                id: Random.id(),
                custom: Random.cname(),
                phone: '1' + Random.natural(3, 9) + Random.integer(100000000, 999999999),
                activity: Random.activities(),
                createTime: moment(param.startDate).add(i, 'd').format('YYYY-MM-DD HH:mm'),
                spendFee: Random.float(0, 1000, 0, 2),
                address: Random.region() + '分店',
                channel: Random.natural(1, 2),
            }
        );
    }
}

/** 
 * 获取列表数据
*/
const getListData = req => {
    const param = getParam(req);
    let result = [];
    const { statistics } = store;
    const { list } = statistics;
    
    if(list.length <= 0) {
        initStatisticsList(param);
    }

    if(list.length > param.pageSize) {
        const start = param.pageSize * (param.pageIndex - 1);
        const end = list.length - 1 > (start + 10) ? start + 10 : list.length - 1;

        result = list.slice(start, end);
    }
    else {
        result = list;
    }
    

    return {
        code: '0',
        message: '',
        data: {
            total: list.length,
            list: result
        }
    };
}

Mock.mock('/login', /post/i, login);
Mock.mock('/getMenus', /post/i, getMenus);
Mock.mock('/user/getTreeNodes', /post/i, getTreeNode);
Mock.mock('/user/getUserList', /post/i, getUsersByCity);
Mock.mock('/user/addUser', /post/i, addUser);
Mock.mock('/user/getAllRoles', /post/i, getAllRoles);
Mock.mock('/user/getAllDeps', /post/i, getAllDeps);
Mock.mock('/user/deleteUser', /post/i, deleteUser);
Mock.mock('/user/editUser', /post/i, editUser);
Mock.mock('/statistics/getTotal', /post/i, getStatisticsTotal);
Mock.mock('/statistics/getReport', /post/i, getReportData);
Mock.mock('/statistics/getDetail', /post/i, getListData);
Mock.mock('/member/getTabMenus', /post/i, getTabMenus);
Mock.mock('/member/getMemList', /post/i, getMemList);
Mock.mock('/member/getMemLevels', /post/i, getMemLevels);
Mock.mock('/member/getLabels', /post/i, getLabels);
Mock.mock('/member/tickLabel', /post/i, updateLabel);
Mock.mock('/member/getMemberDetail', /post/i, getDetail);
Mock.mock('/member/getCardDetail', /post/i, getCardDetail);
Mock.mock('/order/getBookList', /post/i, getOrderList);
Mock.mock('/business/getRoomTypeList', /post/i, getRoomTypeList);
Mock.mock('/business/getRoomsByType', /post/i, getRoomsByType);
Mock.mock('/guidance/getList', /post/i, getList);
Mock.mock('/guidance/getAmount', /post/i, getAmount)