import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ member }) => ({ member }))
class MemConfig extends Component {
    render() {
        return (
            <div>会员配置</div>
        );
    }
}

export default MemConfig;