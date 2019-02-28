import React, { Component } from 'react';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'dva/router';

/** 
 * 引入自定义组件
*/
import SubMenus from '../../components/leftMenu';
import BookList from './components/bookList';
import BreadLine from '../../components/breadLine';

import './order.less';
@connect(({ order }) => ({ order }))
class Order extends Component {
    render() {
        const { order } = this.props;
        const { subMenus } = order;

        return (
            <div className='flex-row order'>
                <div className='row-0 left scroll-y'>
                    <SubMenus subMenus={subMenus} />
                </div>
                <div className='row-1 content flex-col'>
                    <div className='item-0'>
                        <BreadLine subMenus={subMenus} />
                    </div>
                    <div className='item-1 pos-r'>
                        <div className='pos-ab h-full w-full'>
                            <Switch>
                                <Route path='/app/order/bookList' component={BookList} />
                                <Redirect to='/app/exception/404' />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ business, loading }) => ({ business, loading }))(Order);