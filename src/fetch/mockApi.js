import Mock from 'mockjs';

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

const getParam = req => {
    return JSON.parse(req.body);
}

/** 
 * 登录
*/
const login = (req) => {
    const enableUser = {
        username: 'kaiqiang.cao',
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
            url: '/dashboard',
            type: 'home'
        },
        {
            id: Random.id(),
            name: '订单',
            nickName: 'office',
            url: '/order',
            type: 'solution'
        },
        {
            id: Random.id(),
            name: '营销',
            nickName: 'market',
            url: '/market',
            type: 'inbox'
        },
        {
            id: Random.id(),
            name: '数据统计',
            nickName: 'statistic',
            url: '/statistics',
            type: 'line-chart'
        },
        {
            id: Random.id(),
            name: '用户管理',
            nickName: 'userMg',
            url: '/users',
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

/** 
 * 获取用户列表
*/
const getUsersByCity = req => {
    const param = getParam(req);
    const userList = [];
    let total = 0;
    for(let i = 0; i < 35; i++) {
        total++;
        userList.push(
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
    }

    return {
        code: '0',
        message: '',
        data: {
            total: total,
            list: userList
        }
    };
}

Mock.mock('/login', /post/i, login);
Mock.mock('/getMenus', /post/i, getMenus);
Mock.mock('/user/getTreeNodes', /post/i, getTreeNode);
Mock.mock('/user/getUserList', /post/i, getUsersByCity);