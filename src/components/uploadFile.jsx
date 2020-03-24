import React, { Component } from 'react';
import { Upload, Modal, Icon } from 'antd';

import './uploadFile.less';

class UploadFile extends Component {
    constructor(props) {
        super(props);

        this.uploadInfo = {
            dev: 'http://10.88.201.253:3010',
            test: '',
            pro: '',
        }
        this.state = {
            isUploading: false,
            fileList: [], // 已上传的文件
            options: {
                maxSize: 2, // 单位M，单张照片的最大大小
                maxCnt: 5, // 最大上传数量
                acceptType: 'image/bmp, image/jpg, image/png, image/jpeg', // 可上传图片类型
                type: 1, // 默认上传文件类型，1 图片
                isMultiple: false,
                btnTxt: '上传图片'
            },
            isPreview: false,
            previewFile: {},
        };
    }

    /** 
     * 检测上传文件
    */
    checkFile = () => {
        
    }

    /**
     * 点击文件链接或者预览图标的回掉
     */
    previewFile = file => {
        if(file) {
            this.setState({ previewFile: file, isPreview: true });
        }
    }

    /** 
     * 上传文件状态改变时的回掉
    */
    fileStateUpdate = (res) => {
        const { fileList } = res;

        this.setState({ fileList });
    }

    /** 
     * 删除文件
    */
    deleteFile = file => {
        console.log(file)
    }

    /** 
     * 渲染upload的button
    */
    renderUpoloadbtn = () => {
        const { options } = this.state;

        return (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">{options.btnTxt}</div>
            </div>
        );
    }

    /** 
     * 取消预览
    */
    cancelPreview = () => {
        this.setState({ previewFile: {}, isPreview: false })
    }

    /**
     * 上传文件
     */
    uploadFile = (files) => {
        console.log(files);
    }

    render() {
        const { fileList, options, isPreview, previewFile } = this.state;
        
        return (
            <div>
                <Upload
                action={`${this.uploadInfo[process.env.ENV]}/common/upload`}
                listType='picture-card'
                fileList={fileList}
                headers={{
                    Authorization: localStorage.getItem('_auth_token_')
                }}
                multiple={options.isMultiple}
                beforeUpload={this.checkFile}
                onPreview={this.previewFile}
                onChange={this.fileStateUpdate}
                onRemove={this.deleteFile}
                >
                    {
                        fileList.length > options.maxCnt ? null : this.renderUpoloadbtn()
                    }
                </Upload>
                <Modal
                visible={isPreview}
                footer={null}
                onCancel={this.cancelPreview}
                >
                    <img alt='无图片' style={{ width: '100%' }} src={previewFile.url} />
                </Modal>
            </div>
        );
    }
}

export default UploadFile;