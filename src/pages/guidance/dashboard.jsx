import React, { Component } from 'react';
import { connect } from 'dva';
import CusSwiper from './components/swiper';
import CusAmount from './components/amount';

import './dashboard.less';

@connect(({ guidance }) => ({ guidance }))
class Dashboard extends Component {
    componentDidMount() {
        this.getAmount();
        this.getTList();
        this.count = 100;

        const timer = setInterval(() => {
            if(this.count <= 0) {
                clearInterval(timer);
            }

            this.getAmount();
            this.updateSort();
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

    getTList = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'guidance/getTList',
            data: '',
        });
    }

    updateSort = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'guidance/updateSort',
            data: '',
        });
    }

    getDemoList = () => {
        const { guidance } = this.props;
        const { demoList } = guidance;
        
        return demoList.reverse();
    }

    render() {
        const { guidance } = this.props;

        return (
            <div className='guid-dash'>
                <CusAmount amount={guidance.amount} />
                <CusSwiper />
                <div className='ani-container'>
                    {
                        guidance.demoList.map((item, index) => {
                            return (
                                <div key={item.id} className={ `scroll${item.sort}` }>{item.name} - {item.sort}</div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;