import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

class list extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'userList/getUserList',
            data: ''
        });
    }
    render() {
        const { list, total } = this.props.userList;
        
        const isLoadingData = this.props.loading.effects['userList/getUserList'];
        const pagination = {
            total: total,
            pageSize: 10,
            showTotal: total => `总共${total}条`,
        };
        const cols = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '15%'
            },
            {
                title: '职位',
                dataIndex: 'position',
                width: '15%'
            },
            {
                title: '性别',
                dataIndex: 'gender',
                width: '10%'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: '10%'
            },
            {
                title: '角色',
                dataIndex: 'role',
                width: '15%'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: '20%'
            },
            {
                title: '操作',
                dataIndex: 'x',
                width: '15%',
                render: (record) => {
                    return (
                        <div>
                            <a href='javascript:void(0);'>删除</a>
                            <a href='javascript:void(0);'>编辑</a>
                        </div>
                    );
                }
            }
        ];
        return (
            <div>
                <Table 
                loading={isLoadingData}
                rowKey='id'
                locale={ {'filterConfirm': '确定', 'filterReset': '', 'emptyText': '暂无数据' }}
                dataSource={list}
                columns={cols}
                pagination={pagination}
                scroll={{y: 400}}
                />
            </div>
        );
    }
};

export default connect(({ base, userList, loading }) => ({ base, userList, loading }))(list);