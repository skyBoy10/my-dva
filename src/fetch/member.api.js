import Mock from 'mockjs';
import moment from 'moment';

const Random = Mock.Random;

const getParam = req => {
    if(req.body) {
        return JSON.parse(req.body);
    }

    return null;
}

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
                        url: '/member/list',
                    },
                    {
                        id: Random.id(),
                        title: '会员配置',
                        url: '/member/config'
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
                        url: '/member/levels',
                    },
                ],
            }
        ],
    }
}
