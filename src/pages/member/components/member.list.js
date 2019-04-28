import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Icon, Row, Col, Checkbox, Tag, Button, Pagination, Spin, Modal } from 'antd';

/** 
 * 引入自定义样式
*/
import '../member.less';

/** 
 * 引入自定义工具
*/
import { formatMoney } from '../../../utils/tools';

/** 
 * 引入自定义组件
*/
import CusSearch from './member.search';
import LabelModal from './label.modal';

const MemItem = props => {
    const { item, switchMemberState, stickLabel, removeTags } = props;

    return (
        <Fragment>
            <Row className='l-h-80 b-b'>
                <Col span={1} className='txt-center'><Checkbox /></Col>
                <Col span={3}>
                    <div className='flex-row txt-overflow'>
                        <span className='line-b h-80 txt-center row-0 w-50 p-t-10'>
                            <Icon type='user' className='txt-s-2-5em txt-gray-1' />
                        </span>
                        <span className='line-b row-1 h-80'>
                            <div className='l-h-30 txt-s-13'>{item.name || '--'}</div>
                            <div className='l-h-30 txt-s-13'>
                                <Tag color={item.levelColor}>{item.levelName || '--'}</Tag>
                            </div>
                            <div className='l-h-20 txt-s-13'>
                                <Icon type={item.gender == 1 ? 'man' : 'woman'} 
                                    className={item.gender == 1 ? '' : 'txt-c-red-1'}
                                />
                            </div>
                        </span>
                    </div>
                </Col>
                <Col span={4} className='txt-overflow'>{item.cardNo || '--'}</Col>
                <Col span={3} className='txt-overflow'>{item.phone || '--'}</Col>
                <Col span={3} className='txt-overflow'>{item.accessIntegral || '--'}</Col>
                <Col span={3} className='txt-overflow'>{formatMoney(item.consumeFee, 1, 2) || '--'}</Col>
                <Col span={3} className='txt-overflow'>{item.consumeCnt || '--'}</Col>
                <Col span={4} className='txt-overflow'>
                    <Link to={{
                        pathname: '/app/member/detail',
                        state: {id: item.id},
                    }} className='m-r-10'>详情</Link>
                    <a className='m-r-10' onClick={switchMemberState}>
                        {
                            item.state == '1' ? '冻结' : '解冻'
                        }
                    </a>
                    <a className='m-r-10'>送积分</a>
                    <a>设等级</a>
                </Col>
            </Row>
            <Row className='p-t-10 p-b-10'>
            {
                item.labels && item.labels.length > 0 ? (
                    item.labels.map(label => {
                        return (
                            <span className='line-b m-r-10' key={label.labelId}>
                                <Tag color="#2db7f5" closable onClose={removeTags}>{label.labelName || '--'}</Tag>
                            </span>
                        );
                    })
                ) : (
                    ''
                )
            }
                <span className='line-b'>
                    <Button type='primary' size='small' className='txt-s-13' onClick={stickLabel}><Icon type='plus' className='txt-s-13' />添加新标签</Button>
                </span>
            </Row>
        </Fragment>
    );
}

@connect(({ memList, label, loading }) => ({ memList, label, loading }))
class MemberList extends PureComponent {
    componentDidMount() {
        const { dispatch, memList } = this.props;
        const { searchParam } = memList;

        dispatch({
            type: 'memList/getMemList',
            data: {
                pageIndex: memList.pageIndex,
                pageSize: memList.pageSize,
                keyword: searchParam.keyword,
                levelId: searchParam.levelId,
            }
        })
    }

    /** 
     * 处理页码变化
    */
    handlePageChange = (page, pageSize) => {
        const { dispatch, memList } = this.props;

        dispatch({
            type: 'memList/getMemList',
            data: {
                pageIndex: page,
                pageSize: memList.pageSize,
                keyword: memList.keyword,
            },
        });
    }

    /** 
     * 移除标签
    */
    removeTags = (label) => {
        console.log(label);
    }

    /** 
     * 添加新标签
    */
    stickLabel = currentMem => {
        const { dispatch, label } = this.props;

        dispatch({
            type: 'label/toggleModal',
            data: {
                type: 1,
                isShow: true,
                member: currentMem
            }
        });

        dispatch({
            type: 'label/searchLabels',
            data: {
                pageIndex: label.pageIndex,
                pageSize: label.pageSize,
                keyword: '',
                type: '',
            }
        });
    }

    /** 
     * 切换会员状态
    */
    switchMemberState = item => {
        const { dispatch } = this.props;
        const { confirm } = Modal;
        const action = item.state == '1' ? '冻结' : '解冻';

        confirm({
            title: `确定要${action}会员【${item.name}】吗？`,
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                dispatch({
                    type: 'memList/switchMemState',
                    data: {
                        id: item.id,
                        state: item.state == '1' ? '2' : '1',
                    }
                });
            },
            onCancel() {

            },
        });
    }

    render() {
        const { dispatch, memList, loading } = this.props;
        const isLoading = loading.effects['memList/getMemList'];
        const { list } = memList;
        const pageInfo = {
            pageIndex: memList.pageIndex,
            pageSize: memList.pageSize,
            total: memList.total,
        };

        return (
            <div className='h-full w-full memList flex-col'>
                <div className='w-full item-0 b-c-white m-b-10 b-r-5'>
                    <CusSearch dispatch={dispatch} isShowMore={memList.isShowMore}
                     searchParam={memList.searchParam} labels={memList.labels} 
                     levels={memList.levels} pageSize={memList.pageSize} />
                </div>
                <Row className='w-full item-0 b-c-white b-r-5 m-b-10 l-h-50 p-lr-10 txt-bold'>
                    <Col span={1} className='txt-center'>
                        <Checkbox />
                    </Col>
                    <Col span={3}>客户信息</Col>
                    <Col span={4}>卡号</Col>
                    <Col span={3}>手机</Col>
                    <Col span={3}>可用积分</Col>
                    <Col span={3}>累计消费金额</Col>
                    <Col span={3}>累计消费次数</Col>
                    <Col span={4}>操作</Col>
                </Row>
                <div className='w-full item-1 pos-r'>
                    <div className='pos-ab t-0 l-0 r-0 b-60 scroll-y'>
                        {
                            isLoading ? (<div className='b-c-white flex-row h-full b-r-5'><Spin tip='加载中...' /></div>) : 
                            (
                                list && list.length > 0 ? (
                                    list.map((item, index) => {
                                        return (
                                            <div key={item.id} className={index === 0 ? 'b-c-white p-lr-10 b-r-5' : 'b-c-white p-lr-10 b-r-5 m-t-10'}>
                                                <MemItem item={item} stickLabel={this.stickLabel.bind(this, item)}
                                                 removeTags={this.removeTags.bind(this, item)}
                                                 switchMemberState={this.switchMemberState.bind(this, item)} />
                                            </div>
                                        );
                                    })
                                )
                                : (
                                    <div className='b-c-white p-lr-10 b-r-5 txt-center txt-gray-1 m-b-10 l-h-80'>
                                        暂无数据
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className='b-c-white txt-right pos-ab b-0 l-0 r-0 p-10'>
                        <Pagination 
                            defaultCurrent={pageInfo.pageIndex}
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
                                        {pageInfo.pageIndex || 1}
                                        /
                                        {totalPages || 0}
                                        页
                                    </span>
                                </span>);
                            }}
                        />
                    </div>
                </div>
                <LabelModal />
            </div>
        );
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'memList/resetStore',
            data: '',
        })
    }
}

export default MemberList;