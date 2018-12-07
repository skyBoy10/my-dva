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
            case '1':
                return (<MemList />);
            case 2:
            case '2':
                return (<MemConfig />);
            case 3:
            case '3':
                return (<LevelList />);
            default:
                break;
        }
    }

    render() {
        const { member } = this.props;

        return (
            <div className='h-full w-full b-r-5'>
                {this.renderComponent(member.currentPage)}
            </div>
        );
    }
}

export default MemCon;