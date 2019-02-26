import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { NavLink, withRouter } from 'dva/router';

/** 
 * 引入自定义样式
*/
import '../member.less';

@connect(({ member }) => ({ member }))
class Left extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'member/getTabMenus',
            data: '',
        });
    }

    /** 
     * 激活路由
    */
    isActiveCurrent = (match, location) => {
        if(!match) return false;

        return true;
    }

    render() {
        const { member } = this.props;
        const { tabMenus } = member;

        return (
            <div className='tabMenus'>
            {
                tabMenus.length <= 0 ? '暂无数据' : 
                (
                    tabMenus.map(item => {
                        return (
                            <Fragment key={item.id}>
                                <div className='title'>{item.title}</div>
                                {
                                    item.children.map(tabMenu => {
                                        return (
                                            <div key={tabMenu.id} className='l-h-30'>
                                                <NavLink className='sub' 
                                                isActive={this.isActiveCurrent}
                                                to={tabMenu.url}>{tabMenu.title}</NavLink>
                                            </div>
                                        )
                                    })
                                }
                            </Fragment>
                        );
                    })
                )
            }
            </div>
        );
    };
}

export default withRouter(Left);