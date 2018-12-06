import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Pagination, Spin } from 'antd';

/** 
 * 引入自定义样式
*/
import './list.less';

/** 
 * 引入自定义工具函数
*/
import { formatMoney } from '../../../utils/tools';

/** 
 * 转换渠道格式
*/
const formatChannel = type => {
    switch (type) {
        case 1:
        case '1':
            return '线上';
        case 2:
        case '2':
            return '线下';
        default:
            return '--';
    }
};

const Item = props => {
    const { index, record } = props;
    return (
        <div className='row'>
            <span className='w-1'>{ index + 1 }</span>
            <span className='w-1-5 txt-overflow'>{record.custom || '--'}</span>
            <span className='w-1-5 txt-overflow'>{record.activity || '--'}</span>
            <span className='w-1-5 txt-overflow'>{formatChannel(record.channel) || '--'}</span>
            <span className='w-1-5 txt-overflow'>{formatMoney(record.spendFee) || '--'}</span>
            <span className='w-1-5 txt-overflow'>{record.createTime || '--'}</span>
            <span className='w-1-5 txt-overflow'>{record.address || '--'}</span>
            <div className='clear'></div>
        </div>
    );
};
 
@connect(({ statistics, loading }) => ({ statistics, loading }))
class List extends Component {
    componentDidMount() {
        const { dispatch, statistics } = this.props;

        dispatch({
            type: 'statistics/getDetailData',
            data: {
                pageSize: statistics.pageSize,
                pageIndex: statistics.pageIndex,
                startDate: statistics.startDate,
                endDate: statistics.endDate,
            },
        });
    }

    /** 
     * 处理页码变换
    */
    handlePageChange = (page, pageSize) => {
        const { dispatch, statistics } = this.props;

        dispatch({
            type: 'statistics/getDetailData',
            data: {
                pageIndex: page,
                pageSize: statistics.pageSize,
            },
        });
    }

    render() {
        const { statistics, loading } = this.props;
        const { detail } = statistics;
        const pageInfo = {
            total: detail.total,
            pageIndex: statistics.pageIndex,
            pageSize: statistics.pageSize,
        };
        const isLoading = loading.effects['statistics/getDetailData'];

        return (
            <Fragment>
                <div className='list'>
                    <div className='st_head'>
                        <span className='w-1 txt-overflow'>序号</span>
                        <span className='w-1-5 txt-overflow'>客户姓名</span>
                        <span className='w-1-5 txt-overflow'>参与活动</span>
                        <span className='w-1-5 txt-overflow'>渠道</span>
                        <span className='w-1-5 txt-overflow'>消费金额</span>
                        <span className='w-1-5 txt-overflow'>消费时间</span>
                        <span className='w-1-5 txt-overflow'>店铺</span>
                        <div className='clear'></div>
                    </div>
                    <div className='st_body'>
                    {
                        isLoading ? (<div className='flex-row p-10'><Spin title='加载中...' /></div>) : 
                        detail.list.length > 0 ? 
                        (
                            detail.list.map((item, index) => {
                                return (<Item record={item} key={item.id} index={index} />);
                            })
                        ) : 
                        (<div className='l-h-50 txt-center txt-gray-1'>暂无数据</div>)
                    }
                    </div>
                    <div className='st_foot'>
                        <Pagination 
                            current={pageInfo.pageIndex}
                            defaultCurrent={1}
                            total={pageInfo.total}
                            onChange={this.handlePageChange}
                            showTotal={total => {
                            const totalPages = Math.ceil(total / pageInfo.pageSize);

                            return (
                                <span className='line-b'>
                                    <span className='line-b m-r-10'>
                                        总共
                                        <span className='m-lr-5'>{total}</span>
                                        条记录
                                    </span>
                                    <span className='line-b m-r-10'>
                                        第
                                        {pageInfo.pageIndex}
                                        /
                                        {totalPages}
                                        页
                                    </span>
                                </span>);
                            }}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default List;