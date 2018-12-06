import React, { Component } from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';

/** 
 * 引入自定义组件
*/
import MemList from './member.list';
import MemConfig from './member.config';
import LevelList from './level.list';

@connect(({ member }) => ({ member }))
class MemCon extends Component {
    renderComponent = type => {
        switch(type) {
            case 1:
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className='h-full w-full b-c-white b-r-5'>
                <Route path='/member/list' component={MemList} />
                <Route path='/member/config' component={MemConfig} />
                <Route path='/member/levels' component={LevelList} />
            </div>
        );
    }
}

export default MemCon;