import React, { PureComponent, Fragment } from 'react';
import { Input, Row, Col, Select, Button, Icon, DatePicker, Form } from 'antd';
import moment from 'moment';

/** 
 * 引入自定义样式
*/
import '../member.less';

class CusSearch extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        
        dispatch({
            type: 'memList/getLevelAndLabel',
            data: {
                isAll: true,
            },
        });
    }

    /** 
     * 切换条件
    */
    switchCon = () => {
        const { dispatch, isShowMore } = this.props;

        dispatch({
            type: 'memList/toggleCon',
            data: !isShowMore,
        });
    }

    /** 
     * 渲染更多条件
    */
    renderMore = () => {
        const { form, searchParam } = this.props;
        const { RangePicker } = DatePicker;
        const { Option } = Select;
        const { getFieldDecorator } = form;
        const FormItem = Form.Item;
        const format = 'YYYY/MM/DD';
        const local = {
            lang: {
                rangePlaceholder: ['起始日期','截至日期']
            }
        };

        return (
            <Fragment>
                <Row className='m-b-10 m-t-10'>
                    <Col span={2} className='txt-right l-h-40'>开卡时间：</Col>
                    <Col span={6}>
                        <FormItem style={{ margin: 0 }}>
                            {
                                getFieldDecorator('card', {
                                    initialValue: '',
                                })(
                                    <RangePicker placeholder={['起始日期', '截至日期']} format={format} local={local} />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={2} className='txt-right l-h-40'>性别：</Col>
                    <Col span={2}>
                        <FormItem style={{ margin: 0 }}>
                            {
                                getFieldDecorator('gender', {
                                    initialValue: searchParam.gender
                                })(
                                    <Select className='w-100'>
                                        <Option value=''>全部</Option>
                                        <Option value='1'>男</Option>
                                        <Option value='2'>女</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={2} className='txt-right l-h-40'>年龄：</Col>
                    <Col span={2}>
                        <FormItem style={{ margin: 0 }}>
                            {
                                getFieldDecorator('ageType', {
                                    initialValue: searchParam.ageType,
                                })(
                                    <Select className='w-100'>
                                        <Option value=''>不限</Option>
                                        <Option value='1'>小于18</Option>
                                        <Option value='2'>18 ~ 25</Option>
                                        <Option value='3'>25 ~ 35</Option>
                                        <Option value='4'>35 ~ 50</Option>
                                        <Option value='5'>50以上</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={2} className='l-h-40 txt-right'>上次交易时间：</Col>
                    <Col span={3}>
                        <FormItem style={{ margin: 0 }}>
                            {
                                getFieldDecorator('recordDateType', {
                                    initialValue: searchParam.recordDateType,
                                })(
                                    <Select className='w-full'>
                                        <Option value=''>全部</Option>
                                        <Option value='1'>最近一周</Option>
                                        <Option value='2'>最近一个月</Option>
                                        <Option value='3'>最近三个月</Option>
                                        <Option value='4'>最近六个月</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
            </Fragment>
        );
    }

    /** 
     * 表单提交
    */
    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch, pageSize } = this.props;
        const vals = form.getFieldsValue();
        
        dispatch({
            type:'memList/getMemList',
            data: {
                ...vals,
                pageSize,
                pageIndex: 1,
            },
        });
    }

    /** 
     * 对标签进行分组
    */
    groupLabels = list => {
        const arrs = [
            {
                id: '1000',
                name: '大众标签',
                children: [],
            },
            {
                id: '2000',
                name: '个性标签',
                children: [],
            }
        ];

        if(list && list.length > 0) {
            for(let i = 0; i < list.length; i++) {
                if(list[i].type == 1) {
                    arrs[0].children.push(list[i]);
                }
                else {
                    arrs[1].children.push(list[i]);
                }
            }
        }

        return arrs;
    }

    render() {
        const { isShowMore, searchParam, form, labels, levels } = this.props;
        const InputGroup = Input.Group;
        const { Option, OptGroup } = Select;
        const { getFieldDecorator } = form;
        const FormItem = Form.Item;
        const labelOpts = this.groupLabels(labels);
        moment.locale('zh-cn');

        return (
            <div className='p-10 l-h-40'>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={8}>
                            <InputGroup compact>
                                <FormItem style={{ margin: 0 }}>
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
                                <FormItem style={{ margin: 0 }}>
                                {
                                    getFieldDecorator('keyword', {
                                        initialValue: searchParam.keyword,
                                    })(
                                        <Input style={{ minWidth: '260px' }} placeholder='请输入关键词' />
                                    )
                                }
                                </FormItem>
                            </InputGroup>
                        </Col>
                        <Col span={2} className='txt-right l-h-40'>会员等级：</Col>
                        <Col span={2}>
                            <FormItem style={{ margin: 0 }}>
                                {
                                    getFieldDecorator('levelId', {
                                        initialValue: searchParam.levelId
                                    })(
                                        <Select className='w-100'>
                                            <Option value=''>全部</Option>
                                            {
                                                levels.map(level => {
                                                    return (
                                                        <Option key={level.id}>{level.name || '--'}</Option>
                                                    );
                                                })
                                            }
                                        </Select>
                                    )
                                }    
                            </FormItem>
                        </Col>
                        <Col span={2} className='txt-right l-h-40'>标签：</Col>
                        <Col span={7}>
                            <FormItem style={{ margin: 0, width: 100, display: 'inline-block' }}>
                                {
                                    getFieldDecorator('labelId', {
                                        initialValue: searchParam.labelId
                                    })(
                                        <Select className='w-100'>
                                            <Option value=''>全部</Option>
                                            {
                                                labelOpts.map(label => {
                                                    return (
                                                        <OptGroup key={label.id} label={label.name || '--'}>
                                                            {
                                                                label.children.map(item => {
                                                                    return (<Option key={item.id} value={item.id}>
                                                                        {item.name || '--'}
                                                                    </Option>);
                                                                })
                                                            }
                                                        </OptGroup>
                                                    );
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                            <a className='more pull-right l-h-40' onClick={this.switchCon}>
                                <span className='m-r-5'>{ isShowMore ? '收起' : '更多' }</span>
                                <Icon type={ isShowMore ? 'up' : 'down' } />
                            </a>
                            <Button type='default' className='pull-right m-r-20 m-t-5'>重置</Button>
                            <Button type='primary' htmlType='submit' className='m-r-20 pull-right m-t-5'>查询</Button>
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