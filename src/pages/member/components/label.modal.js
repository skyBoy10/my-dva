import React, { PureComponent } from 'react';
import { Modal, Row, Col, Select, Input, Pagination, Spin, Icon } from 'antd';
import { connect } from 'dva';

/** 
 * 引入自定义样式
*/
import './label.modal.less';

const LabelItem = props => {
    const { label, switchChecked } = props;

    /** 
     * 转换标签
    */
    const transType = type => {
        switch(type) {
            case 1:
            case '1':
                return '大众标签';
            case 2:
            case '2':
                return '个性标签';
            default:
                return '';
        }
    };

    return (
        <div className='row'>
            <span className='w-4'>{label.name || '--'}</span>
            <span className='w-3'>{transType(label.type) || '--'}</span>
            <span className='w-3'>
                {
                    label.isChecked ? 
                    (<div><Icon type='check' className='txt-gray-1 m-r-10' /><a onClick={switchChecked}>取消</a></div>) : 
                    (<a onClick={switchChecked}>选择</a>)
                }
            </span>
            <div className='clear'></div>
        </div>
    );
}

@connect(({ label, memList, loading }) => ({ label, memList, loading }))
class CusModal extends PureComponent {
    /** 
     * 处理标签类型
    */
    handleSelect = (val) => {
        const { label } = this.props;

        this.searchLabels(val, label.keyword, 1);
    }

    /** 
     * 搜索
    */
    handleSearch = keyword => {
        const { label } = this.props;

        this.searchLabels(label.type, keyword, 1);
    }

    /** 
     * 保存标签
    */
    saveLabels = () => {
        const { label, dispatch } = this.props;
        const { list } = label;
        const selected = [];

        if(list && list.length > 0) {
            for(let i = 0; i < list.length; i++) {
                if(list[i].isChecked) {
                    selected.push(list[i]);
                }
            }
        }

        dispatch({
            type: 'label/tickLabels',
            data: {
                selected,
            },
        }).then(() => {
            const { dispatch, memList } = this.props;
            const { searchParam } = memList;

            dispatch({
                type: 'memList/getMemList',
                data: {
                    pageIndex: memList.pageIndex,
                    pageSize: memList.pageSize,
                    keyword: searchParam.keyword,
                    levelId: searchParam.levelId,
                }
            })
        });
    }

    /** 
     * 处理页码变化
    */
    handlePageChange = (pageIndex, pageSize) => {
        const { label } = this.props;

        this.searchLabels(label.type, label.keyword, pageIndex);
    }

    /** 
     * 检索标签
    */
    searchLabels = (type, keyword, pageIndex) => {
        const { dispatch, label } = this.props;

        dispatch({
            type: 'label/searchLabels',
            data: {
                isAll: false,
                pageIndex: pageIndex,
                pageSize: label.pageSize,
                type: type,
                keyword: keyword,
            }
        });
    }

    /** 
     * 取消
    */
    cancel = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'label/toggleModal',
            data: {
                type: 1,
                isShow: false,
            }
        });
    }

    /** 
     * 清空输入框
    */
    clearFields = () => {
        
    }

    /** 
     * 切换标签的选中状态
    */
    switchChecked = item => {
        const { dispatch } = this.props;

        dispatch({
            type: 'label/switchChecked',
            data: item,
        });
    }

    render() {
        const { label, loading } = this.props;
        const { labelModalShow, list } = label;
        const labelsTemp = list ? list : [];
        const isLoading = loading.effects['label/searchLabels'];
        const isSubmitting = loading.effects['label/tickLabels'];

        const pageInfo = {
            pageIndex: label.pageIndex,
            pageSize: label.pageSize,
            total: label.total,
        }

        return (
            <Modal
            visible={labelModalShow}
            title='贴标签'
            okText='保存'
            cancelText='取消'
            bodyStyle={{ padding: '10px' }}
            className='labelModal'
            onOk={this.saveLabels}
            onCancel={this.cancel}
            afterClose={this.clearFields}
            confirmLoading={isSubmitting}>
                <Row className='p-t-10 p-b-10'>
                    <Col span={6}>
                        <Select className='w-full' defaultValue='' onChange={this.handleSelect}>
                            <Select.Option value=''>全部</Select.Option>
                            <Select.Option value='1'>大众标签</Select.Option>
                            <Select.Option value='2'>个性标签</Select.Option>
                        </Select>
                    </Col>
                    <Col span={18}>
                        <div className='p-l-10'><Input.Search type='text' placeholder='输入标签名称' onSearch={this.handleSearch} /></div>
                    </Col>
                </Row>
                <div className='list'>
                    <div className='head'>
                        <span className='w-4'>名称</span>
                        <span className='w-3'>类型</span>
                        <span className='w-3'>操作</span>
                        <div className='clear'></div>
                    </div>
                    <div className='body scroll-y'>
                        {
                            isLoading ? (<div className='flex-row h-full'><Spin tip='加载中...' /></div>) : 
                            (labelsTemp.length > 0 ? labelsTemp.map(label => {
                                return (
                                    <LabelItem key={label.id} label={label} switchChecked={this.switchChecked.bind(this, label)} />
                                );
                            }) : (
                                <div className='flex-row h-full txt-c-gray-1'>暂无数据</div>
                            ))
                        }
                        <div className='clear'></div>
                    </div>
                    <div className='foot'>
                        <Pagination 
                            defaultCurrent={pageInfo.pageIndex}
                            total={pageInfo.total}
                            onChange={this.handlePageChange}
                            showTotal={total => {
                            const totalPages = Math.ceil(total / pageInfo.pageSize);
                            
                            return (
                                <span className='line-b'>
                                    <span className='line-b m-r-10'>
                                        总共
                                        <span className='m-lr-5'>{total}</span>
                                        条记录
                                    </span>
                                    <span className='line-b m-r-10'>
                                        第
                                        {pageInfo.pageIndex || 1}
                                        /
                                        {totalPages || 0}
                                        页
                                    </span>
                                </span>);
                            }}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CusModal;