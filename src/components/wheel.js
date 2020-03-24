import React, { Component } from 'react';

import './wheel.less';

class Wheel extends Component {
    constructor(props) {
        super(props);
        this.isRotating = false;
        this.state = {
            rotateDeg: 0,
            runAni: 'wheel-run-in'
        }

        this.renderLine = this.renderLine.bind(this);
        this.renderCon = this.renderCon.bind(this);
        this.startRotate = this.startRotate.bind(this);
        this.startDraw = this.startDraw.bind(this);
    }

    /**
     * 开始转动
     */
    startRotate(param) {
        const { finishedCallback, count, list } = this.props;
        const { rotateDeg } = this.state;
        const averageDeg = Math.ceil((360 * 10000) / count) / 10000;
        let deg = 0;
        if(param) {
            const { prizeNo } = param;
            deg = (360 - (averageDeg * prizeNo - Math.ceil(Math.random() * 25 + 10)));    
        } else {
            deg = 360 * 6;
        }

        this.isRotating = true;
        this.setState({ runAni: param ? 'wheel-run-out' : 'wheel-run-in',rotateDeg: (deg + rotateDeg + (360 - rotateDeg % 360)) }, () => {
            if(param) {
                setTimeout(() => {
                    this.isRotating = false;
    
                    if(finishedCallback && typeof(finishedCallback) == 'function') {
                        finishedCallback(list[param.prizeNo - 1]);
                    }
                }, 5500)
            }
        });
    }

    /**
     * 校验是否可以抽奖
     */
    checkIsRotate() {
        const { beforeCallback } = this.props;

        if(beforeCallback && typeof(beforeCallback) == 'function') {
            new Promise((resolve, reject) => {
                beforeCallback(resolve);
            }).then(res => {
                if(!res || !res.isAvailable) {
                    return;
                }
    
                this.startDraw();
            });

            return;
        }

        this.startDraw();
    }

    /** 
     * 开始抽奖
    */
    startDraw() {
        const { getPrizeInfo } = this.props;

        if(this.isRotating) {
            return;
        }

        if(getPrizeInfo && typeof(getPrizeInfo) == 'function') {
            this.startRotate();
            new Promise((resolve, reject) => {
                getPrizeInfo(resolve, reject);
            }).then(res => {
                const { isRotate } = res;
                if(isRotate) {
                    console.log(res)
                    this.startRotate(res);
                }
            }, err => {
                this.isRotating = false;
            });
        }
    }

    /**
     * 渲染大转盘线
     */
    renderLine() {
        const { count } = this.props;
        const averageDeg = Math.ceil((360 * 10000) / count) / 10000;
        const arr = [];
        
        for(let i = 0; i < count; i += 1) {
            arr.push(i);
        }

        if(count && count > 0) {
            return (
                <ul className='wheel-line'>
                    {
                        arr.map((item, index) => {
                            return (
                                <li key={item} className='line-item' style={{ transform: `rotate(${index * averageDeg}deg)` }} />
                            )
                        })
                    }
                </ul>
            );
        }

        return null;
    }

    /** 
     * 渲染奖品内容
    */
    renderCon() {
        const { count, list } = this.props;
        const averageDeg = Math.ceil((360 * 10000) / count) / 10000;
        const itemAverageDeg = Math.ceil((360 * 10000) / (2 * count)) / 10000;
        list.sort((a, b) => a.order > b.order ? 1 : -1);

        if(count && count > 0) {
            return (
                <div className='wheel-list'>
                    {
                        list && list.map((item, index) => {
                            return (
                                <div className='wheel-item' key={item.id}>
                                    <div className='wheel-item-con' style={{ transform: `rotate(${itemAverageDeg + index * averageDeg}deg)` }}>
                                        <div>{item.name}</div>
                                        {
                                            item.url && (
                                                <div><img src={item.url} className='wheel-img' /></div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            );
        }

        return null;
    }

    render() {
        const { rotateDeg, runAni } = this.state;
        const { btnTxt, isEnable } = this.props;

        return (
            <div className='cus-wheel'>
                <div className={`wheel-content ${runAni}`} style={{ transform: `rotate(${rotateDeg}deg)` }}>
                    {this.renderLine()}
                    {this.renderCon()}
                </div>
                <div className={`${ isEnable ? 'wheel-btn wheel-active' : 'wheel-btn wheel-disbale' }`} onClick={this.checkIsRotate.bind(this)}>{btnTxt ? btnTxt : '抽奖'}</div>
            </div>
        )
    }
}

export default Wheel;