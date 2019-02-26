import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Icon, Row, Col, Button, Tag, Spin, Breadcrumb } from 'antd';

/** 
 * 引入自定义工具
*/
import { formatMoney } from '../../utils/tools';

const LabelItem = props => {
    const { labels } = props;
    
    return (
        <Fragment>
            {
                labels && labels.map(label => {
                    return (
                        <span className='line-b m-r-10' key={label.labelId}>
                            <Tag color="#2db7f5" closable>{label.labelName || '--'}</Tag>
                        </span>
                    );
                })
            }
            <Button type='default' size='small'>添加标签</Button>
        </Fragment>
    );
}

@connect(({ member, label, loading }) => ({ member, label, loading }))
class MemDetail extends PureComponent {
    componentDidMount() {
        const { dispatch, location } = this.props;
        
        dispatch({
            type: 'member/getMemberDetail',
            data: {
                id: location.state.id,
            },
        });
    }

    /** 
     * 移除标签
    */
    removeTags = (label) => {
        console.log(label);
    }

    render() {
        const { member, loading } = this.props;
        const { memDetail } = member; 
        const { detail, record } = memDetail;
        const isLoading = loading.effects['member/getMemberDetail'];

        return (
            <div className='b-c-white b-r-5 scroll-y h-full'>
                <Spin spinning={isLoading} tip='加载中...'>
                    <div className='p-10'>
                        <Breadcrumb separator='/'>
                            <Breadcrumb.Item>
                                <Link to='/app/member/list'>会员列表</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item className='txt-bold'>
                                会员详情
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className='b-c-gray-2 b-r-5 p-t-10'>
                        <div className='flex-row h-150 w-full b-r-5 b-c-white p-10'>
                            <div className='row-0 w-200 h-full txt-center b-c-gray-3 txt-c-white b-r-5'>
                                <Icon type='user' className='txt-s-4x m-t-30' />
                            </div>
                            <div className='row-1 h-full l-h-30 p-l-10'>
                                <Row>
                                    <Col>
                                        <span>名称：</span>
                                        <span className='txt-gray-1'>{detail.name || '--'}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <span>卡号：</span>
                                        <span className='txt-gray-1'>{detail.cardNo || '--'}</span>
                                    </Col>
                                    <Col span={12}>
                                        <span>等级：</span>
                                        <span className='txt-gray-1'>
                                            <Tag color={detail.levelColor}>{detail.levelName || '--'}</Tag>
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <span>剩余积分：</span>
                                        <span className='txt-gray-1'>{detail.accessIntegral || '--'}</span>
                                    </Col>
                                    <Col span={12}>
                                        <span>成长值：</span>
                                        <span className='txt-gray-1'>{detail.groupVal || '--'}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Button size='small' type='default' className='m-r-10'>送积分</Button>
                                        <Button size='small' type='default'>送优惠券</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='txt-bold l-h-30 p-10'>
                            标签
                        </div>
                        <div className='p-10 b-c-white b-r-5'>
                            <LabelItem labels={detail.labels} />
                        </div>
                        <div className='txt-bold l-h-30 p-10'>
                            个人信息
                        </div>
                        <div className='p-10 b-c-white b-r-5 l-h-30'>
                            <Row>
                                <Col span={6} className='b-rg-gray'>
                                    <span>姓名：</span>
                                    <span className='txt-gray-1'>{detail.name || '--'}</span>
                                </Col>
                                <Col span={6} className='b-rg-gray'>
                                    <span className='p-l-10'>手机号：</span>
                                    <span className='txt-gray-1'>{detail.phone || '--'}</span>
                                </Col>
                                <Col span={6} className='b-rg-gray'>
                                    <span className='p-l-10'>性别：</span>
                                    <span className='txt-gray-1'>{(detail.gender == 1 ? '男' : '女') || '--'}</span>
                                </Col>
                                <Col span={6}>
                                    <span className='p-l-10'>生日：</span>
                                    <span className='txt-gray-1'>{detail.birthday || '--'}</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='txt-bold l-h-30 p-10'>
                            交易信息
                        </div>
                        <div className='p-10 b-c-white b-r-5 l-h-30'>
                            <Row className='b-b'>
                                <Col span={6} className='b-rg-gray'>
                                    <span>会员等级：</span>
                                    <span className='txt-gray-1'>{detail.levelName || '--'}</span>
                                </Col>
                                <Col span={6} className='b-rg-gray'>
                                    <span className='p-l-10'>会员状态：</span>
                                    <span className='txt-gray-1'>{(detail.state == 1 ? '正常' : '冻结')|| '--'}</span>
                                </Col>
                                <Col span={6} className='b-rg-gray'>
                                    <span className='p-l-10'>累计消费：</span>
                                    <span className='txt-gray-1'>{formatMoney(detail.consumeFee) || '--'}</span>
                                </Col>
                                <Col span={6}>
                                    <span className='p-l-10'>消费次数：</span>
                                    <span className='txt-gray-1'>{detail.consumeCnt || '--'}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6} className='b-rg-gray'>
                                    <span>平均消费金额：</span>
                                    <span className='txt-gray-1'>{formatMoney(record.averageFee) || '--'}</span>
                                </Col>
                                <Col span={6} className='b-rg-gray'>
                                    <span className='p-l-10'>累计积分：</span>
                                    <span className='txt-gray-1'>{record.totalIntegral || '--'}</span>
                                </Col>
                                <Col span={6} className='b-rg-gray'>
                                    <span className='p-l-10'>上次消费时间：</span>
                                    <span className='txt-gray-1'>{record.lastConsumptionTime || '--'}</span>
                                </Col>
                                <Col span={6}>
                                    <span className='p-l-10'>开卡时间：</span>
                                    <span className='txt-gray-1'>{record.activeCardTime || '--'}</span>
                                </Col>
                            </Row>
                        </div>
                        <div className='txt-bold l-h-30 p-10'>
                            积分记录
                        </div>
                        <div className='b-c-white b-r-5'>
                            <Row className='p-l-10 txt-bold l-h-30 b-b'>
                                <Col span={6}>交易名称</Col>
                                <Col span={6}>消费时间</Col>
                                <Col span={6}>消费门店</Col>
                                <Col span={6}>积分</Col>
                            </Row>
                            {
                                record.list && record.list.map(item => {
                                    return (
                                        <Row className='p-l-10 l-h-30 b-b' key={item.id}>
                                            <Col span={6}>{item.name || '--'}</Col>
                                            <Col span={6}>{item.createTime || '--'}</Col>
                                            <Col span={6}>{item.store || '--'}</Col>
                                            <Col span={6}>{item.integer || '--'}</Col>
                                        </Row>
                                    );
                                })
                            }
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'member/resetDetail',
            data: '',
        });
    }
}

export default MemDetail;