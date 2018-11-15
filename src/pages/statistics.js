import React, { Component } from 'react';
import { connect } from 'dva';

class statistics extends Component {
    render() {
        return (
            <dvi>数据</dvi>
        );
    }
}

export default connect(({ statistics, loading }) => ({ statistics, loading }))(statistics);