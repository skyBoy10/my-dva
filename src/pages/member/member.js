import React, { Component } from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router'
import { Spin } from 'antd';

/** 
 * 引入页面自定义样式
*/
import './member.less';

/** 
 * 引入自定义组件
*/
import LeftMenu from './components/leftMenu';
import MemList from './components/member.list';
import MemLevel from './components/level.list';
import MemDetail from './member.detail';
import MemCard from './member.card';
import CardEdit from './member.card.edit';

@connect(({ member, loading }) => ({ member, loading }))
class Member extends Component {
    render() {
        return (
            <div className='flex-row member'>
                <div className='row-0 left scroll-y'>
                    <LeftMenu />
                </div>
                <div className='row-1 content'>
                    <Switch>
                        <Route path='/app/member/list' component={MemList} />
                        <Route path='/app/member/card' component={MemCard} />
                        <Route path='/app/member/levels' component={MemLevel} />
                        <Route path='/app/member/detail' component={MemDetail} />
                        <Route path='/app/member/edit' component={CardEdit} />
                        <Redirect to='/app/exception/404' />
                    </Switch>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'member/resetStore',
            data: '',
        });
    }
}

export default Member;