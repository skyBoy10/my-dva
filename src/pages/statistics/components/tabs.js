import React from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import moment from 'moment';
import Base from '../../base';

/** 
 * 引入自定义样式
*/
import './tabs.less';

@connect(({ statistics, loading }) => ({ statistics, loading }))
class Tabs extends Base {

    /** 
     * 激活当前索引
    */
    activeCurrent = e => {
        const { dispatch } = this.props;
        if(e) {
            dispatch({
                type: 'statistics/updateIndex',
                data: e.target.getAttribute('data')
            });
        }
    }

    /** 
     * 处理日期改变
    */
    handleDateChange(dates, dateStr) {
        
    }

    render() {
        const { RangePicker } = DatePicker;
        const { statistics } = this.props;
        const dateFormat = 'YYYY/MM/DD';

        return (
            <div className='tabs' onClick={this.activeCurrent}>
                <span data='1' className={statistics.activeIndex == 1 ? 'active item-0 first' : 'item-0 first'}>最近七天</span>
                <span data='2' className={statistics.activeIndex == 2 ? 'active item-0' : 'item-0'}>最近一个月</span>
                <span data='3' className={statistics.activeIndex == 3 ? 'active item-0' : 'item-0'}>最近三个月</span>
                <span>
                    <RangePicker 
                        onChange={this.handleDateChange}
                        defaultValue={[moment(statistics.startDate, dateFormat), moment(statistics.endDate, dateFormat)]}
                        format={dateFormat}
                    />
                </span>
            </div>
        );
    };
}

export default Tabs;