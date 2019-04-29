import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;

const store  = {
    amount: 10000000,
    list: []
}

const getParam = req => {
    if(req.body) {
        return JSON.parse(req.body);
    }

    return null;
};

export const getList = param => {
    const list = [];
    let temp = [];

    for(let i = 0; i < 28; i += 1) {
        if((i + 1) % 10 && i < 27) {
            temp.push({
                id: Random.id(),
                code: `t${i}`,
                name: Random.cname(),
            });
            continue;
        }

        temp.push({
            id: Random.id(),
            code: `t${i}`,
            name: Random.cname(),
        });
        list.push({
            id: Random.id(),
            children: temp,
        });
        temp = [];
    }

    return {
        code: '0',
        message: '',
        data: {
            list,
        },
    };
};

export const getAmount = param => {
    const temp = store.amount + Random.natural(1, 100);
    store.amount = temp;

    return {
        code: 0,
        message: '',
        data: {
            amount: temp,
        }
    };
};

const initStore = () => {
    const list = [];

    for(let i = 0; i < 8; i += 1) {
        list.push({
            id: Random.id(),
            sort: i + 1,
            name: Random.cname(),
        })
    }

    store.list = list;
}

export const getTList = param => {
    const { list } = store;

    if(!list || list.length <= 0) {
        initStore();
    }

    return {
        code: '0',
        message: '',
        data: {
            list: store.list,
        }
    };
}

export const updateSort = param => {
    const index = Random.natural(0, 7);

    const first = store.list[0];
    const other = store.list[index];
    first.sort = other.sort;
    other.sort = 1;
    store.list[0] = other;
    store.list[index] = first;

    return {
        code: 0,
        message: '',
        data: {
            list: store.list
        }
    }
}
