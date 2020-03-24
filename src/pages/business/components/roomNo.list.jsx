import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal } from "antd";

import './roomNo.list.less';

@connect(({ loading, roomNoModel }) => ({ loading, roomNoModel}))
class RoomNoEdit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>测试</div> 
                <div>房号内容</div>
            </div>
        );
    }
}

export default RoomNoEdit;