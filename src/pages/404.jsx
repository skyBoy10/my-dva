import React from 'react';
import { Icon } from 'antd';

import './404.less';

const NotFound = props => {
    return (
        <div className='pos-ab w-full h-full flex-row notFound'>
            <div>
                <Icon type='frown-o' className='ico' />
            </div>
            <div>
                <div className='num'>404</div>
                <div className='txt'>访问的资源不存在！</div>
            </div>
        </div>
    );
}

export default NotFound;