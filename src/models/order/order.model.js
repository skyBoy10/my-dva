const initState = () => {
    return {
        subMenus: [
            {
                key: '100',
                name: '住宿订单',
                isMenu: true,
            },
            {
                key: '101',
                name: '预约订单',
                url: '/app/order/bookList',
                parentKey: '100',
                isMenu: true,
            },
            {
                key: '102',
                name: '住宿订单',
                url: '/app/order/accommodationList',
                parentKey: '100',
                isMenu: true,
            },
            {
                key: '200',
                name: '商城订单',
                isMenu: true,
            },
            {
                key: '201',
                name: '订单记录',
                url: '/app/order/shopRecord',
                parentKey: '200',
                isMenu: true,
            },
            {
                key: '202',
                name: '核销记录',
                url: '/app/order/verificationList',
                parentKey: '200',
                isMenu: true,
            }
        ],
    };
}

export default {
    namespace: 'order',

    state: initState(),

    reducers: {
        
    },

    effects: {},

    subscriptions: {}
}