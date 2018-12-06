import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import moment from 'moment';

/** 
 * 引入自定义样式
*/
import './tabs.less';

@connect(({ statistics, loading }) => ({ statistics, loading }))
class Tabs extends Component {
    /** 
     * 激活当前索引
    */
    activeCurrent = (index, e) => {
        const { dispatch, statistics } = this.props;
        let startDate = '';
        let endDate = '';
        
        switch(index) {
            case 1: //最近七天
            case '1':
                startDate = moment().subtract(7, 'days').format('YYYY/MM/DD');
                endDate = moment().format('YYYY/MM/DD');
                break;
            case 2: //最近一个月
            case '2':
                startDate = moment().subtract(1, 'months').format('YYYY/MM/DD');
                endDate = moment().format('YYYY/MM/DD');
                break;
            case 3: //最近三个月
            case '3':
                startDate = moment().subtract(3, 'months').format('YYYY/MM/DD');
                endDate = moment().format('YYYY/MM/DD');
                break;
            default:
                break;
        }

        dispatch({
            type: 'statistics/updateIndex',
            data: {
                activeIndex: index,
                startDate: startDate,
                endDate: endDate,
            }
        });
        
        dispatch({
            type: 'statistics/getTotalData',
            data: {
                startDate: startDate,
                endDate: endDate,
            }
        });

        dispatch({
            type: 'statistics/getReportData',
            data: {
                startDate: startDate,
                endDate: endDate,
            }
        });

        dispatch({
            type: 'statistics/getDetailData',
            data: {
                startDate: startDate,
                endDate: endDate,
                pageIndex: 1,
                pageSize: statistics.pageSize,
            }
        });
    }

    /** 
     * 处理日期改变
    */
    handleDateChange = (dates, dateStr) => {
        const { dispatch, statistics } = this.props;

        dispatch({
            type: 'statistics/getTotalData',
            data: {
                startDate: dateStr[0],
                endDate: dateStr[1],
            }
        });

        dispatch({
            type: 'statistics/getReportData',
            data: {
                startDate: dateStr[0],
                endDate: dateStr[1],
            }
        });

        dispatch({
            type: 'statistics/getDetailData',
            data: {
                startDate: dateStr[0],
                endDate: dateStr[1],
                pageIndex: 1,
                pageSize: statistics.pageSize,
            }
        });
    }

    render() {
        const { RangePicker } = DatePicker;
        const { statistics } = this.props;
        const dateFormat = 'YYYY/MM/DD';
        moment.locale('zh-cn');
        const local = {
            'rangePlaceholder': ['起始日期', '截止日期']
        }

        return (
            <div className='tabs'>
                <span onClick={this.activeCurrent.bind(this, 1)} className={statistics.activeIndex == 1 ? 'active item-0 first' : 'item-0 first'}>最近七天</span>
                <span onClick={this.activeCurrent.bind(this, 2)} className={statistics.activeIndex == 2 ? 'active item-0' : 'item-0'}>最近一个月</span>
                <span onClick={this.activeCurrent.bind(this, 3)} className={statistics.activeIndex == 3 ? 'active item-0' : 'item-0'}>最近三个月</span>
                <span>
                    <RangePicker 
                        onChange={this.handleDateChange}
                        locale={local}
                        value={[moment(statistics.startDate, dateFormat), moment(statistics.endDate, dateFormat)]}
                        format={dateFormat}
                    />
                </span>
            </div>
        );
    };
}

export default Tabs;