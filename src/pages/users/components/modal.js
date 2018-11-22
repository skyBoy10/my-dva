import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select, Cascader, Button } from 'antd';

const { Option } = Select;

@connect(({ user, loading }) => ({ user, loading }))
class modal extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/getAllRoles',
            data: ''
        });
        dispatch({
            type: 'user/getAllDeps',
            data: ''
        });
    }

    /** 
     * 表单提交
    */
    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, vals) => {
            if(!err) {
                dispatch({
                    type: 'user/addUser',
                    data: {
                        name: vals.name,
                        gender: vals.gender,
                        age: vals.age,
                        phone: vals.phone,
                        position: '',
                        role: ''
                    },
                })
            }
        })
    }

    /** 
     * 取消
    */
    handleCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/switchModal',
            data: {
                isShow: false,
                isEdit: false
            }
        });
    }

    /** 
     * 清除表单
    */
    clearField = () => {
        const { form } = this.props;
        form.resetFields();
    }

    /** 
     * 转换数据格式
    */
    formatDeps = () => {
        const { user } = this.props;
        const { departs } = user;
        const result = [];

        if(departs.length > 0) {
            for(let i = 0; i < departs.length; i++) {
                const item = {
                    value: departs[i].id,
                    label: departs[i].name,
                    children: []
                };
                
                if(departs[i].children && departs[i].children.length > 0) {
                    for(let j = 0; j < departs[i].children.length; j++) {
                        item.children.push({
                            value: departs[i].children[j].id,
                            label: departs[i].children[j].name,
                        });
                    }
                }

                result.push(item);
            }
        }

        return result;
    }

    /** 
     * 获取初始化数据
    */
    getInitData = () => {
        const { dispatch, form, user } = this.props;

        if(user.isEdit) {
            const currentUser = user.currentUser;
            return {
                ...currentUser,
                position: [],
            };
        }

        return {
            name: '',
            age: '',
            gender: '1',
            phone: '',
            position: [],
            role: ''
        };
    }

    render() {
        const { user, loading, form } = this.props;
        const { getFieldDecorator } = form;
        const confirmLoading = loading.effects['user/addUser'];
        const title = user.isEdit ? '用户编辑' : '新增用户';
        const FormItem = Form.Item;
        const userDetail = this.getInitData();
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
        );

        return (
            <Modal
            afterClose={this.clearField}
            title={title}
            cancelText={'取消'}
            okText={'保存'}
            visible={user.isShow}
            onCancel={this.handleCancel}
            onOk={this.handleSubmit}
            width={600}
            footer = {[
                <div className='txt-center'>
                <Button type='default' onClick={this.handleCancel}>取 消</Button>
                <Button type='primary' loading={confirmLoading} htmlType='submit' onClick={this.handleSubmit}>保 存</Button>
                </div>
            ]}
            confirmLoading={confirmLoading}>
                <Form>
                    <FormItem
                    {...formItemLayout}
                    label="姓名"
                    hasFeedback
                    >
                        {
                            getFieldDecorator('name', {
                                initialValue: userDetail.name,
                                rules: [{
                                    required: true, message: '请输入姓名！'
                                }]
                            })(
                                <Input type='text' placeholder='输入姓名' />
                            )
                        }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="性别"
                    hasFeedback
                    >
                        {
                            getFieldDecorator('gender', {
                                initialValue: userDetail.gender,
                                rules: [{
                                    required: true, message: '请选择性别！'
                                }]
                            })(
                                <Select>
                                    <Option key='1' value='1'>男</Option>
                                    <Option key='2' value='2'>女</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="年龄"
                    hasFeedback
                    >
                        {
                            getFieldDecorator('age', {
                                initialValue: userDetail.age,
                                rules: [{
                                    required: true, message: '请选择性别！'
                                }]
                            })(
                                <Input type='number' placeholder='输入年龄' />
                            )
                        }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="手机号"
                    hasFeedback
                    >
                        {
                            getFieldDecorator('phone', {
                                initialValue: userDetail.phone ,
                                rules: [{
                                    required: true, message: '请填写手机号！'
                                }]
                            })(
                                <Input addonBefore={prefixSelector} placeholder='例如，1378150' />
                            )
                        }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="职位"
                    hasFeedback
                    >
                        {
                            getFieldDecorator('position', {
                                initialValue: userDetail.position,
                                rules: [{
                                    required: true, message: '请选择职位！'
                                }]
                            })(
                                <Cascader placeholder='请选择职位' options={this.formatDeps()} />
                            )
                        }
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="角色"
                    hasFeedback
                    >
                        {
                            getFieldDecorator('role', {
                                initialValue: userDetail.role,
                                rules: [{
                                    required: true, message: '请选择角色'
                                }]
                            })(
                                <Select placeholder='请选择角色'>
                                    {
                                        user.roles.map(role => {
                                            return (<Option key={role.id}>{role.name}</Option>);
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(modal);