import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Pagination, Spin, Button, Checkbox,
Modal, message } from 'antd';

import './roomTypes.less';

/** 
 * 引入自定义工具
*/
import { formatMoney } from '../../../utils/tools';

const SearchForm = props => {
    const { checkedIds, deleteGroup, updateRoomType } = props;

    const search = (e, val) => {
        e && e.preventDefault();
        console.log(val);
    }

    const addRoomType = () => {
        if(updateRoomType && typeof(updateRoomType) == 'function') {
            updateRoomType();
        }
    }

    return (
        <div className='search'>
            <span className='leftItem'>
                <Button type='default' onClick={addRoomType}>新增房型</Button>
            </span>
            <span className='leftItem'>
                <Button type='default' onClick={deleteGroup} disabled={checkedIds.length <= 0}>批量删除</Button>
            </span>
            <span className='rightItem'>
                <Input.Search onSearch={search} placeholder='房型名称' className='cusInput' />
            </span>
            <span className='clear' />
        </div>
    );
}

const ListItem = props => {
    const { roomType, index, gotoPrice } = props;

    return (
        <div className='listItem' style={(index % 2) ? {} : { backgroundColor: '#f5f5f5' }}>
            <span className='item w-1 fir'><Checkbox value={roomType.roomTypeId} /></span>
            <span className='item w-1-5'>{roomType.name || '--'}</span>
            <span className='item w-1-5'>{formatMoney(roomType.rackRate, 1, 2) || '--'}</span>
            <span className='item w-1-5'>{formatMoney(roomType.deposit, 1, 2) || '--'}</span>
            <span className='item w-1-5'>{roomType.num || '--'}</span>
            <span className='item w-1'>{roomType.checkinNum || '--'}</span>
            <span className='item w-2'>
                <a className='m-r-10'>编辑</a>
                <a className='m-r-10'>设置房号</a>
                <a className='m-r-10' onClick={gotoPrice}>价格库存日历</a>
                <a className='m-r-10'>投放</a>
            </span>
            <span className='clear'></span>
        </div>
    );
}

@connect(({ loading, roomTypeModel }) => ({ loading, roomTypeModel }))
class RoomTypes extends PureComponent {
    componentDidMount() {
        const { roomTypeModel } = this.props;

        this.getList({
            pageIndex: roomTypeModel.pageNo,
            pageSize: roomTypeModel.pageSize,
            keywords: '',
        });
    }

    /** 
     * 获取列表
    */
    getList = param => {
        const { dispatch } = this.props;

        dispatch({
            type: 'roomTypeModel/getList',
            data: param,
        });
    }

    /** 
     * 渲染列表
    */
    renderList = list => {
        const noData = (<div className='pos-ab w-full h-full'><div className='noData'>暂无数据</div></div>);
        const loadingEle = (<div className='pos-ab w-full h-full'><div className='loading'><Spin tip='加载中...' /></div></div>);
        const { loading } = this.props;

        const isLoading =  loading.effects['roomTypeModel/getList'];

        return isLoading ? loadingEle : 
        (list && list.length > 0 ? list.map((roomType, index) => 
        <ListItem key={roomType.id} roomType={roomType} index={index} gotoPrice={this.gotoPrice.bind(this, roomType)} />) : noData);
    }

    /** 
     * 全选切换
    */
    switchCheckAll = e => {
        const { dispatch, roomTypeModel } = this.props;
        const { list } = roomTypeModel;
        let param = [];

        if(list && list.length > 0 && e.target.checked) {
            param = list.map(item => item.id);
        }

        dispatch({
            type: 'roomTypeModel/updateChecked',
            data: param,
        });
    }

    /** 
     * 单个项目切换
    */
    switchCheckItem = (checkedIds) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'roomTypeModel/updateChecked',
            data: checkedIds,
        });
    }

    /**
     * 跳转编辑房型页面
     */
    updateRoomType = () => {
        const { history } = this.props;

        history.push({ pathname: "/app/business/roomTypes/edit", state: {} });
    }

    /** 
     * 批量删除
    */
    deleteGroup = () => {
        const { roomTypeModel } = this.props;
        const { checkedIds } = roomTypeModel;

        if(checkedIds.length > 0) {
            Modal.confirm({
                cancelText: '取消',
                title: '温馨提示',
                content: `您已选中【${checkedIds.length}】项房型，执行删除操作，确认是否继续执行？`,
                okText: '确认',
                onOk: () => { message.success('待开发！！！') },
            });
        }
    }

    /** 
     * 跳转到价格日历
    */
    gotoPrice = (roomType) => {
        const { history } = this.props;

        history.push({ pathname: '/app/business/roomPrice', state: { id: roomType.id } });
    }

    render() {
        const { roomTypeModel, history } = this.props;
        const CheckGroup = Checkbox.Group;
        const pageConfig = {
            total: roomTypeModel.total,
            defaultCurrent: 1,
            defaultPageSize: roomTypeModel.pageSize,
            showTotal: total => {
                const totalPage = Math.ceil(total / roomTypeModel.pageSize);

                return (
                    <div>
                        <span className='currentPage'>{roomTypeModel.pageNo}</span>
                        <span className='split'>/</span>
                        <span>{totalPage}</span>
                    </div>
                );
            },
            onChange: (page, pageSize) => {
                this.getList({
                    pageIndex: page,
                    pageSize: roomTypeModel.pageSize
                });
            }
        };

        return (
            <div className='roomTypes'>
                <div className='item_0 m-b-10'>
                    <SearchForm checkedIds={roomTypeModel.checkedIds} 
                        deleteGroup={this.deleteGroup} updateRoomType={this.updateRoomType}
                    />
                </div>
                <div className='item_1 flex-col list'>
                    <div className='item_0'>
                        <div className='listHead'>
                            <span className='item w-1 fir'>
                                <Checkbox onChange={this.switchCheckAll} />
                            </span>
                            <span className='item w-1-5'>房型名称</span>
                            <span className='item w-1-5'>市场价（元）</span>
                            <span className='item w-1-5'>押金（元）</span>
                            <span className='item w-1-5'>房间数量</span>
                            <span className='item w-1'>可入住人数</span>
                            <span className='item w-2'>操作</span>
                            <span className='clear'></span>
                        </div>
                    </div>
                    <div className='item_1 listBody pos-r'>
                        <CheckGroup className='w-full' value={roomTypeModel.checkedIds}
                        onChange={this.switchCheckItem}>
                        {this.renderList(roomTypeModel.list)}
                        </CheckGroup>
                    </div>
                    <div className='item_0 pagination flex-row'>
                        <span className='row-0 p-l-10'>
                            已选中【<span className='txt-bold'>{roomTypeModel.checkedIds.length}</span>】项
                        </span>
                        <span className='row-1'>
                            <Pagination 
                            {...pageConfig}
                            />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
};

export default RoomTypes;