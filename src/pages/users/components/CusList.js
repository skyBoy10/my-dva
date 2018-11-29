import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Checkbox, Pagination, Spin, Popconfirm } from 'antd';

/** 
 * 引入自定义样式
*/
import './cusList.less';

/** 
 * 引入工具
*/
import { formatGender } from '../../../utils/tools';

const Item = (props) => {
    const { user, deleteUser, editUser } = props;

    return (
        <div className='row'>
            <span className='w-0-5'><Checkbox value={user.id} /></span>
            <span className='w-1-5 txt-overflow'>{user.name}</span>
            <span className='w-1-5 txt-overflow'>{user.position}</span>
            <span className='w-1 txt-overflow'>{formatGender(user.gender)}</span>
            <span className='w-1 txt-overflow'>{user.age}</span>
            <span className='w-1-5 txt-overflow'>{user.role}</span>
            <span className='w-1-5 txt-overflow'>{user.createTime}</span>
            <span className='w-1-5 txt-overflow'>
                <a onClick={editUser} className='m-r-10'>编辑</a>
                <Popconfirm title='确认删除此项？' okText='确认' cancelText='取消' onConfirm={deleteUser}>
                    <a>删除</a>
                </Popconfirm>
            </span>
            <div className='clear'></div>
        </div>
    );
}

@connect(({ base, user, loading }) => ({ base, user, loading }))
class list extends Component {
    componentDidMount() {
        
    }

    /** 
     * 全选切换
    */
    onCheckAllChange = () => {
        const { user, dispatch } = this.props;

        if(user.checkedAll) {
            dispatch({
                type: 'user/updateSelectedList',
                data: {
                    selectedList: [],
                    isCheckAll: false,
                }
            });
            return;
        }

        const idArrs = user.list.map(item => item.id);
        dispatch({
            type: 'user/updateSelectedList',
            data: {
                selectedList: idArrs,
                isCheckAll: true,
            }
        });
    }

    /** 
     * 处理页码改变
    */
    handlePageChange = (pageIndex) => {
        const { dispatch, user } = this.props;

        dispatch({
            type: 'user/getUserList',
            data: {
                pageIndex: pageIndex,
                pageSize: user.pageSize,
                keyword: user.keyword
            }
        });
    }

    /** 
     * 删除用户
    */
    deleteUser = user => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/deleteUser',
            data: '',
        });
    }

    /** 
     * 编辑用户
    */
    editUser = user => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/updateCurrentUser',
            data: {
                currentUser: user,
                isShow: true,
                isEdit: true,
            }
        });
    }

    /** 
     * 单个选择选中改变
    */
    itemSelectChange = arrs => {
        const { dispatch, user } = this.props;

        dispatch({
            type: 'user/updateSelectedList',
            data: {
                selectedList: arrs,
                isCheckAll: arrs.length == user.list.length
            },
        });
    }

    render() {
        const { user, loading } = this.props;
        const { list, total, pageIndex, pageSize, selectedList,checkedAll } = user;
        const { Group } = Checkbox;
        
        const isLoadingData = loading.effects['user/getUserList'];
        const pageInfo = {
            total: total,
            pageSize: pageSize,
            pageIndex: pageIndex,
        };

        return (
            <Fragment>
                <div className='head'>
                    <span className='w-0-5'><Checkbox 
                        onChange={this.onCheckAllChange}
                        checked={checkedAll}
                    /></span>
                    <span className='w-1-5'>姓名</span>
                    <span className='w-1-5'>职位</span>
                    <span className='w-1'>性别</span>
                    <span className='w-1'>年龄</span>
                    <span className='w-1-5'>角色</span>
                    <span className='w-1-5'>创建时间</span>
                    <span className='w-1-5'>操作</span>
                    <div className='clear'></div>
                </div>
                <div className='body'>
                    {
                        isLoadingData ? (<div className='flex-row h-full'><Spin title='加载中...' /></div>) : 
                        list.length > 0 ? 
                        (
                            <Group className='w-full' value={selectedList} onChange={this.itemSelectChange}>
                            {
                                list.map(item => {
                                    return (<Item user={item} key={item.id} deleteUser={this.deleteUser.bind(this, item)} editUser={this.editUser.bind(this, item)} />);
                                })
                            }
                            </Group>
                        ) : 
                        (<div className='l-h-50 txt-center txt-gray-1'>暂无数据</div>)
                    }
                </div>
                <div className='foot'>
                    <Pagination 
                        current={pageInfo.pageIndex}
                        defaultCurrent={1}
                        total={pageInfo.total}
                        showQuickJumper
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
                        onChange={this.handlePageChange}
                    />
                </div>
            </Fragment>
        );
    }
};

export default list;