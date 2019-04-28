import React, { Component } from 'react';
import { connect } from 'dva';

import RoomTable from './components/room.table';

import './room.home.less';

@connect(({ loading }) => ({ loading }))
class RoomHome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='room-home'>
                <RoomTable />
            </div>
        );
    }
}

export default RoomHome;