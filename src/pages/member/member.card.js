import React, { PureComponent } from 'react';
import { Row, Col, Alert, Spin } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

/** 
 * 引入自定义样式
*/
import './member.less';

@connect(({ memCard, loading }) => ({ memCard, loading }))
class MemCard extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'memCard/getCardDetail',
            data: '',
        })
    }

    /** 
     * 有效期转换
    */
    transformType() {
        const { memCard } = this.props;
        const { expireStartDate, expireEndDate, expireType, timeCnt } = memCard;

        switch(expireType) {
            case 1:
            case '1':
                return `${expireStartDate} ~ ${expireEndDate}`;
            case 2:
            case '2':
                return `自激活开始，${timeCnt}天内有效`;
            case 3:
            case '3':
                return '永久有效';
            default:
                return '';
        }
    }

    render() {
        const { memCard, loading } = this.props;
        const isLoading = loading.effects['memCard/getCardDetail'];

        return (
            <div className='memCard'>
                <Spin spinning={isLoading} tip='加载中...'>
                    <Row className='m-b-10'>
                        <Col span={24}>
                        <Alert
                            message="会员卡已经完成设置，大致信息如下："
                            type="info"
                            showIcon
                            />
                        </Col>
                    </Row>
                    <div className='p-10 b-c-white b-r-5 m-b-10 l-h-30'>
                        <div>
                            <span className='line-b txt-bold m-r-10'>基本信息</span>
                            <span className='line-b'><Link to='/app/member/edit'>编辑会员卡</Link></span>
                        </div>
                        <Row className='h-80'>
                            <Col span={2} className='txt-right'>会员卡模板：</Col>
                            <Col span={10}>
                                <span className='line-b h-200 w-350 b-r-5 theme p-10 pos-r'>
                                    <div className='pull-left w-full flex-row'>
                                        <span className='row-0 b-c-gray-1 logo'>
                                            Logo
                                        </span>
                                        <span className='row-1 txt-c-white l-h-30 p-l-10'>
                                            <span className='line-b w-full txt-overflow'>{ memCard.storeName }</span>
                                            <span className='line-b w-full txt-overflow'>{ memCard.title }</span>
                                        </span>
                                    </div>
                                    <div className='l-h-30 pos-ab b-10 l-10 r-0'>
                                        <span className='line-b m-r-10'>卡号</span>
                                        <span className='line-b txt-bold'>{ memCard.cardNo }</span>
                                    </div>
                                    <div className='clear'></div>
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2} className='txt-right'>店铺名称：</Col>
                            <Col span={6} className='txt-gray-1'>{ memCard.storeName }</Col>
                        </Row>
                        <Row>
                            <Col span={2} className='txt-right'>会员标题：</Col>
                            <Col span={5} className='txt-gray-1'>{ memCard.title || '--' }</Col>
                            <Col span={2} className='txt-right'>会员卡号：</Col>
                            <Col span={5} className='txt-gray-1'>{ memCard.cardNo || '--' }</Col>
                        </Row>
                        <Row>
                            <Col span={2} className='txt-right'>会员卡有效期：</Col>
                            <Col span={6} className='txt-gray-1'>{ this.transformType(memCard.expireType) || '--' }</Col>
                        </Row>
                        <Row className='h-80'>
                            <Col span={2} className='txt-right'>特权说明：</Col>
                            <Col span={10} className='h-full scroll-y txt-gray-1'>
                                { memCard.privilege || '--' }
                            </Col>
                        </Row>
                        <Row className='h-80'>
                            <Col span={2} className='txt-right'>使用须知：</Col>
                            <Col span={10} className='h-full scroll-y txt-gray-1'>
                                { memCard.notice || '--' }
                            </Col>
                        </Row>
                    </div>
                    <div className='p-10 b-c-white b-r-5 l-h-30'>
                        <div className='txt-bold'>功能信息</div>
                        <Row>
                            <Col span={2} className='txt-right'>激活条件：</Col>
                            <Col span={6} className='txt-gray-1'>
                                { memCard.activeType == '1' ? '普通激活' : '付费激活' }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={2} className='txt-right'>会员资料：</Col>
                            <Col span={10}>
                                <div className='l-h-30'>
                                    <span className='line-b pull-left'>信息名称</span>
                                    <span className='line-b pull-left'>启用</span>
                                    <span className='line-b pull-left'>可修改</span>
                                    <span className='clear'></span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default MemCard;