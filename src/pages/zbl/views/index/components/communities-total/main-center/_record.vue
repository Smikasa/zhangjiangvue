<template>
  <div
    class="main-center-contain clearfix"
  >
    <div class="clearfix five-g-contain-top">
      <div class="fl chart-left-contain-top">
        <div class="chart-title">HTTP业务成功率+HTTP平均响应延迟</div>
        <div
          class="chart"
          id="chartHTTP"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">上行流量</div>
        <div
          class="chart"
          id="chartT"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">下行流量</div>
        <div
          class="chart"
          id="chartB"
        ></div>
      </div>
    </div>
    <div class="clearfix">
      <div class="fl chart-left-contain-top">
        <div class="chart-title">下行速率+下行速率(>500k)</div>
        <div
          class="chart"
          id="chartKPBS"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">TCP建立成功率+TCP建立平均延时</div>
        <div
          class="chart"
          id="chartTCP"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">TCP建立时延无线侧+TCP建立时延核心侧</div>
        <div
          class="chart"
          id="chartTCP2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { chartData,chartDataX,chartDataX1,chartData1,
  chartData2,
  chartData3,
  chartData4,
  chartData5,
  chartData6,
  chartData7,
  chartData8,
  chartData9,
  chartData10,
  chartData11,
  chartData12,
  chartData13,
  chartData14,
  chartData15,} from '../../../data/data.js';
export default {
    data(){
        return {
             //数据感知
        chartHTTP: '',
        chartT: '',
        chartB: '',
        chartKPBS: '',
        chartTCP: '',
        chartTCP2: '',
        
        }
    },
    mounted(){
        // 数据感知 

            this.initChartHTTP();
            this.axiosChartHTTP();
            this.initChartT();
            this.axiosChartT();
            this.initChartB();
            this.axiosChartB();
            this.initChartKPBS();
            this.axiosChartKPBS();
            this.initChartTCP();
            this.axiosChartTCP();
            this.initChartTCP2();
            this.axiosChartTCP2();
    },
    methods:{
         /**
         * @description 初始化-数据感知-HTTP业务成功率+HTTP平均响应延迟
         */
        initChartHTTP () {
            this.chartHTTP = echarts.init(document.getElementById('chartHTTP'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['HTTP业务成功率','HTTP平均响应延迟']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        // name: '',
                        // max: 30,
                        // min: 0,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                        // boundaryGap: [0.2, 0.2]
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        // max: 1200,
                        // min: 0,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: 'HTTP业务成功率',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#0e6976'
                        },
                        data: []
                    },
                    {
                        name: 'HTTP平均响应延迟',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        // yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#0e6976'
                        },
                        data: []
                    }
                ]
            };
            this.chartHTTP.setOption(option);
        },
         /**
         * @description 获取数据-数据感知-HTTP业务成功率+HTTP平均响应延迟
         */
        axiosChartHTTP (params) {
            this.chartHTTP.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData4
                }]
            })
        },
        /**
         * @description 初始化-数据感知-上行
         */
        initChartT () {
            this.chartT = echarts.init(document.getElementById('chartT'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['上行']
                },
                // dataZoom: {
                //     show: false,
                //     start: 0,
                //     end: 100
                // },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        // name: '',
                        // max: 30,
                        // min: 0,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                        // boundaryGap: [0.2, 0.2]
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartT.setOption(option);
        },
        /**
         * @description 初始化-获取数据-上行
         */
        axiosChartT (params) {
            this.chartT.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-数据感知-下行
         */
        initChartB () {
            this.chartB = echarts.init(document.getElementById('chartB'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['下行']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '下行',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#4c94ae' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartB.setOption(option);
        },
        /**
         * @description 获取数据-数据感知-PRC连接数+峰值用户数+无线接通率
         */
        axiosChartB (params) {
            this.chartB.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-数据感知-下行速率+下行速率(>500k)
         */
        initChartKPBS () {
            this.chartKPBS = echarts.init(document.getElementById('chartKPBS'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['下行速率', '下行速率(>500k)']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '下行速率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#134b76'
                        },
                        lineStyle: { // 柱条
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#134b76' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#134b76' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol:"circle",
                        data: []
                    },
                    {
                        name: '下行速率(>500k)',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartKPBS.setOption(option);
        },
        /**
         * @description 获取数据-数据感知-上下PUSCH行流量+下行PDCCH利用率
         */
        axiosChartKPBS (params) {
            this.chartKPBS.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData10
                }, {
                    data: chartData11
                }]
            })
        },
        /**
         * @description 初始化-数据感知-TCP建立成功率+TCP建立平均延时
         */
        initChartTCP () {
            this.chartTCP = echarts.init(document.getElementById('chartTCP'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['TCP建立成功率', 'TCP建立平均延时']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: 'TCP建立成功率',
                        type: 'line',
                        itemStyle: { // 柱条
                            color: '#20868d'
                        },
                        lineStyle:{
                            color: 'transparent'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#20868d' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#20868d' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",
                        data: []
                    },
                    {
                        name: 'TCP建立平均延时',
                        type: 'line',
                        itemStyle: { // 折线拐点
                            color: '#09b395'
                        },
                       
                        lineStyle: {// 折线
                            color: '#09b395'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartTCP.setOption(option);
        },
        /**
         * @description 获取数据-数据感知-TCP建立成功率+TCP建立平均延时
         */
        axiosChartTCP (params) {
            this.chartTCP.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData9
                }, {
                    data: chartData1
                }]
            })
        },
         /**
         * @description 初始化-数据感知-TCP建立时延无线侧+TCP建立时延核心侧
         */
        initChartTCP2 () {
            this.chartTCP2 = echarts.init(document.getElementById('chartTCP2'));
            let option = {
                title: {
                    text: '',//标题
                    subtext: ''// 副标题
                },
                textStyle: {
                    fontFamily: 'SimHei'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                legend: {
                    left: 0,
                    itemGap: 35,
                    inactiveColor: '#575b61',// 图例关闭时颜色
                    data: ['TCP建立时延无线侧', 'TCP建立时延核心侧']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: {
                            color: '#575b61'
                        },
                        boundaryGap: true,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    },
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#575b61'
                        },
                        minInterval: 1,// 数值取整
                        scale: true,
                        splitLine: {
                            show: false     //去掉网格线
                        },
                    }
                ],
                series: [
                    {
                        name: '上行',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#248bb1'
                        },
                        itemStyle:{
                            color: '#248bb1'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#248bb1' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#248bb1' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'line',
                        lineStyle: { // 柱条
                            color: '#21568c'
                        },
                        itemStyle:{
                            color: '#21568c'
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#21568c' // 0% 处的颜色
                                }, {
                                    offset: 0.5, color: '#21568c' // 100% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartTCP2.setOption(option);
        },
         /**
         * @description 初始化-数据感知-TCP建立时延无线侧+TCP建立时延核心侧
         */
        axiosChartTCP2 (params) {
            this.chartTCP2.setOption({
                xAxis: [
                    {
                        data: chartDataX1
                    }
                ],
                series: [{
                    data: chartData5
                }, {
                    data: chartData12
                }]
            })
        },
    }

}
</script>

<style scoped>
.main-center-contain-left ul.zcl {
  list-style-type: none;
  background: url("~@/assets/img/1-2.png");
  background-size: 100%;
  width: 475px;
  height: 247px;
  margin-bottom: 88px;
  padding: 20px 0;
  box-sizing: border-box;
}
.main-center-contain-left ul.zcl > li {
  height: 50px;
  padding-left: 15px;
  margin-bottom: 30px;
  display: block;
  overflow: hidden;
}
.main-center-contain-left ul.zcl > li:last-child {
  margin-bottom: 0;
}
.main-center-contain-left ul.zcl > li span {
  display: inline-block;
}
.main-center-contain-left ul.zcl > li .list-icon {
  width: 46px;
  height: 46px;
  float: left;
  vertical-align: middle;
}


.zl-box{
    float:left;
    width:395px;
    height: 46px;
    line-height: 20px;
    background: url("~@/assets/img/zllbg.png") no-repeat;
    background-size: 100%;
    margin-left: 15px;
    vertical-align: middle;
    margin-top: 5px;
    padding:10px 0 10px 8px;
    box-sizing: border-box;
}


.list-name{
    font-size:25px;
    color:#abadc1;
}
.list-data{
    font-size:25px;
    color:#fff;
    font-weight: 700;
    float: right;
    margin-right: 42px;
}

.main-center-contain-right .chart-left-contain-top {
    margin-right: 100px;
    margin-bottom: 135px;
}

 .main-center-contain-right .chart-left-contain {
    margin-right: 100px;
}


.chart {
    width: 495px;
    height: 270px;
}

.main-center-contain-right .chart {
    width: 495px;
    height: 270px;
    /* margin-bottom: 100px; */
}
.chart-title {
    color: #fffFFF;
    font-size: 28px;
    margin-bottom: 34px;
    padding-top: 50px;
}
</style>