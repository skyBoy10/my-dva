import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

/** 
 * 引入工具函数
*/
import { formatMoney } from '../../../utils/tools';

@connect(({ statistics }) => ({ statistics }))
class Overview extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'statistics/getTotalData',
            data: ''
        });
    }
    
    render() {
        const { statistics } = this.props;
        const { revenueFee, receivableFee, acceptedFee, totalFee } = statistics.overview;

        return (
            <Fragment>
                <Row>
                    <Col className='txt-bold m-b-20'>数据总览</Col>
                </Row>
                <Row className='h-100'>
                    <Col className='item' span={6}>
                        <div className='l-h-40'>营收总额</div>
                        <div className='l-h-60 txt-c-blue-1'>{formatMoney(revenueFee, 1, 2)}</div>
                    </Col>
                    <Col className='item' span={6}>
                        <div className='l-h-40'>应收金额</div>
                        <div className='l-h-60 txt-c-blue-1'>{formatMoney(receivableFee, 1, 2)}</div>
                    </Col>
                    <Col className='item' span={6}>
                        <div className='l-h-40'>实收金额</div>
                        <div className='l-h-60 txt-c-blue-1'>{formatMoney(acceptedFee, 1, 2)}</div>
                    </Col>
                    <Col className='h-full txt-center txt-s-17' span={6}>
                        <div className='l-h-40'>累计盈利</div>
                        <div className='l-h-60 txt-c-blue-1'>{formatMoney(totalFee, 1, 2)}</div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Overview;