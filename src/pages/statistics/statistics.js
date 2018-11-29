import React from 'react';
import { connect } from 'dva';
import { Select, Row, Col, Tabs } from 'antd';
import Base from '../base';

/** 
 * 引入自定义样式
*/
import './statistics.less';

/** 
 * 引入工具函数
*/
import { formatMoney } from '../../utils/tools';

/** 
 * 引入自定义组件
*/
import CusDate from './components/tabs';
import CusReport from './components/cusReport';

@connect(({ statistics, loading }) => ({ statistics, loading }))
class statistics extends Base {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'statistics/getTotalData',
            data: ''
        });
    }

    /** 
     * tab切换
    */
    changeTag = () => {

    }

    render() {
        const { TabPane } =  Tabs;
        const { statistics } = this.props;
        const { revenueFee, receivableFee, acceptedFee, totalFee } = statistics.overview
        console.log(statistics);

        return (
            <div className='p-10 pos-ab t-0 b-0 l-0 r-0 statistics'>
                <div className='h-full pos-r'>
                    <Row className='p-10 b-c-white b-r-5'>
                        <Col span={3}>
                            <Select className='w-full' placeholder='请选择门店'>
                                
                            </Select>
                        </Col>
                        <Col span={12} offset={9}>
                            <CusDate />
                        </Col>
                    </Row>
                    <div className='pos-ab p-10 t-62 b-0 l-0 r-0 b-c-white b-r-5 scroll-y'>
                        <Row>
                            <Col className='h-full' span={24}>
                                <div className='b-b m-b-20'>
                                    <Row>
                                        <Col className='txt-bold m-b-20'>数据总览</Col>
                                    </Row>
                                    <Row className='h-100'>
                                        <Col className='item' span={6}>
                                            <div className='l-h-40'>营收总额</div>
                                            <div className='l-h-60 txt-c-blue-1'>{formatMoney(revenueFee)}</div>
                                        </Col>
                                        <Col className='item' span={6}>
                                            <div className='l-h-40'>应收金额</div>
                                            <div className='l-h-60 txt-c-blue-1'>{formatMoney(receivableFee)}</div>
                                        </Col>
                                        <Col className='item' span={6}>
                                            <div className='l-h-40'>实收金额</div>
                                            <div className='l-h-60 txt-c-blue-1'>{formatMoney(acceptedFee)}</div>
                                        </Col>
                                        <Col className='h-full txt-center txt-s-17' span={6}>
                                            <div className='l-h-40'>累计盈利</div>
                                            <div className='l-h-60 txt-c-blue-1'>{formatMoney(totalFee)}</div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='b-b'>
                                    <Row>
                                        <Col className='txt-bold m-b-10'>数据报表</Col>
                                    </Row>
                                    <Row>
                                        <Col className='p-lr-10'>
                                            <Tabs defaultActiveKey='1' onChange={this.changeTag}>
                                                <TabPane tab='线上营收' key='1'>
                                                    <Row>
                                                        <Col span={12}>
                                                            <CusReport type='1' />
                                                        </Col>
                                                        <Col span={12}></Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane tab='线下营收' key='2'></TabPane>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default statistics;