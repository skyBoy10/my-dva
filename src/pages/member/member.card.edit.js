import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Steps, Breadcrumb, Icon, Input, Upload, Button,
    Radio,
    Form, 
    DatePicker,
    Tag } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

/** 
 * 引入自定义样式
*/
import './member.less';

/** 
 * 颜色
*/
const ColorItem = props => {
    const { color, select, selectColor } = props;

    return (
        <span className='colorItem' style={selectColor === color ? { borderColor: color } : 
        { borderColor: 'whitesmoke' }} onClick={select}>
            <Tag className='con' color={color}></Tag>
        </span>
    );
}

@connect(({ memCard, loading }) => ({ memCard, loading }))
class CardEdit extends PureComponent {
    /** 
     * 上传文件调用
    */
    uploadFile = info => {
        console.log(info);
    }

    /** 
     * 卡号生成规则改变
    */
    cardNoGroupChange = e => {
        const { dispatch } = this.props;

        if(e) {
            dispatch({
                type: 'memCard/updateState',
                data: {
                    cardType: e.target.value
                }
            });
        }
    }

    /** 
     * 有效期改变
    */
    expireDateHandle = e => {
        const { form, dispatch } = this.props;

        if(e) {
            dispatch({
                type: 'memCard/updateState',
                data: {
                    expireType: e.target.value
                }
            })
            form.setFieldsValue({ 'expireType': e.target.value });
        }
    }

    /** 
     * 表单第一步校验
    */
    handleFirstStep = () => {
        const { form } = this.props;

        form.validateFields((err, vals) => {
            if(!err) {
                console.log(vals);
            }
        });
    }

    /** 
     * 处理有效期区间改变
    */
    handleExpireChange = (date, dateStr) => {
        console.log(date);
    }

    /** 
     * 处理选中的颜色
    */
    handleSelectColor = (color, e) => {
        const { dispatch, form } = this.props;
        
        dispatch({
            type: 'memCard/updateState',
            data: {
                themeColor: color,
            },
        })
        form.setFieldsValue({'color': color})
    }

    render() {
        const { form, memCard } = this.props;
        const { Step } = Steps;
        const RadioGroup = Radio.Group;
        const { getFieldDecorator } = form;
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
        const { RangePicker } = DatePicker;
        const colorList = ['#f46e65', '#2db7f5', '#87d068', '#108ee9', '#948aec', '#3db8c1', '#ffce3d'];

        return (
            <div className='h-full b-c-white pos-r'>
                <div className='p-10'>
                    <Breadcrumb separator='/'>
                        <Breadcrumb.Item>
                            <Link to='/app/member/card'>会员卡配置</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className='txt-bold'>
                            会员卡编辑
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Row className='p-10'>
                    <Col span={14} offset={5}>
                        <Steps size='small' current={0}>
                            <Step title='填写会员卡'></Step>
                            <Step title='设置会员卡功能'></Step>
                        </Steps>
                    </Col>
                </Row>
                <div className='b-c-white b-r-5 pos-ab l-0 r-0 b-0 t-100 l-h-30 scroll-y'>
                    <div className='pos-r memCard'>
                        <Row className='m-b-10'>
                            <Col className='b-c-gray-2 l-h-30 p-lr-10'>
                                <Icon type='bars' className='m-r-10' />基本信息
                            </Col>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='店铺名称'
                            >
                                {
                                    getFieldDecorator('storeName', {
                                        rules: [{required: true, message: '必填项'},
                                        { max: 50, message: '字符串最大长度不超过50！' }],
                                        initialValue: memCard.storeName,
                                    })(
                                        <Input type='text' className='max-w-250' placeholder='不超过50个字符！' />
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='会员logo'
                            >
                                {
                                    getFieldDecorator('logo', {
                                        rules: [{required: true, message: '必填项'},],
                                        initialValue: memCard.logoUrl,
                                    })(
                                        <Fragment>
                                            <span className='line-b m-r-10'>
                                                <Upload name='file' action='' headers={{authorization: 'authorization-text'}}
                                                onChange={this.uploadFile}>
                                                    <Button type='default'>上传logo</Button>
                                                </Upload>
                                            </span>
                                            <span className='line-b txt-gray-1'>图片建议尺寸：500*300，大小不超过1M</span>
                                        </Fragment>
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='会员卡标题'
                            >
                                {
                                    getFieldDecorator('title', {
                                        rules: [{required: true, message: '必填项'},
                                        { max: 50, message: '字符串最大长度不超过50！' }],
                                        initialValue: memCard.title,
                                    })(
                                        <Input type='text' className='max-w-250' placeholder='不超过50个字符！' />
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='会员卡主题颜色'
                            >
                                {
                                    getFieldDecorator('color', {
                                        rules: [{required: true, message: '必填项'},],
                                        initialValue: memCard.themeColor,
                                        valuePropName: 'selectColor'
                                    })(
                                        <Fragment>
                                            {
                                                colorList.map(item => {
                                                    return (<ColorItem selectColor={memCard.themeColor} key={item} color={item} select={this.handleSelectColor.bind(this, item)} />);
                                                })
                                            }
                                            <div className='clear'></div>
                                        </Fragment>
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='会员卡号'
                            >
                                {
                                    getFieldDecorator('cardType', {
                                        rules: [{required: true, message: '必填项'},],
                                        initialValue: memCard.cardType,
                                    })(
                                        <RadioGroup onChange={this.cardNoGroupChange}>
                                            <div className='l-h-30'>
                                                <Radio value='1'>系统自定义生成</Radio>
                                                <span className='line-b m-l-10 txt-gray-1'>位数由系统生成</span>
                                            </div>
                                            <div>
                                                <Radio value='2'>自定义会员卡号</Radio>
                                                <span className='line-b m-l-10 w-200'>
                                                    <Input type='text' name='cardNo' placeholder='数字和字母组合，不超过12位' 
                                                        disabled={ memCard.cardType !== '2' }
                                                    />
                                                </span>
                                            </div>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='有效期'
                            >
                                {
                                    getFieldDecorator('expireType', {
                                        rules: [{required: true, message: '必填项'},],
                                        initialValue: memCard.expireType,
                                    })(
                                        <RadioGroup onChange={this.expireDateHandle}>
                                            <div><Radio value='1'>永久有效</Radio></div>
                                            <div>
                                                <Radio value='2'>指定日期</Radio>
                                                <span className='line-b m-l-10 w-350'>
                                                    <RangePicker placeholder={['起始日期', '截至日期']} onChange={this.handleExpireChange} 
                                                        disabled={ memCard.expireType !== '2' }
                                                    />
                                                </span>
                                            </div>
                                            <div>
                                                <Radio value='3'>固定时长</Radio>
                                                <span className='line-b m-l-10 w-100'>
                                                    <Input type='text' placeholder='数字' 
                                                    style={{ 'verticalAlign': 'middle' }} addonAfter="天" disabled={ memCard.expireType !== '3' }/>
                                                </span>
                                            </div>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row className='m-b-10'>
                            <Col className='b-c-gray-2 l-h-30 p-lr-10'>
                                <Icon type='bars' className='m-r-10' />会员卡详情
                            </Col>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='特权说明'
                            >
                                {
                                    getFieldDecorator('privilege', {
                                        rules: [
                                            { required: true, message: '必填项' },
                                            { max: 200, message: '字符最多不超过200' }
                                        ],
                                        initialValue: memCard.privilege,
                                    })(
                                        <Input.TextArea autosize={{ minRows: 3, maxRows: 5 }} placeholder='字符长度不超过200' />
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label='提示'
                            >
                                {
                                    getFieldDecorator('notice', {
                                        rules: [
                                            { max: 200, message: '字符最多不超过200' }
                                        ],
                                        initialValue: memCard.notice,
                                    })(
                                        <Input.TextArea autosize={{ minRows: 3, maxRows: 5 }} placeholder='字符长度不超过200' />
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row className='m-b-10'>
                            <Col span={10} offset={7} className='txt-center'>
                                <Button type='primary' className='min-w-150'>下一步</Button>
                            </Col>
                        </Row>
                        <div className='pos-ab r-10 t-100 p-10'>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(CardEdit);