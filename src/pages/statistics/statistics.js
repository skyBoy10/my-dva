import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs } from 'antd';

/** 
 * 引入自定义样式
*/
import './statistics.less';

/** 
 * 引入自定义组件
*/
import CusReport from './components/cusReport';
import Overview from './components/total';
import Top from './components/top';
import List from './components/list';

@connect(({ statistics, loading }) => ({ statistics, loading }))
class statistics extends Component {
    componentDidMount() {
        const { dispatch, statistics } = this.props;

        dispatch({
            type: 'statistics/getReportData',
            data: {
                startDate: statistics.startDate,
                endDate: statistics.endDate,
            }
        });
    }
    /** 
     * tab切换
    */
    changeTag = () => {

    }

    render() {
        const { TabPane } =  Tabs;
        
        return (
            <div className='p-10 pos-ab t-0 b-0 l-0 r-0 statistics'>
                <div className='h-full pos-r'>
                    <Top />
                    <div className='pos-ab t-62 b-0 l-0 r-0 scroll-y'>
                        <Row>
                            <Col className='h-full' span={24}>
                                <div className='m-b-10 b-c-white b-r-5 p-lr-10 p-t-10'>
                                    <Overview />
                                </div>
                                <div className='m-b-10 b-c-white b-r-5 p-lr-10 p-t-10'>
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
                                                        <Col span={12}>
                                                            <CusReport type='2' />
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane tab='线下营收' key='2'>
                                                    <Row>
                                                        <Col span={12}>
                                                            <CusReport type='3' />
                                                        </Col>
                                                        <Col span={12}>
                                                            <CusReport type='2' />
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane tab='营收比对' key='3'>
                                                    <Row>
                                                        <Col span={12}>
                                                            <CusReport type='5' />
                                                        </Col>
                                                        <Col span={12}>
                                                            <CusReport type='4' />
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                </div>
                                <div  className='b-c-white b-r-5 p-lr-10 p-t-10'>
                                    <Row>
                                        <Col className='txt-bold m-b-10'>数据列表</Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <List />
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

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'statistics/resetStore',
            data: ''
        });
    }
}

export default statistics;