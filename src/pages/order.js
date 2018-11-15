import React, { Component } from 'react';
import { connect } from 'dva';

class business extends Component {
    render() {
        return (
            <div>办公</div>
        );
    }
}

export default connect(({ business, loading }) => ({ business, loading }))(business);