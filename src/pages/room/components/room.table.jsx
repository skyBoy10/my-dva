import React, { Component } from 'react';
import { Table } from 'antd';

import './room.table.less';

class RoomTable extends Component {
    render() {
        return (
            <div className='room-table'>
                <div className='room-container flex-col'>
                    <div className='h-200 item-0'>
                        <div className='left h-200'>
                            左边顶部
                        </div>
                        <div className='right top'>
                            右边顶部
                        </div>
                    </div>
                    <div className='item-1'>
                        <div className='left b-0 t-200'>
                            左边房型
                        </div>
                        <div className='right h-full'>
                            右边房间
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoomTable;