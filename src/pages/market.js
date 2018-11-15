import React, { Component } from 'react';
import { connect } from 'dva';

class market extends Component {
    render() {
        return (
            <div>营销</div>
        );
    }
}

export default connect(({ market, loading }) => ({ market, loading }))(market);