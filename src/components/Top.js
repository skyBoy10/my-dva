import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';

/** 
 * 自定义样式
*/
import './top.less';

class top extends Component {
    logout = () => {
        this.props.dispatch({type: 'base/logout', data: ''});
    }
    render() {
        const { Header } = Layout;
        const { currentUser } = this.props.base;
        
        return (
            <Header className='b-c-white-1 p-lr-10 top'>
                <Row>
                    <Col span={4}>
                        <span className='title'>小天地管理平台</span>
                    </Col>
                    <Col span={3} push={15} className='txt-right txt-overflow'>
                        欢迎您，{currentUser.username}
                    </Col>
                    <Col span={1} push={15} className='txt-right'>
                        <a href='javascript:void(0);' onClick={this.logout}>[退出]</a>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default connect(({ tree, base, loading }) => ({ tree, base, loading }))(top);