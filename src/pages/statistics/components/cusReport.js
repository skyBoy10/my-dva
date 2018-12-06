import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'dva';
import { Spin } from 'antd';

@connect(({ statistics, loading }) => ({ statistics, loading }))
class CusReport extends Component {
    /** 
     * 获取配置
    */
    getOptions = () => {
        let options = '';
        const { type, statistics } = this.props;
        const { assembleData, bargainData, discountData, onlineData, offlineData, pieData, circleData } = statistics.report;
        
        switch (type) {
            case 1:
            case '1':
                options = {
                    title: {
                        text: '活动营收趋势',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 15,
                            lineHeight: 30,
                            height: '30px',
                            verticalAlign: 'middle',
                            align: 'center',
                            width: '100%',
                            color: '#bfbfbf',
                        },
                        top: '0px',
                        subtext: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['拼团','砍价','限时折扣']
                    },
                    xAxis: {
                        type: 'time',
                        minInterval: 3600 * 24 * 1000 //最小刻度一天,
                    },
                    yAxis: {
                        name: '金额(￥)',
                        type: 'value',
                    },
                    series: [
                        {
                            name: '拼团',
                            type: 'line',
                            smooth: true,
                            stack: '拼团',
                            data: assembleData && assembleData.length > 0 ? assembleData.map(item => [item.datetime, item.revenueFee]) : [],
                        }, {
                            name: '砍价',
                            type: 'line',
                            smooth: true,
                            stack: '砍价',
                            data: bargainData && bargainData.length > 0 ? bargainData.map(item => [item.datetime, item.revenueFee]) : [],
                        }, {
                            name: '限时折扣',
                            type: 'line',
                            smooth: true,
                            stack: '限时折扣',
                            data: discountData && discountData.length > 0 ? discountData.map(item => [item.datetime, item.revenueFee]) : [],
                        }
                    ]
                };
                break;
            case 2:
            case '2': 
                options = {
                    title: {
                        text: '营收分布概况',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 15,
                            lineHeight: 30,
                            height: '30px',
                            verticalAlign: 'middle',
                            align: 'center',
                            width: '100%',
                            color: '#bfbfbf',
                        },
                        top: '0px',
                        subtext: '',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data:['拼团','砍价','限时折扣']
                    },
                    series: [
                        {
                            name:'营收概况',
                            type:'pie',
                            radius: ['50%', '70%'],
                            data: pieData && pieData.length > 0 ? pieData.map(item => { return { value: item.total, name: item.name } }) : [],
                        }
                    ],
                };
                break;
            case 3:
            case '3':
                options = {
                    title: {
                        text: '活动营收',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 15,
                            lineHeight: 30,
                            height: '30px',
                            verticalAlign: 'middle',
                            align: 'center',
                            width: '100%',
                            color: '#bfbfbf',
                        },
                        top: '0px',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['拼团','砍价','限时折扣']
                    },
                    xAxis: {
                        type: 'time',
                        minInterval: 3600 * 24 * 1000 //最小刻度一天,
                    },
                    yAxis: {
                        name: '金额(￥)',
                        type: 'value',
                    },
                    series: [
                        {
                            name: '拼团',
                            type: 'bar',
                            stack: '拼团',
                            data: assembleData && assembleData.length > 0 ? assembleData.map(item => [item.datetime, item.revenueFee]) : [],
                        }, {
                            name: '砍价',
                            type: 'bar',
                            stack: '砍价',
                            data: bargainData && bargainData.length > 0 ? bargainData.map(item => [item.datetime, item.revenueFee]) : [],
                        }, {
                            name: '限时折扣',
                            type: 'bar',
                            stack: '限时折扣',
                            data: discountData && discountData.length > 0 ? discountData.map(item => [item.datetime, item.revenueFee]) : [],
                        }
                    ]
                };
                break;
            case 4:
            case '4':
                options = {
                    title: {
                        text: '总营收分布对比',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 15,
                            lineHeight: 30,
                            height: '30px',
                            verticalAlign: 'middle',
                            align: 'center',
                            width: '100%',
                            color: '#bfbfbf',
                        },
                        top: '0px',
                    },
                    tooltip: {},
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                           }
                        },
                        indicator: [
                           { name: '总收入', max: 500000},
                           { name: '人均收益', max: 6000},
                           { name: '总销售额', max: 1000000},
                           { name: '人均销售额', max: 10000},
                           { name: '人均支出', max: 5000},
                           { name: '总支出', max: 20000}
                        ]
                    },
                    legend: {
                        x: 'right',
                        data: ['线上','线下']
                    },
                    series: [
                        {
                            name: '线上 vs 线下',
                            type: 'radar',
                            data: [
                                {
                                    name: '线上',
                                    value: [ circleData.online.grossIncome, circleData.online.perCapita, circleData.online.totalSales,
                                        circleData.online.perSales, circleData.online.perPay, circleData.online.totalPay ]
                                },
                                {
                                    name: '线下',
                                    value: [ circleData.offline.grossIncome, circleData.offline.perCapita, circleData.offline.totalSales,
                                        circleData.offline.perSales, circleData.offline.perPay, circleData.offline.totalPay ]
                                }
                            ],
                        }
                    ]
                };
                
                break;
            case 5:
            case '5':
                options = {
                    title: {
                        text: '营收趋势对比',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 15,
                            lineHeight: 30,
                            height: '30px',
                            verticalAlign: 'middle',
                            align: 'center',
                            width: '100%',
                            color: '#bfbfbf',
                        },
                        top: '0px',
                        subtext: '',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['线下','线上']
                    },
                    xAxis: {
                        type: 'time',
                        minInterval: 3600 * 24 * 1000 //最小刻度一天,
                    },
                    yAxis: {
                        name: '金额(￥)',
                        type: 'value',
                    },
                    series: [
                        {
                            name: '线上',
                            type: 'line',
                            smooth: true,
                            stack: '线上',
                            data: onlineData && onlineData.length > 0 ? onlineData.map(item => [item.datetime, item.fee]) : [],
                        }, {
                            name: '线下',
                            type: 'line',
                            smooth: true,
                            stack: '线下',
                            data: offlineData && offlineData.length > 0 ? offlineData.map(item => [item.datetime, item.fee]) : [],
                        }
                    ]
                };
                break;
            default:
                break;
        }        

        return {
            ...options,
        };
    }

    render() {
        const { loading } = this.props;
        const isLoading = loading.effects['statistics/getReportData'];

        return (
            <div className='h-full'>
                {
                    isLoading ? <div className='h-300 flex-row'><Spin title='加载中...' /></div> : 
                    (<ReactEcharts option={this.getOptions()} style={{height: '300px'}} />)
                }
            </div>
        );
    }
}

export default CusReport;