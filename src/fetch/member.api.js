import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;

const getParam = req => {
    if(req.body) {
        return JSON.parse(req.body);
    }

    return null;
};

const memStore = {
    members: [],
    total: 0,
    levelList: [
        {
            id: '1',
            name: '钻石',
            color: '#7265e6',
        },
        {
            id: '2',
            name: '铂金',
            color: ' #108ee9',
        },
        {
            id: '3',
            name: '黄金',
            color: '#ffbf00',
        },
        {
            id: '4',
            name: '白银',
            color: '#f56a00',
        }
    ],
    labels: [
            {
                id: '1005',
                name: '富二代',
                type: 1,
            },
            {
                id: '1001',
                name: '官二代',
                type: 1,
            },
            {
                id: '1002',
                name: '星二代',
                type: 1,
            },
            {
                id: '1003',
                name: '土豪',
                type: 1,
            },
            {
                id: '1004',
                name: '潜力客户',
                type: 1,
            },
            {
                id: '2001',
                name: '档次高',
                type: 2,
            },
            {
                id: '2002',
                name: '奢侈品',
                type: 2,
            },
            {
                id: '2003',
                name: '数码粉',
                type: 2,
            },
            {
                id: '2004',
                name: '化妆品粉',
                type: 2,
            }
    ],
};

Random.extend({
    level: function(con) {
        const list = memStore.levelList;
        return this.pick(list);
    }
});

Random.extend({
    label: function(con) {
        const list = memStore.labels;
        return this.pick(list);
    }
});

Random.extend({
    records: function(con) {
        const list = ['零食大礼包', '衣服', 'qq充值', '化妆品', '观看电影', '坚果大礼包'];
        return this.pick(list);
    }
});

/** 
 * 获取左侧菜单数据
*/
export const getTabMenus = req => {
    const param = getParam(req);

    return {
        code: '0',
        message: '',
        data: [
            {
                id: Random.id(),
                title: '会员管理',
                children: [
                    {
                        id: Random.id(),
                        title: '会员列表',
                        url: '/app/member/list',
                        type: '1',
                    },
                    {
                        id: Random.id(),
                        title: '会员卡配置',
                        url: '/app/member/card',
                        type: '2',
                    },
                ]
            },
            {
                id: Random.id(),
                title: '等级管理',
                children: [
                    {
                        id: Random.id(),
                        title: '等级列表',
                        url: '/app/member/levels',
                        type: '3',
                    },
                ],
            }
        ],
    }
}

/** 
 * 初始化会员列表
*/
const initMemList = param => {
    memStore.total = 43;

    for(let i = 0; i < 43; i++) {
        const level = Random.level();
        const label = Random.label();
        memStore.members.push({
            id: Random.id(),
            name: Random.cname(),
            imgUrl: '',
            gender:  Random.natural(1, 2),
            age: Random.natural(18, 50),
            cardNo: 'XTD' + Random.datetime('yyyyMMddHHmm') + Random.natural(1000, 5000),
            phone: '1' + Random.natural(3, 9) + Random.integer(100000000, 999999999),
            accessIntegral: Random.natural(0, 1000),
            consumeFee: Random.float(0, 6000),
            consumeCnt: Random.natural(0, 100),
            state: Random.natural(1, 2), /** 1：正常；2：冻结；*/
            levelId: level.id,
            levelName: level.name,
            levelColor: level.color,
            labels: [
                {
                    labelId: label.id,
                    labelName: label.name,
                    type: Random.integer(1, 2),
                }
            ]
        });
    }
}

/** 
 * 获取会员等级列表
*/
export const getMemLevels = param => {
    return {
        code: '0',
        message: '',
        data: memStore.levelList,
    };
};

/** 
 * 获取标签列表
*/
export const getLabels = req => {
    const param = getParam(req);
    const { labels } = memStore;
    let labelList = [];
    let result = null;

    if(param.keyword || param.type) {
        labelList = labels.filter(item => {
            switch(param.type) {
                case 1:
                case '1':
                    return ((!param.keyword || item.name.includes(param.keyword)) && (item.type == param.type));
                case 2:
                case '2':
                    return ((!param.keyword || item.name.includes(param.keyword)) && (item.type == param.type));
                default:
                    return (!param.keyword || item.name.includes(param.phone));
            }
        });
    }
    else {
        labelList = labels;
    }

    if(!param.isAll && labelList.length > param.pageSize) {
        const start = param.pageSize * (param.pageIndex - 1);
        const end = labelList.length - 1 > (start + 10) ? start + 10 : labelList.length - 1;

        result = labelList.slice(start, end);
    }
    else {
        result = labelList;
    }

    return {
        code: '0',
        message: '',
        data: {
            total: labelList.length,
            list: result,
        },
    };
}

/** 
 * 获取会员列表
*/
export const getMemList = req => {
    const param = getParam(req);
    let result = [];
    let memList = [];
    const { members } = memStore;

    if(members && members.length <= 0) {
        initMemList();
    }

    if(param.keyword || param.levelId) {
        memList = members.filter(item => {
            switch(param.keyType) {
                case 1:
                case '1':
                    return ((!param.keyword || item.name.includes(param.keyword)) && (!param.levelId || item.levelId == param.levelId));
                case 2:
                case '2':
                    return ((!param.cardNo || item.cardNo.includes(param.cardNo)) && (!param.levelId || item.levelId == param.levelId));
                case 3:
                case '3':
                    return ((!param.phone || item.phone.includes(param.phone)) && (!param.levelId || item.levelId == param.levelId));
                default:
                    return false;
            }
        });
    }
    else {
        memList = members;
    }

    if(memList.length > param.pageSize) {
        const start = param.pageSize * (param.pageIndex - 1);
        const end = memList.length - 1 > (start + 10) ? start + 10 : memList.length - 1;

        result = memList.slice(start, end);
    }
    else {
        result = memList;
    }

    return {
        code: '0',
        message: '',
        data: {
            total: memList ? memList.length : 0,
            list: result,
        },
    };
}

/** 
 * 更新会员标签
*/
export const updateLabel = req => {
    const param = getParam(req);
    const { members } = memStore;

    if(param) {
        for(let i = 0; i < members.length; i++) {
            if(members[i].id == param.id) {
                members[i].labels = [];
                if(param.selected && param.selected.length > 0) {
                    for(let j = 0; j < param.selected.length; j++) {
                        members[i].labels.push({
                            labelId: param.selected[j].id,
                            labelName: param.selected[j].name,
                            type: param.selected[j].type,
                        });
                    }
                }

                break;
            }
        }
    }

    return {
        code: '0',
        message: '',
        data: true,
    };
}

/** 
 * 获取会员详情
*/
export const getDetail = req => {
    const param = getParam(req);
    const { members } = memStore; 
    let currentMember = null;
    const recordList = [];
    
    if(members && members.length > 0) {
        for(let i = 0; i < members.length; i++) {
            if(members[i].id == param.id) {
                currentMember = members[i];
                break;
            }
        }
    }

    for(let i = 0; i < 8; i ++) {
        recordList.push({
            id: Random.id(),
            name: Random.records(),
            createTime: Random.datetime('yyyy-MM-dd HH:mm'),
            store: Random.region() + '分店',
            integer: Random.integer(500, 1000),
        });
    }

    return {
        code: '0',
        message: '',
        data: {
            detail: currentMember,
            record: {
                averageFee: Random.float(300, 1000, 0, 3),
                totalIntegral: Random.integer(400, 1000),
                lastConsumptionTime: Random.datetime('yyyy-MM-dd HH:mm'),
                activeCardTime: Random.datetime('yyyy-MM-dd HH:mm'),
                list: recordList,
            }
        },
    };
}

/** 
 * 获取会员卡详情
*/
export const getCardDetail = req => {
    const param = getParam(req);

    return {
        code: '0',
        message: '',
        data: {
            id: Random.id(),
            storeName: '辉煌酒店',
            logo: '',
            title: '金卡',
            themeColor: '',
            backUrl: '',
            cardType: '1',
            cardNo: 'XTD20181010000012',
            expireType: '1',
            expireStartDate: moment().format('YYYY-MM-DD'),
            expireEndDate: moment().add(2, 'years').format('YYYY-MM-DD'),
            timeCnt: 0,
            privilege: '本卡自激活开始，开始享有本卡的一切优惠和特权，同时针对不同种类的卡片享有的特权也不尽相同；',
            notice: '请注意本卡只能会员本人使用，已经丢失，请尽快打电话到客户挂失，避免损失财产和权益，请妥善保存本卡！',
            activeType: '1',
            info: [
                {
                    id: Random.id(),
                    name: '姓名',
                    isActive: true,
                    isRequired: true,
                },
                {
                    id: Random.id(),
                    name: '手机号',
                    isActive: true,
                    isRequired: true,
                },
                {
                    id: Random.id(),
                    name: '学历',
                    isActive: true,
                    isRequired: false,
                },
                {
                    id: Random.id(),
                    name: '行业',
                    isActive: true,
                    isRequired: false,
                },
                {
                    id: Random.id(),
                    name: '详细地址',
                    isActive: true,
                    isRequired: false,
                }
            ],
            tipStr: '常用密码', 
        },
    };
}
