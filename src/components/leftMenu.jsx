import React, { PureComponent } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './leftMenu.less'

class LeftMenu extends PureComponent {
    isActiveCurrent = (match, location) => {
        if(!match) return false;

        return true;
    }

    render() {
        const { subMenus } = this.props;

        return (
            <div className='leftMenu'>
                {
                    subMenus.map(item => item.isMenu ? (item.url ? (<div key={item.key}>
                    <NavLink to={item.url} isActive={this.isActiveCurrent}>{item.name}</NavLink></div>) 
                    : (<div key={item.key} className='title'>{item.name}</div>)) : '')
                }
            </div>
        );
    }
}

export default withRouter(LeftMenu);