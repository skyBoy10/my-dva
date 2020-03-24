import React, { Component } from 'react';
import { connect } from 'dva';
import CusUpload from '../../../components/uploadFile'
import { Form, Row, Input, Radio, Col, Button, Upload, Icon } from 'antd';

import './roomType.edit.less';

@connect(({ loading, roomTypeModel }) => ({ loading, roomTypeModel }))
class RoomTypeEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.source = {
            deposit: 0
        }
    }

    /** 
     * 提交表单
    */
    updateRoomType = (e) => {
        e.preventDefault();
        const { form, dispatch, history } = this.props;
        this.setState({ isLoading: true });
       
        form.validateFields((err, vals) => {
            if(!err) {
                dispatch({
                    type: 'roomTypeModel/updateRoomType',
                    data: {
                        name: vals.roomTypeName,
                        rackRate: vals.roomPrice,
                        roomArea: vals.roomArea,
                        checkinNum: vals.availabePersons,
                        payType: vals.payType,
                        deposit: vals.isNeedDeposit ? this.source['deposit'] : 0,
                        isNeedDeposit: vals.isNeedDeposit,
                        roomImgs: vals.roomImgs,
                        facilities: vals.facilities,
                        info: vals.info,
                    }
                }).then(res => {
                    this.setState({ isLoading: false });
                    history.push('/app/business/roomTypes')
                })
            } else {
                this.setState({ isLoading: false });
            }
        });
    }

    /** 
     * 格式上传文件
    */
    formatFIles = e => {
        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }

    /** 
     * 校验上传文件
    */
    validateFiles = (rule, val, callback) =>{
        // callback必须被调用
    }

    /**
     * 获取表单其他的值
     */
    getFormOtherFields = (key, e) => {
        if(e && e.target) {
            this.source[key] = e.target.value;
        }
    }

    /**
     * 上传文件回调
     */
    uploadFiles = (res) => {
        console.log(res);
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { isLoading } = this.state;
        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return (
            <div className='room-type-edit'>
                <Form name='roomType'>
                    <div className='room-type-title'>基本信息</div>
                    <FormItem
                    {...formItemLayout}
                    label='房型名称'
                    >
                        <Col span={10}>
                        {
                            getFieldDecorator('roomTypeName', {
                                rules: [
                                    {required: true, message: '必填项！'},
                                    {max: 20, message: '长度不超过20个字符！'},
                                    {whitespace: true}
                                ]
                            })(
                                <Input type='text' placeholder='不超过20个字符' />
                            )
                        }
                        </Col>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label='门市价'
                    >
                        <Col span={8}>
                        {
                            getFieldDecorator('roomPrice', {
                                rules: [
                                    {required: true, message: '必填项'},
                                    {whitespace: true}
                                ]
                            })(
                                <Input type='number' addonAfter={<span>元</span>} placeholder='填入大于0的数字' />
                            )
                        }
                        </Col>
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label='预设押金'
                    >
                        <Row>
                        <Col span={6}>
                        {
                            getFieldDecorator('isNeedDeposit', {
                                rules: [
                                    {required: true, message: '必填项！'},
                                ],
                                initialValue: 0
                            })(
                                <Radio.Group name='deposit'>
                                    <Radio value={0}>不需要</Radio>
                                    <Radio value={1}>需要</Radio>
                                </Radio.Group>
                            )
                        }
                        </Col>
                        <Col span={6}>
                            <Input className='inpt-fix' 
                            type='text' addonAfter={<span>元</span>} 
                            placeholder='请输入金额' 
                            onChange={this.getFormOtherFields.bind(this, 'deposit')} />
                        </Col>
                        </Row>
                    </FormItem>         
                    <FormItem
                    {...formItemLayout}
                    label='付费方式'
                    >
                        {
                            getFieldDecorator('payType', {
                                initialValue: 1,
                            })(
                                <Radio.Group name='payType'>
                                    <Radio value={1}>预订支付</Radio>
                                    <Radio value={2}>前台支付</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>  
                    <FormItem
                    {...formItemLayout}
                    label='房间面积'
                    >
                        <Col span={8}>
                        {
                            getFieldDecorator('roomArea', {
                                rules: [
                                    {required: true, message: '必填项'},
                                    {whitespace: true}
                                ]
                            })(
                                <Input type='text' addonAfter={<span>平方米</span>} placeholder='输入数字' />
                            )
                        }
                        </Col>
                    </FormItem>                    
                    <FormItem
                    {...formItemLayout}
                    label='可住人数'
                    >
                        <Col span={8}>
                        {
                            getFieldDecorator('availabePersons', {
                                rules: [
                                    {required: true, message: '必填项'},
                                ]
                            })(
                                <Input type='text' addonAfter={<span>人</span>} placeholder='入住人数' />
                            )
                        }
                        </Col>
                    </FormItem>
                    <div className='room-type-title'>展示信息</div>
                    <FormItem
                    {...formItemLayout}
                    label='房间图片'
                    >
                        {
                            getFieldDecorator('roomImgs', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.formatFIles,
                            })(
                                <Upload name='imgs' 
                                headers={{
                                    Authorization: localStorage.getItem('_auth_token_')
                                }}
                                name='file'
                                action={`http://10.88.201.253:3010/common/upload`} 
                                listType='picture-card'
                                onChange={this.uploadFiles}>
                                    <Button>
                                        <Icon type='upload' />上传
                                    </Button>
                                </Upload>
                            )
                        }
                    </FormItem> 
                    <FormItem
                    {...formItemLayout}
                    label='房型介绍'
                    >
                        {
                            getFieldDecorator('info', {
                                rules: [
                                    { max: 100, message: '字符长度不超过200！' }
                                ]
                            })(
                                <Input.TextArea rows={4} placeholder='字符长度不超过200' />
                            )
                        }
                    </FormItem> 
                    <FormItem
                    {...formItemLayout}
                    label='配套服务'
                    >
                        {
                            getFieldDecorator('facilities', {
                            })(
                                <Button type='default' >添加设备</Button>
                            )
                        }
                    </FormItem>
                    <div className='room-type-foot'>
                        <Button loading={isLoading}  className='btn' type='primary' onClick={this.updateRoomType}>提交</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Form.create()(RoomTypeEdit);