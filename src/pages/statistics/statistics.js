import React, { Component } from 'react';
import { connect } from 'dva';

class statistics extends Component {
    render() {
        return (
            <div>数据</div>
        );
    }
}

export default connect(({ statistics, loading }) => ({ statistics, loading }))(statistics);