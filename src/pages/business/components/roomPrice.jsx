import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

/** 
 * 引入自定义组件
*/
import Calendar from '../../../components/calendar';

import './roomPrice.less';

const { MonthPicker } = DatePicker;
@connect(({ roomTypeModel }) => ({ roomTypeModel }))
class RoomPrice extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('YYYY/MM/DD'),
        };
    }

    componentDidMount() {
        const { location } = this.props;

        this.getRoomDetail({
            id: location.state.id,
            date: this.state.date,
        });
    }

    /** 
     * 获取房型详情
    */
    getRoomDetail = (param) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'roomTypeModel/getRoomList',
            data: param,
        });
    }

    /** 
     * 日期变化
    */
    dateChange = (date) => {
        this.setState({ date: moment(date).format('YYYY/MM/DD') });
    }

    /** 
     * 日期单元格回调
    */
    cellClick = data => {
        
    }

    render() {
        const { date } = this.state;
        const { roomTypeModel } = this.props;
        const { roomTypeDetail } = roomTypeModel;

        return (
            <div className='roomPrice'>
                <div className='search'>
                    <span className='leftItem txt-bold l-h-30 '>
                        {roomTypeDetail ? roomTypeDetail.roomTypeName : '--'}
                    </span>
                    <span className='leftItem'>
                        <MonthPicker 
                        defaultValue={moment(this.state.date)} 
                        placeholder='选择月份' 
                        onChange={this.dateChange} />
                    </span>
                    <span className='clear' />
                </div>
                <div className='body'>
                    <Calendar date={date} list={roomTypeDetail ? roomTypeDetail.priceList : []} clickCallback={this.cellClick} />
                </div>
            </div>
        );
    }
}

export default RoomPrice;