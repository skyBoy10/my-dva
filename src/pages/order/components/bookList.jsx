import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Form, DatePicker, Input, Pagination, Spin } from 'antd';
import moment from 'moment';

/** 
 * 引入自定义样式
*/
import './bookList.less';

/** 
 * 引入自定义工具
*/
import { formatMoney } from '../../../utils/tools';

const SearchForm = props => {
    const { form } = props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    const { RangePicker } = DatePicker;
    moment.locale('zh-cn');
    const local = {
        'rangePlaceholder': ['起始日期', '截止日期']
    }
    const defaultParam = {
        dateType: '1',
        startDate: moment().format('YYYY/MM/DD'),
        endDate: moment().add(7, 'days').format('YYYY-MM-DD'),
        roomType: '',
        orderState: '',
        keywords: '',
    };

    const search = e => {
        e && e.preventDefault();
        let vals = form.getFieldsValue();
    }

    return (
        <div className='search'>
            <Form onSubmit={search}>
                <span className='leftItem'>
                    <FormItem>
                        {
                            getFieldDecorator('dateType', {
                                initialValue: defaultParam.dateType
                            })(
                                <Select className='cusSelect'>
                                    <Select.Option value='1'>入住时间</Select.Option>
                                    <Select.Option value='2'>离店时间</Select.Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </span>
                <span className='leftItem'>
                    <FormItem>
                        {
                            getFieldDecorator('dataRange', {
                                initialValue: [moment(defaultParam.startDate), moment(defaultParam.endDate)]
                            })(
                                <RangePicker allowClear={false} locale={local} />
                            )
                        }
                    </FormItem>
                </span>
                <span className='rightItem'>
                    <FormItem>
                        {
                            getFieldDecorator('keywords', {
                                initialValue: defaultParam.keywords
                            })(
                                <Input.Search type='text' placeholder='房客姓名/手机号/订单号' onSearch={search} />
                            )
                        }
                    </FormItem>
                </span>
                <span className='rightItem'>
                    <FormItem>
                        {
                            getFieldDecorator('orderState', {
                                initialValue: defaultParam.orderState,
                            })(
                                <Select className='cusSelect'>
                                    <Select.Option value=''>全部状态</Select.Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </span>
                <span className='rightItem'>
                    <FormItem>
                        {
                            getFieldDecorator('roomType', {
                                initialValue: defaultParam.roomType,
                            })(
                                <Select className='cusSelect'>
                                    <Select.Option value=''>全部房型</Select.Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </span>
                <span className='clear' />
            </Form>
        </div>
    );
}

const ListItem = props => {
    const { order, index } = props;

    return (
        <div className='listItem' style={(index % 2) ? {} : { backgroundColor: '#f5f5f5' }}>
            <span className='item w-1-5 fir'>{order.orderNo || '--'}</span>
            <span className='item w-1'>{order.roomType || '--'}</span>
            <span className='item w-1'>{order.name || '--'}</span>
            <span className='item w-1'>{order.phone || '--'}</span>
            <span className='item w-1'>{order.checkInDate || '--'}</span>
            <span className='item w-1'>{order.checkOutDate || '--'}</span>
            <span className='item w-1'>{formatMoney(order.payedFee, 1, 2) || '--'}</span>
            <span className='item w-1'>{order.status || '--'}</span>
            <span className='item w-1-5'>
                <a className='m-r-10'>查看详情</a>
                <a className='m-r-10'>确认预定</a>
                <a>拒绝</a>
            </span>
            <span className='clear'></span>
        </div>
    );
}

@connect(({ loading, bookModel }) => ({ loading, bookModel }))
class BookList extends PureComponent {
    componentDidMount() {
        const { bookModel } = this.props;
        const { pageNo, pageSize } = bookModel;

        this.getList({
            pageIndex: pageNo,
            pageSize,
        });
    }

    /** 
     * 获取列表
    */
    getList = param => {
        const { dispatch } = this.props;

        dispatch({
            type: 'bookModel/getList',
            data: param,
        });
    }

    /** 
     * 渲染列表
    */
    renderList = list => {
        const noData = (<div className='pos-ab w-full h-full'><div className='noData'>暂无数据</div></div>);
        const loadingEle = (<div className='pos-ab w-full h-full'><div className='loading'><Spin tip='加载中...' /></div></div>);
        const { loading } = this.props;

        const isLoading =  loading.effects['bookModel/getList'];

        return isLoading ? loadingEle : 
        (list && list.length > 0 ? list.map((order, index) => <ListItem key={order.id} order={order} index={index} />) : noData);
    }

    render() {
        const { form, bookModel } = this.props;
        const pageConfig = {
            total: bookModel.total,
            defaultCurrent: 1,
            defaultPageSize: bookModel.pageSize,
            showTotal: total => {
                const totalPage = Math.ceil(total / bookModel.pageSize);

                return (
                    <div>
                        <span className='currentPage'>{bookModel.pageNo}</span>
                        <span className='split'>/</span>
                        <span>{totalPage}</span>
                    </div>
                );
            },
            onChange: (page, pageSize) => {
                this.getList({
                    pageIndex: page,
                    pageSize: bookModel.pageSize
                });
            }
        };
        
        return (
            <div className='bookList'>
                <div className='item_0 m-b-10'><SearchForm form={form} /></div>
                <div className='item_1 flex-col list'>
                    <div className='item_0'>
                        <div className='listHead'>
                            <span className='item w-1-5 fir'>订单编号</span>
                            <span className='item w-1'>房型</span>
                            <span className='item w-1'>住宿人</span>
                            <span className='item w-1'>手机号</span>
                            <span className='item w-1'>入住日期</span>
                            <span className='item w-1'>离店日期</span>
                            <span className='item w-1'>实付金额</span>
                            <span className='item w-1'>状态</span>
                            <span className='item w-1-5'>操作</span>
                            <span className='clear'></span>
                        </div>
                    </div>
                    <div className='item_1 listBody pos-r'>
                        {this.renderList(bookModel.list)}
                    </div>
                    <div className='item_0 pagination'>
                        <Pagination 
                        {...pageConfig}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(BookList);