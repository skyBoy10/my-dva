import React, { Component } from 'react'
import { Tree, Input } from 'antd';
import { connect } from 'dva';

/** 
 * 引入自定义请求方式
*/
import * as cusHttp from '../../fetch/cusHttp';

class userTree extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'tree/getTreeNodes',
            data: {type: 1}
        })
    }
    /** 
     * 处理节点选中事件
    */
    handleSelect = (key, selectedNode) => {
        this.props.dispatch(
            {
                type: 'tree/updateCurrentNode',
                data: selectedNode.node.props.dataRef
            }
        );
    }
    /** 
     * 获取节点数据
    */
    getNodeData = (treeNode) => {
        if(treeNode.props.children && treeNode.props.children.length > 0) return; //已有孩子节点不需要重新请求
        const type = treeNode.props.dataRef.isLeaf ? 1 : 2;
        return cusHttp.post('/user/getTreeNodes', {type: type, id: treeNode.props.dataRef.id}).then(res => {
            this.props.dispatch({
                type: 'tree/updateTreeData',
                data: {
                    id: treeNode.props.dataRef.id,
                    list: res
                }
            });
        });
    }
    /** 
     * 渲染子节点
    */
    renderTreeNodes = (data) => {
        const TreeNode = Tree.TreeNode;
        return data.map(item => {
            if(item.children) {
                return (
                    <TreeNode title={item.title} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }

            return (<TreeNode {...item} dataRef={item} key={item.id} />);
        })
    }
    render() {
        const Search = Input.Search;
        const { data } = this.props.tree;
        
        return (
            <div className='w-full h-full pos-r'>
                <Search placeholder='输入关键词' />
                <div className='scroll-y pos-ab l-0 r-0 b-0 t-35'>
                    <Tree
                    showLine
                    loadData={this.getNodeData}
                    onSelect={this.handleSelect}>
                        { this.renderTreeNodes(data) }
                    </Tree>
                </div>
            </div>
        );
    };
};

export default connect(({ tree, base, loading }) => ({ tree, base, loading }))(userTree);