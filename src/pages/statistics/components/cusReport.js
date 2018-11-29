import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva';
import { Spin } from 'antd';
import Base from '../../base';

@connect(({ statistics, loading }) => ({ statistics, loading }))
class CusReport extends Base {
    /** 
     * 组件挂载
    */
    componentDidMount() {
        const { dispatch, statistics } = this.props;

        dispatch({
            type: 'statistics/getReportData',
            data: {
                startDate: statistics.startDate,
                endDate: statistics.endDate,
            }
        });
    }

    /** 
     * 获取配置
    */
    getOptions = () => {
        let options = '';
        const { type, statistics } = this.props;
        const { assembleData, bargainData, discountData } = statistics.report;
        
        switch (type) {
            case 1:
            case '1':
                options = {
                    xAxis: {
                        type: 'time',
                        minInterval: 3600 * 24 * 1000 //最小刻度一天,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: {
                        type: 'line',
                        smooth: true,
                        data: [{
                            name: '拼团',
                            type: 'line',
                            data: assembleData ? assembleData.map(item => [item.datetime, item.revenueFee]) : [],
                        }, {
                            name: '砍价',
                            type: 'line',
                            data: bargainData ? bargainData.map(item => [item.datetime, item.revenueFee]) : [],
                        }, {
                            name: '限时折扣',
                            type: 'line',
                            data: discountData ? discountData.map(item => [item.datetime, item.revenueFee]) : [],
                        }]
                    }
                };
                break;
            case 2:
            case '2': 
                options = {};
                break;
            default:
                break;
        }        

        return {
            title: {
                text: '营收趋势',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    lineHeight: 30,
                    height: '30px',
                    verticalAlign: 'middle',
                    align: 'center',
                    width: '100%',
                    color: '#bfbfbf',
                },
                left: '40%',
                top: '10px',
                subtext: '',
            },
            xAxis: options.xAxis,
            yAxis: options.yAxis,
            series: options.series,
        };
    }

    render() {
        const { loading } = this.props;
        const isLoading = loading.effects['statistics/getReportData'];

        return (
            <div className='h-full'>
                {
                    isLoading ? <div className='h-300 flex-row'><Spin title='加载中...' /></div> : 
                    (<ReactEcharts option={this.getOptions()} className='h-full' style={{height: '300px'}} />)
                }
            </div>
        );
    }
}

export default CusReport;