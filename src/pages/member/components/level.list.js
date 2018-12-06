import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ member }) => ({ member }))
class LevelList extends Component {
    render() {
        return (
            <div>等级列表</div>
        );
    }
}

export default LevelList;