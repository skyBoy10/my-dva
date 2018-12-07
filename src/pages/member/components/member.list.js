import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Input, Row, Col, Select, Button, Icon, DatePicker, Form } from 'antd';

/** 
 * 引入自定义样式
*/
import '../member.less';

/** 
 * 引入自定义组件
*/
import CusSearch from './member.search';

@connect(({ member }) => ({ member }))
class MemberList extends PureComponent {
    render() {
        const { dispatch, member } = this.props;

        return (
            <div className='h-full w-full memList flex-col'>
                <div className='w-full item-0 b-c-white b-r-5 m-b-10'>
                    <CusSearch dispatch={dispatch} isShowMore={member.isShowMore} searchParam={member.searchParam} />
                </div>
                <Row className='b-c-white b-r-5 item-1'></Row>
            </div>
        );
    }
}

export default MemberList;