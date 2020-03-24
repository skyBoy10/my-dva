
const initState = () => {
    return {
        subMenus: [
            {
                key: '100',
                name: '住宿管理',
                isMenu: true,
            },
            {
                key: '101',
                name: '房型列表',
                url: '/app/business/roomTypes',
                parentKey: '100',
                isMenu: true,
            },
            {
                key: '1011',
                name: '房型价格',
                url: '/app/business/roomPrice',
                parentKey: '101',
                isMenu: false,
            },
            {
                key: '1012',
                name: '房型编辑',
                url: '/app/business/roomTypes/edit',
                parentKey: '101',
                isMenu: false,
            },
            {
                key: '102',
                name: '房号管理',
                url: '/app/business/roomNos',
                parentKey: '100',
                isMenu: true,
            },
            {
                key: '103',
                name: '住宿设置',
                url: '/app/business/staySet',
                parentKey: '100',
                isMenu: true,
            },
            {
                key: '200',
                name: '商品管理',
                isMenu: true,
            },
            {
                key: '201',
                name: '商品列表',
                url: '/app/business/goods',
                parentKey: '200',
                isMenu: true,
            },
            {
                key: '202',
                name: '商品设置',
                url: '/app/order/goodsSet',
                parentKey: '200',
                isMenu: true,
            },
            {
                key: '203',
                name: '商品发布',
                url: '/app/order/goodsRelease',
                parentKey: '200',
                isMenu: true,
            }
        ],
    };
}

export default {
    namespace: 'business',

    state: initState(),

    reducers: {

    },

    effects: {

    },
}