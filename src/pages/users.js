import React, { Component } from 'react';
import { connect } from 'dva';
import { Input, Button, Icon } from 'antd';

/** 
 * 引入公共组件
*/
import CusTree from '../components/users/CusTree';
import CusList from '../components/users/CusList';

/** 
 * 引入自定义样式
*/
import './users.less';

class users extends Component {
    handleSearch = val => {
        console.log(val);
    }
    render() {
        const Search = Input.Search;
        const { currentStore } = this.props.tree;
        return (
            <div className='h-full flex-row p-10 pos-ab t-0 b-0 l-0 r-0 users'>
                <span className='line-b w-200 h-full p-10 b-c-white item-0 box-sha-1 b-r-5'>
                    <CusTree />
                </span>
                <span className='line-b h-full item-1 pos-r'>
                    <span className='line-b b-c-white b-r-5 pos-ab t-0 l-10 r-0 b-0'>
                        <div className='p-10'>
                            <span className='l-h-30 line-b h-30 tag'>当前店铺：</span>
                            <span className='l-h-30 line-b m-r-20'>
                                {currentStore || '暂无'}
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
                                <Button type='primary' title='新增用户'><Icon type='user-add' />新增用户</Button>
                            </span>
                        </div>
                        <div className='p-10'>
                            <CusList />
                        </div>
                    </span>
                </span>
            </div>
        );
    }
}

export default connect(({ tree }) => ({ tree }))(users);