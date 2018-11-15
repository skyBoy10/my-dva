import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon } from 'antd';
import moment from 'moment';

/** 
 * 引入自定义的样式
*/
import './dashboard.less';

/** 
 * 提示语信息
*/
const TipMsg = (props) => {
    const getMsg = () => {
        const currentHour = moment().hour();
        
        if(currentHour < 8) {
            return '早上好，' + props.currentUser.username;
        }

        if(currentHour < 13 && currentHour >= 8) {
            return '上午好，' + props.currentUser.username;
        }

        if(currentHour >= 13 && currentHour <= 18) {
            return '下午好，' + props.currentUser.username;
        }

        if(currentHour > 18) {
            return '晚上好，' + props.currentUser.username;
        }
    }

    return (
        <div className='h-50 l-h-50 txt-bold p-l-10'>{getMsg()}</div>
    );
};

/** 
 * 营销模块
*/
const Market = (props) => {
    const cardList = [
        {
            name: '拼团',
            url: '',
            desc: '拼出更大优惠!',
            type: 'team'
        },
        {
            name: '砍价',
            url: '',
            desc: '和小伙伴一起砍价，享有更大优惠！',
            type: 'tag-o'
        },
        {
            name: '限时折扣',
            url: '',
            desc: '快快查看，意外惊喜！',
            type: 'clock-circle'
        },
        {
            name: '优惠券',
            url: '',
            desc: '更多优惠券，更多优惠！',
            type: 'inbox'
        },
        {
            name: '满包邮',
            url: '',
            desc: '达到消费金额，享有免费包邮！',
            type: 'book'
        },
    ];
    return (
        <div className='p-lr-10 p-b-10'>
        {
            cardList.map(card => {
                return (
                    <span className='line-b w-2-5 p-10' key={card.type}>
                        <Card
                        bordered={true}
                        noHovering={false}>
                            <span className='line-b h-60 w-3 txt-center pull-left b-c-red-2 b-r-10 p-t-10'>
                                <Icon type={card.type} className='txt-s-2-5em txt-c-white' />
                            </span>
                            <span className='line-b l-h-30 w-7 pull-left p-l-10'>{card.name}</span>
                            <span className='line-b l-h-30 w-7 pull-left p-l-10 txt-overflow txt-gray-1 txt-s-13'>{card.desc}</span>
                        </Card>
                    </span>
                );
            })
        }
        </div>
    );
}

/** 
 * 工具
*/
const Tools = (props) => {
    const cardList = [
        {
            name: '产品介绍',
            url: '',
            type: 'file-ppt'
        },
        {
            name: '设置',
            url: '',
            type: 'setting'
        },
        {
            name: '消息中心',
            url: '',
            type: 'message'
        },
        {
            name: '使用指南',
            url: '',
            type: 'compass'
        }
    ];
    return (
        <div className='p-lr-10 p-b-10'>
        {
            cardList.map(card => {
                return (
                    <span className='line-b w-2-5 p-10' key={card.type}>
                        <Card
                        bordered={true}
                        noHovering={false}>
                            <span className='line-b h-60 w-60 txt-center pull-left b-c-blue-1 b-r-half p-t-10'>
                                <Icon type={card.type} className='txt-s-2-5em txt-c-white' />
                            </span>
                            <span className='line-b l-h-60 pull-left p-l-10'>{card.name}</span>
                        </Card>
                    </span>
                );
            })
        }
        </div>
    );
}

class dashboard extends Component {
    render() {
        const { currentUser } = this.props.base;
        return (
            <div className='p-10 dashboard'>
                <Row className='m-b-10'>
                    <Col span={16} className='p-r-10'>
                        <div className='h-full b-c-white b-r-5'>
                            <TipMsg currentUser={currentUser} />
                            <div className='h-130'>
                                <span className='line-b w-2-5 h-full pull-left'>
                                    <div className='l-h-50 txt-center txt-s-20 txt-bold txt-c-blue-1'>0</div>
                                    <div className='l-h-50 txt-center txt-s-16'>已完成订单</div>
                                </span>
                                <span className='line-b w-2-5 h-full pull-left'>
                                    <div className='l-h-50 txt-center txt-s-20 txt-bold txt-c-blue-1'>0</div>
                                    <div className='l-h-50 txt-center txt-s-16'>待确认订单</div>
                                </span>
                                <span className='line-b w-2-5 h-full pull-left'>
                                    <div className='l-h-50 txt-center txt-s-20 txt-bold txt-c-blue-1'>0</div>
                                    <div className='l-h-50 txt-center txt-s-16'>未完成订单</div>
                                </span>
                                <span className='line-b w-2-5 h-full pull-left'>
                                    <div className='l-h-50 txt-center txt-s-20 txt-bold txt-c-blue-1'>0</div>
                                    <div className='l-h-50 txt-center txt-s-16'>维权订单</div>
                                </span>
                                <span className='clear'></span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8} className='b-c-white b-r-5'>
                        <div className='h-50 l-h-50 p-l-10'>
                            二维码信息
                        </div>
                        <div className='h-130'>
                            <span className='line-b w-5 h-full pull-left txt-center'>
                                <div>
                                    <span className='line-b wechat'></span>
                                </div>
                                <div className='l-h-30'>公众号</div>
                            </span>
                            <span className='line-b w-5 h-full pull-left txt-center'>
                                <div>
                                    <span className='line-b mini'></span>
                                </div>
                                <div className='l-h-30'>小程序</div>
                            </span>
                            <span className='clear'></span>
                        </div>
                    </Col>
                </Row>
                <Row className='m-b-10'>
                    <Col span={24} className='b-c-white b-r-5'>
                        <div className='h-50 l-h-50 p-l-10 txt-bold'>
                            营销
                        </div>
                        <Market />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='b-c-white b-r-5'>
                        <div className='h-50 l-h-50 p-l-10 txt-bold'>
                            工具
                        </div>
                        <Tools />
                    </Col>
                </Row>
            </div>
        )
    }
};

export default connect(({ base, dashboard, loading }) => ({ base, dashboard, loading }))(dashboard)