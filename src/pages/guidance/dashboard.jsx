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
        const { demoList, oldList } = guidance;
        let result = [];
        
        if(oldList.length > 0) {
            for(let i = 0; i < oldList.length; i += 1) {
                for(let j = 0; j < demoList.length; j += 1) {
                    if(oldList[i].id == demoList[j].id) {
                        result.push({
                            id: oldList[i].id,
                            name: demoList[j].name,
                            oldSort: oldList[i].sort,
                            sort: demoList[j].sort,
                        });
                        break;
                    }
                }
            }
        } else {
            result = demoList;
        }
        
        console.log(result)
        return result.reverse();
    }

    render() {
        const { guidance } = this.props;
        const list = this.getDemoList();

        return (
            <div className='guid-dash'>
                <CusAmount amount={guidance.amount} />
                <CusSwiper />
                <div className='ani-container'>
                    {
                        list.length > 0 && list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div key={item.id} className={ item.oldSort != item.sort && item.oldSort ? `item scroll${item.oldSort}_${item.sort}` : `item top-${item.sort}`}>{item.name} - {item.id} - {item.oldSort} - {item.sort}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;