import React,  { PureComponent } from 'react';
import { formatMoney } from '../utils/tools';

import './calendar.less';

class Calendar extends PureComponent {
    constructor(props) {
        super(props);
        const { headers } = this.props;
        const current = new Date();
        this.state = {
            currentDate: `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`,
            headers: headers ? headers : [
                '周日',
                '周一',
                '周二',
                '周三',
                '周四',
                '周五',
                '周六',
            ],
        };
    }

    /** 
     * 获取当前月份天数
    */
    getMonthDays = (paDate) => {
        const currentDate = paDate ? new Date(paDate) : new Date();
        const month = currentDate.getMonth();
        
        currentDate.setMonth(month + 1);
        currentDate.setDate(0);

        return currentDate.getDate();
    }

    /** 
     * 获取该月份第一天周几
    */
    getFirstDayOfWeek = (paDate) => {
        const temp = paDate ? new Date(paDate) : new  Date();
        temp.setDate(1);
        
        return temp.getDay();
    }

    /** 
     * 获取上一个月日期信息
    */
    getPreMonth = (paDate) => {
        const date = paDate ? new Date(paDate) : new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        if(month === 0) {
            const temp = new Date(year - 1, 12, 0);
            return {
                date: `${(year-1)}-12`,
                days: temp.getDate(),
            };
        }

        date.setDate(0);
        return {
            date: `${year}-${month}`,
            days: date.getDate(),
        }
    }

    /** 
     * 获取下一个月日期信息
    */
    getNextMonth = (paDate) => {
        const date = paDate ? new Date(paDate) : new Date();
        const month = date.getMonth();

        if(month === 11) {
            return {
                date: `${date.getFullYear() + 1}-1`,
            };
        }

        return {
            date: `${date.getFullYear()}-${month + 2}`,
        };
    }

    /** 
     * 初始化日历
    */
    initCalendarData = () => {
        const { date, list } = this.props;
        const firstDay = this.getFirstDayOfWeek(date);
        const days = this.getMonthDays(date);
        const preMonInfo = this.getPreMonth(date);
        const nextMonInfo = this.getNextMonth(date);
        const current = date ? new Date(date) : new Date();
        const result = [];

        for(let i = 1; i <= 42; i += 1) {
            if(i <= (firstDay % 7)) {
                const temp = preMonInfo.days - (firstDay % 7 - i);
                result.push({
                    date: `${preMonInfo.date}-${temp}`,
                    value: temp,
                });
                continue;
            }

            if(i > (days + firstDay % 7)) {
                const next = i - (days + firstDay % 7);
                result.push({
                    date: `${nextMonInfo.date}-${next}`,
                    value: next,
                });
                continue;
            }

            const currentDate = i - (firstDay % 7);
            result.push({
                isCurrent: true,
                date: `${current.getFullYear()}-${current.getMonth() + 1}-${currentDate}`,
                value: currentDate,
            });
        }

        return result;
    }

    /** 
     * 绑定其他信息
    */
    bindOther = (showList) => {
        const { list } = this.props;

        if(list && list.length > 0) {
            for(let i = 0; i < list.length; i += 1) {
                for(let j = 0; j < showList.length; j += 1) {
                    if(showList[j].date === list[i].date) {
                        showList[j].total = list[i].total;
                        showList[j].enabledRooms = list[i].enabledRooms;
                        showList[j].price = list[i].price;
                        break;
                    }
                }
            }
        }
    }

    /** 
     * 单元格点击回调
    */
    onClickCell = item => {
        if(item && item.isCurrent) {
            const { clickCallback } = this.props;
            this.setState({ currentDate: item.date });
            if(clickCallback && typeof(clickCallback) === 'function') {
                clickCallback(item);
            }
        }
    }

    /** 
     * 日期变化回调
    */
    onDateChange = () => {
        const { dateChange } = this.props;

        if(dateChange && typeof(dateChange) === 'function') {
            dateChange();
        }
    }

    render() {
        const { headers, currentDate } = this.state;
        const list = this.initCalendarData();
        this.bindOther(list);

        return (
            <div className='calendar'>
                <div className='calRow calhead cal-0 leftBorder'>
                    {
                        headers.map(item => <span key={item} className='cell'>{item}</span>)
                    }
                </div>
                <div className='calRow cal-1 leftBorder'>
                    {
                        list.map(item => {
                            return (
                                <span key={item.date} 
                                onClick={this.onClickCell.bind(this, item)}
                                className={item.isCurrent ? (item.date === currentDate ? 'cell item active' : 'cell item enabled') : 'cell item disabled'}>
                                    <div>{item.value}</div>
                                    <div className='txt-right txt-bold'>{formatMoney(item.price, 1, 2)}</div>
                                    <div className='txt-right'>可住{item.enabledRooms || '0'}间/共{item.total || '0'}间</div>
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Calendar;