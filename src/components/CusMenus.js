import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Layout, Icon } from 'antd';
import { Link } from 'dva/router';
import './cusMenu.less';

class cusMenu extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({type: 'base/getMenus', data: ''});
    }

    handleClick = (menu) => {
        const { dispatch } = this.props;
        dispatch({type: 'base/updateCurrentMenu', data: menu});
    }

    render() {
        const { Sider } = Layout;
        const { menus } = this.props;
        
        return (
            <Sider width={180}>
                <div className='p-7 txt-center flex-row h-100'>
                    <span className='line-b l-h-50 b-r-half w-50 h-50 txt-center txt-s-20 b-c-red-1 txt-c-white'>
                        <Icon type='user' />
                    </span>
                </div>
                <Menu
                defaultSelectedKeys={[this.props.selectedMenu]}
                mode='inline'
                theme='dark'>
                    {
                        menus.map(item => {
                            return (
                                <Menu.Item key={item.nickName}>
                                    <Link key={item.url} to={item.url} onClick={this.handleClick.bind(this, item)}>
                                        <Icon type={item.iconType} />
                                        <span>{item.name}</span>
                                    </Link>
                                </Menu.Item>
                            );
                        })
                    }
                </Menu>
            </Sider>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        menus: state.base.menus,
        collapsed: state.base.collapsed,
        selectedMenu: state.base.selectedMenu
    }
}

export default connect(mapStateToProps)(cusMenu);