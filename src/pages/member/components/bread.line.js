import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';

@connect(({ loading }) => ({ loading }))
class BreadLine extends PureComponent {
    render() {
        return (
            <div></div>
        );
    }
}

export default BreadLine;