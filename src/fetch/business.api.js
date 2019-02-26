import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;

const getParam = req => {
    if(req.body) {
        return JSON.parse(req.body);
    }

    return null;
};

const businessStore = {
    allTypes: [
        '大床房',
        '标准间',
        '圆床房',
        '海景房',
        '观景房',
        '豪华房',
    ],
    roomTypes: [],
    total: 0,
};

Random.extend({
    roomTypes: function(con) {
        const list = businessStore.allTypes;
        return this.pick(list);
    }
});

/** 
 * 初始化房型列表
*/
const initRoomTypesList = param => {
    businessStore.total = 43;

    for(let i = 0; i < 43; i++) {
        businessStore.roomTypes.push({
            id: Random.id(),
            roomTypeName: Random.roomTypes()+i,
            num: Random.natural(0, 20),
            price: Random.float(200, 1000),
            deposit: Random.float(0, 300),
            order: Random.natural(0, 10)
        });
    }
}

/** 
 * 获取房型列表
*/
export const getRoomTypeList = req => {
    const param = getParam(req);
    let result = [];
    let memList = [];
    const { roomTypes } = businessStore;

    if(roomTypes && roomTypes.length <= 0) {
        initRoomTypesList();
    }

    if(param.keyword) {
        memList = roomTypes.filter(item => {
            switch(param.keyType) {
                case 1:
                case '1':
                    return ((!param.keyword || item.name.includes(param.keyword)) && (!param.levelId || item.levelId == param.levelId));
                default:
                    return false;
            }
        });
    }
    else {
        memList = roomTypes;
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


export const getRoomsByType = req => {
    const param = getParam(req);
    const { roomTypes } = businessStore;
    const date = new Date(param.date);
    let room = {};

    for(let i = 0; i < roomTypes.length; i += 1) {
        if(roomTypes[i].id == param.id) {
            room = roomTypes[i];
            break;
        }
    }

    room.priceList = [];
    for(let i = 0; i < 31; i += 1) {
        room.priceList.push({
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${i+1}`,
            total: Random.natural(10, 20),
            enabledRooms: Random.natural(1, 10),
            price: Random.float(200, 500),
        });
    }

    return {
        code: '0',
        message: '',
        data: room,
    };
}