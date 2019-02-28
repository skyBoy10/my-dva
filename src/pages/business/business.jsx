import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Switch, Route, Redirect } from 'dva/router';

/** 
 * 引入自定义样式
*/
import './business.less';

/** 
 * 引入自定义组件
*/
import SubMenus from '../../components/leftMenu';
import BreadLine from '../../components/breadLine';
import RoomTypes from './components/roomTypes';
import RoomPrice from './components/roomPrice';

@connect(({ loading, business }) => ({ loading, business }))
class Business extends PureComponent {
    render() {
        const { business } = this.props;
        const { subMenus } = business;

        return (
            <div className='flex-row business'>
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
                                <Route exact path='/app/business/roomTypes' component={RoomTypes} />
                                <Route exact path='/app/business/roomPrice' component={RoomPrice} />
                                <Redirect to='/app/exception/404' />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Business;