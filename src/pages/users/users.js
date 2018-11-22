import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Icon } from 'antd';

/** 
 * 引入页面组件
*/
import CusTree from './components/CusTree';
import CusList from './components/CusList';
import CusModal from  './components/modal';

/** 
 * 引入自定义样式
*/
import './users.less';

@connect(({ user, loading }) => ({ user, loading }))
class users extends Component {
    /** 
     * 检索
    */
    handleSearch = val => {
        const { dispatch, user } = this.props;

        dispatch({
            type: 'user/getUserList',
            data: {
                keyword: val,
                pageIndex: user.pageIndex,
                pageSize: user.pageSize
            }
        });
    }

    /** 
     * 新增用户
    */
    addNewUser = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/switchModal',
            data: {
                isShow: true,
                isEdit: false,
            }
        })
    }

    render() {
        const Search = Input.Search;
        const { user } = this.props;
        const { currentStore } = user;

        return (
            <div className='h-full flex-row p-10 pos-ab t-0 b-0 l-0 r-0 users'>
                <span className='line-b w-200 h-full p-10 b-c-white item-0 box-sha-1 b-r-5'>
                    <CusTree />
                </span>
                <div className='h-full item-1 pos-r p-l-10'>
                    <div className='b-c-white b-r-5 flex-col h-full'>
                        <div className='p-10 item-0 w-full m-t-10'>
                            <span className='l-h-30 line-b h-30 tag'>当前店铺：</span>
                            <span className='l-h-30 line-b m-r-20'>
                                {currentStore ? currentStore.name : '暂无'}
                            </span>
                            <span className='line-b pull-right'>
                                <Search className='w-200' placeholder='输入关键词' onSearch={this.handleSearch} />
                            </span>
                            <span className='line-b pull-right m-r-10'>
                                <Button type='default' title='批量删除'>
                                    <Icon type='usergroup-delete'/>批量删除
                                </Button>
                            </span>
                            <span className='line-b pull-right m-r-10'>
                                <Button type='primary' title='新增用户' onClick={this.addNewUser}><Icon type='user-add' />新增用户</Button>
                            </span>
                        </div>
                        <div className='p-10 item-1 w-full pos-r'>
                            <CusList />
                        </div>
                    </div>
                    <CusModal />
                </div>
            </div>
        );
    }
}

export default users;