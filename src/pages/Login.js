import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Icon, Button, Input } from 'antd';

/** 
 * 自定义样式
*/
import './login.less';

class login extends Component {
    handleSubmit = (e) => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, vals) => {
            if(err) {
                return;
            }

            const param = {
                username: vals.username,
                password: vals.password
            };
            dispatch({type: 'login/login', data: param});
            dispatch({type: 'base/listenAction', data: ''});
        })
    }
    render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='login-form h-full'>
                <span className='item w-500 box-1 b-r-5'>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={16} offset={4} className='txt-center'>
                            <div className='h-50 l-h-50'>
                                <span className='title'>小天地</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={4}>
                            <FormItem>
                                {
                                    getFieldDecorator('username', {
                                        rules: [{ required: true, message: '请输入用户名！' }],
                                        hasFeedback: true,
                                        validateStatus: 'success'
                                    })(<Input type='text' prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='用户名' />)
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={4}>
                            <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码！' }],
                                    hasFeedback: true,
                                    validateStatus: 'success'
                                })(<Input type='password' prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder='密码' />)
                            }
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={4} className='txt-center'>
                            <Button loading={this.props.isLoading} type='primary' htmlType='submit' className='w-7'>登 录</Button>
                        </Col>
                    </Row>
                </Form>
                </span>
            </div>
        );
    };
}

export default connect(({ login, loading }) => ({
    login: login,
    isLoading: loading.effects['login/login']
}))(Form.create()(login));
