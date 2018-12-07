import React, { PureComponent, Fragment } from 'react';
import { Input, Row, Col, Select, Button, Icon, DatePicker, Form } from 'antd';
import moment from 'moment';

/** 
 * 引入自定义样式
*/
import '../member.less';

class CusSearch extends PureComponent {
    /** 
     * 切换条件
    */
    switchCon = () => {
        const { dispatch, isShowMore } = this.props;

        dispatch({
            type: 'member/toggleCon',
            data: !isShowMore,
        });
    }

    /** 
     * 渲染更多条件
    */
    renderMore = () => {
        const { RangePicker } = DatePicker;
        const { Option } = Select;
        const format = 'YYYY/MM/DD';
        const local = {
            lang: {
                rangePlaceholder: ['起始日期','截至日期']
            }
        };

        return (
            <Fragment>
                <Row className='m-b-10 m-t-10'>
                    <Col span={2} className='txt-right'>开卡时间：</Col>
                    <Col span={6}>
                        <RangePicker format={format} local={local} />
                    </Col>
                    <Col span={2} className='txt-right'>性别：</Col>
                    <Col span={2}>
                        <Select defaultValue='' className='w-100'>
                            <Option value=''>全部</Option>
                            <Option value='1'>男</Option>
                            <Option value='2'>女</Option>
                        </Select>
                    </Col>
                    <Col span={2} className='txt-right'>年龄：</Col>
                    <Col span={2}>
                        <Select defaultValue='' className='w-100'>
                            <Option value=''>不限</Option>
                            <Option value='1'>小于18</Option>
                            <Option value='2'>18 ~ 25</Option>
                            <Option value='3'>25 ~ 35</Option>
                            <Option value='4'>35 ~ 50</Option>
                            <Option value='5'>50以上</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>上次交易时间：</Col>
                    <Col span={3}>
                        <Select defaultValue='' className='w-full'>
                            <Option value=''>全部</Option>
                            <Option value='1'>最近一周</Option>
                            <Option value='2'>最近一个月</Option>
                            <Option value='3'>最近三个月</Option>
                            <Option value='4'>最近六个月</Option>
                        </Select>
                    </Col>
                </Row>
            </Fragment>
        );
    }

    /** 
     * 表单提交
    */
    handleSubmit = e => {
        e.stopPropagation();

    }

    render() {
        const { isShowMore, searchParam, form } = this.props;
        const InputGroup = Input.Group;
        const { Option, OptGroup } = Select;
        const { getFieldDecorator } = form;
        const FormItem = Form.Item;
        moment.locale('zh-cn');

        return (
            <div className='p-10 l-h-30'>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={8}>
                            <InputGroup compact>
                                <FormItem>
                                {
                                    getFieldDecorator('keyType', {
                                        initialValue: searchParam.keyType,
                                    })(
                                        <Select style={{ minWidth: '60px' }}>
                                            <Option value="1">客户姓名</Option>
                                            <Option value="2">会员卡号</Option>
                                            <Option value="3">手机号</Option>
                                        </Select>
                                    )
                                }
                                </FormItem>
                                <FormItem>
                                {
                                    getFieldDecorator('keyword', {
                                        initialValue: searchParam.keyword,
                                    })(
                                        <Input style={{ width: '70%' }} placeholder='请输入关键词' />
                                    )
                                }
                                </FormItem>
                            </InputGroup>
                        </Col>
                        <Col span={2} className='txt-right'>会员等级：</Col>
                        <Col span={2}>
                            <Select defaultValue='' className='w-100'>
                                <Option value=''>全部</Option>
                                <Option value='1'>钻石</Option>
                                <Option value='2'>黄金</Option>
                            </Select>
                        </Col>
                        <Col span={2} className='txt-right'>标签：</Col>
                        <Col span={7}>
                            <Select defaultValue='' className='w-100'>
                                <Option value=''>全部</Option>
                                <OptGroup label='大众标签'>
                                    <Option value='100'>富二代</Option>
                                    <Option value='101'>星二代</Option>
                                    <Option value='102'>官二代</Option>
                                </OptGroup>
                                <OptGroup label='个性标签'>
                                    <Option value='200'>有钱</Option>
                                    <Option value='201'>看重优惠</Option>
                                </OptGroup>
                            </Select>
                            <a className='more pull-right' onClick={this.switchCon}>
                                <span className='m-r-5'>{ isShowMore ? '收起' : '更多' }</span>
                                <Icon type={ isShowMore ? 'up' : 'down' } />
                            </a>
                            <Button type='default pull-right m-r-20'>重置</Button>
                            <Button type='primary' className='m-r-20 pull-right'>查询</Button>
                        </Col>
                    </Row>
                    {
                        isShowMore ? this.renderMore() : ''
                    }
                </Form>
            </div>
        );
    }
};

export default Form.create()(CusSearch);