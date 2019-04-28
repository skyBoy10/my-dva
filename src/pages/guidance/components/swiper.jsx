import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Swiper from 'swiper/dist/js/swiper.js';

import 'swiper/dist/css/swiper.min.css';
import './swiper.less';

let mySwiper = null;

@connect(({ guidance }) => ({ guidance }))
class cusSwipers extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        mySwiper = new Swiper('.swiper-container', {
            init: false,
            effect: 'cube',
            cubeEffect: {
                slideShadows: false,
                shadow: false,
                shadowOffset: 100,
                shadowScale: 0.6
            },
            autoplay: true,
            loop: true,
            loopAdditionalSlides: 1,
            delay: 3000,
            clickable: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });

        dispatch({
            type: 'guidance/getList',
            data: ''
        }).then(res => {
            mySwiper.init();
            mySwiper.params.pagination.clickable = true ;
            //此外还需要重新初始化pagination
            mySwiper.pagination.destroy()
            mySwiper.pagination.init()
        })
    }
    
    componentWillMount() {
        mySwiper && mySwiper.destroy();
    }

    render() {
        const { guidance } = this.props;

        return (
            <div className='cus-swiper'>
                <div className='sw-body l-h-40'>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {
                                guidance.list.map(item => {
                                    return (<div key={item.id} className="swiper-slide">
                                        {
                                            item.children.map(detail => {
                                                return (<div key={detail.id} className='flex-row'>
                                                    <span className='row-0 w-100'>{detail.code}</span>
                                                    <span className='row-1'>{detail.name}</span>
                                                </div>)
                                            })
                                        }
                                    </div>)
                                })
                            }
                        </div>
                        <div className='swiper-pagination'></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default cusSwipers;