import React, { Component } from 'react';
import { connect } from 'dva';

/** 
 * 引入页面自定义样式
*/
import './member.less';

/** 
 * 引入自定义组件
*/
import LeftMenu from './components/leftMenu';
import MemCon from './components/content';

@connect(({ member }) => ({ member }))
class Member extends Component {
    render() {
        return (
            <div className='flex-row member'>
                <div className='item-0 left scroll-y'>
                    <LeftMenu />
                </div>
                <div className='item-1 content'>
                    <MemCon />
                </div>
            </div>
        );
    }
}

export default Member;