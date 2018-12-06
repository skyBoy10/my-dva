import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ member }) => ({ member }))
class MemberList extends Component {
    render() {
        return (
            <div>会员列表</div>
        );
    }
}

export default MemberList;