import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;

const store  = {
    amount: 100000,
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
    const temp = store.amount + Random.natural(1, 10);
    store.amount = temp;

    return {
        code: 0,
        message: '',
        data: {
            amount: temp,
        }
    };
}
