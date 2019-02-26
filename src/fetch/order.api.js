import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;

const getParam = req => {
    if(req.body) {
        return JSON.parse(req.body);
    }

    return null;
};

const orderStore = {
    list: [],
    total: 0,
};

Random.extend({
    roomTypes: function(con) {
        const list = orderStore.levelList;
        return this.pick(list);
    }
});

/** 
 * 初始化订单列表
*/
const initOrderList = param => {
    orderStore.total = 43;

    for(let i = 0; i < 43; i++) {
        orderStore.list.push({
            id: Random.id(),
            name: Random.cname(),
            roomType: Random.natural(1, 10),
            checkInDate: moment().add(i+1, 'days').format('YYYY-MM-DD'),
            checkOutDate: moment().add(i+Random.natural(2, 10), 'days').format('YYYY-MM-DD'),
            orderNo: 'BO' + Random.datetime('yyyyMMddHHmm') + Random.natural(1000, 5000),
            phone: '1' + Random.natural(3, 9) + Random.integer(100000000, 999999999),
            accessIntegral: Random.natural(0, 1000),
            payedFee: Random.float(0, 6000),
            status: Random.natural(1, 2), /** 1：待确认；2：待入住；3：已入住；4：*/
        });
    }
}

/** 
 * 获取会员列表
*/
export const getOrderList = req => {
    const param = getParam(req);
    let result = [];
    let memList = [];
    const { list } = orderStore;

    if(list && list.length <= 0) {
        initOrderList();
    }

    if(param.keyword || param.levelId) {
        memList = list.filter(item => {
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
        memList = list;
    }

    if(memList.length > param.pageSize) {
        const start = param.pageSize * (param.pageIndex - 1);
        const end = memList.length - 1 > (start + param.pageSize) ? start + param.pageSize : memList.length - 1;

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
