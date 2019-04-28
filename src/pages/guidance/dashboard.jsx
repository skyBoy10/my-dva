import React, { Component } from 'react';
import { connect } from 'dva';
import CusSwiper from './components/swiper';
import CusAmount from './components/amount';

import './dashboard.less';

@connect(({ guidance }) => ({ guidance }))
class Dashboard extends Component {
    componentDidMount() {
        this.getAmount();
        this.count = 60;

        const timer = setInterval(() => {
            if(this.count <= 0) {
                clearInterval(timer);
            }
            
            this.getAmount();
            this.count--;
        }, 5000);
    }

    /** 
     * 获取金额
    */
    getAmount = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'guidance/getAmount',
            data: '',
        });
    }

    render() {
        const { guidance } = this.props;

        return (
            <div className='guid-dash'>
                <CusAmount amount={guidance.amount} />
                <CusSwiper />
            </div>
        );
    }
}

export default Dashboard;