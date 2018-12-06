import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Select } from 'antd';

/** 
 * 引入自定义组件
*/
import CusDate from './tabs';

@connect(({ statistics }) => ({ statistics }))
class Top extends Component {
    render() {
        return (
            <Fragment>
                <Row className='p-10 b-c-white b-r-5'>
                    <Col span={3}>
                        <Select className='w-full' defaultValue='0' placeholder='请选择门店'>
                            <Select.Option value='0'>全部门店</Select.Option>
                        </Select>
                    </Col>
                    <Col span={12} offset={9}>
                        <CusDate />
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Top;