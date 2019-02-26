import React, { PureComponent, Fragment } from 'react';
import { withRouter, Link } from 'dva/router';

import './breadLine.less';

class BreadLine extends PureComponent {
    /** 
     * 获取当前菜单
    */
    getCurrentMenu = () => {
        const { location, subMenus } = this.props;

        for(let i = 0; i < subMenus.length; i += 1) {
            if(subMenus[i].url === location.pathname) {
                return subMenus[i];
            }
        };

        return null;
    }

    /** 
     * 获取所有页面链
    */
    getBreadLines = (parentKey, result = [], list) => {
        for(let i = 0; i < list.length; i += 1) {
            if(list[i].key === parentKey) {
                result.unshift({
                    key: list[i].key,
                    name: list[i].name,
                    url: list[i].url ? list[i].url : '',
                });

                if(list[i].parentKey) {
                    this.getBreadLines(list[i].parentKey, result, list);
                }

                break;
            }
        }
    }

    render() {
        const { subMenus } = this.props;
        const currentMenu = this.getCurrentMenu();
        const arrs = [];
        currentMenu && this.getBreadLines(currentMenu.parentKey, arrs, subMenus);
        return (
            <div className='breadLine'>
                {
                    arrs.length > 0 ? (
                        arrs.map(item => {
                            if(item.url) {
                                return (<Fragment key={item.key}><span className='lineItem'>
                                <Link to={item.url}>{item.name}</Link></span><span className='split'>/</span></Fragment>);
                            }

                            return (<Fragment key={item.key}><span className='lineItem'>{item.name}</span><span className='split'>/</span></Fragment>);
                        })
                    ) : ''
                }
                <span className='lineItem active'>{currentMenu ? currentMenu.name : '--'}</span>
                <span className='clear'></span>
            </div>
        );
    }
}

export default withRouter(BreadLine);