<template>
  <div class="main-center-contain clearfix">
    <div class="main-center-contain-left fl">
      <ul
        class="zcl"
        style="margin-top: 52px;"
      >
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON1.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE语音话务量</span>
            <span class="list-data">12321</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON2.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE语音话接通率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON3.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE语音掉线率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
      </ul>
      <ul class="zcl">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON4.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE视频话务量</span>
            <span class="list-data">12321</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON5.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE视频接通率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON6.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE视频掉线率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
      </ul>
      <ul class="zcl">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON7.png"
          >
          <p class="zl-box">
            <span class="list-name">SRVCC切换成功率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON8.png"
          >
          <p class="zl-box">
            <span class="list-name">PDCCH信道CCE利用率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="main-center-contain-right fr">
      <div class="clearfix">
        <div class="fl chart-left-contain-top">
          <div class="chart-title">上下行流量+无线利用率</div>
          <div
            id="chartSX"
            class="chart"
          ></div>
        </div>
        <div class="fr">
          <div class="chart-title">PRC连接数+峰值用户数+无线接通率</div>
          <div
            id="chartPRC"
            class="chart"
          ></div>
        </div>
      </div>
      <div class="clearfix">
        <div class="fl chart-left-contain">
          <div class="chart-title">无线掉线率+切换成功率+上行干扰电平</div>
          <div
            id="chartWX"
            class="chart"
          ></div>
        </div>
        <div class="fr">
          <div class="chart-title"> PRB上下行利用率 </div>
          <div
            id="chartPRB"
            class="chart"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { chartData,chartDataX,chartData1,
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
            chartSX: '',
            chartPRC: '',
            chartWX: '',
            chartPRB: '',
        }
    },
    mounted(){
         // 4g图表
        this.initChartSX();
        this.axiosChartSX();
        this.initChartPRC();
        this.axiosChartPRC();
        this.initChartWX();
        this.axiosChartWX();
        this.initChartPRB();
        this.axiosChartPRB();
        // this.initChartPIE();
        // this.axiosChartPIE();
    },
    methods:{
        /**
         * @description 初始化-4G性能-上下行流量+无线利用率
         */
        initChartSX () {
            this.chartSX = echarts.init(document.getElementById('chartSX'));
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
                    data: ['上行', '下行', '无线利用率']
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
                        type: 'bar',
                        itemStyle: { // 柱条
                            color: '#3b97cc'
                        },
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'bar',
                        itemStyle: { // 柱条
                            color: '#0076e3'
                        },
                        data: []
                    },
                    {
                        name: '无线利用率',
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
            this.chartSX.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-上下行流量+无线利用率
        */
        axiosChartSX (params) {
            this.chartSX.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-4G性能-PRC连接数+峰值用户数+无线接通率
         */
        initChartPRC () {
            this.chartPRC = echarts.init(document.getElementById('chartPRC'));
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
                    data: ['RC连接数', '峰值用户数', '无限连通率']
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
                        name: 'RC连接数',
                        type: 'bar',
                        // xAxisIndex: 1, // 对应坐标轴
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#4896ee'
                        },
                        data: []
                    },
                    {
                        name: '峰值用户数',
                        type: 'bar',
                        itemStyle: { // 折线拐点
                            color: '#189896'
                        },
                        lineStyle: {// 折线
                            color: '#189896'
                        },
                        data: []
                    },
                    {
                        name: '无限连通率',
                        type: 'line',
                        areaStyle: {
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
                        itemStyle: { // 折线拐点
                            color: '#3ab6d2'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartPRC.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-PRC连接数+峰值用户数+无线接通率
        */
        axiosChartPRC (params) {
            this.chartPRC.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData
                }, {
                    data: chartData
                }, {
                    data: chartData
                }]
            })
        },
        /**
         * @description 初始化-4G性能-无线掉线率+切换成功率+上行干扰电平
         */
        initChartWX () {
            this.chartWX = echarts.init(document.getElementById('chartWX'));
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
                    data: ['无线掉线率', '切换成功率', '上行干扰电平']
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
                    },
                ],
                series: [
                    {
                        name: '无线掉线率',
                        type: 'line',
                        // xAxisIndex: 1, // 对应坐标轴
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#aefbbe'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2',
                            type: "dotted"
                        },
                        data: []
                    },
                    {
                        name: '切换成功率',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#238aaf' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        itemStyle: { // 折线拐点
                            color: '#3ab6d2'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    },
                    {
                        name: '上行干扰电平',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#238b8f' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        itemStyle: { // 折线拐点
                            color: '#3ab6d2'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartWX.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-无线掉线率+切换成功率+ 上行干扰电平
        */
        axiosChartWX (params) {
            this.chartWX.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData1
                }, {
                    data: chartData2
                }, {
                    data: chartData3
                }]
            })
        },
        /**
         * @description 初始化-4G性能-PRB上下行利用率
         */
        initChartPRB () {
            this.chartPRB = echarts.init(document.getElementById('chartPRB'));
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
                    data: ['上行', '下行']
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
                        name: '上行',
                        type: 'line',
                        // xAxisIndex: 1, // 对应坐标轴
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0c324f' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        yAxisIndex: 1, // 对应坐标轴
                        itemStyle: { // 柱条
                            color: '#4457a4'
                        },
                        data: []
                    },
                    {
                        name: '下行',
                        type: 'line',
                        areaStyle: {
                            color: {
                                type: 'linear',
                                // x: 0,
                                // y: 0,
                                // x2: 0,
                                // y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#0a4051' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'transparent' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        itemStyle: { // 折线拐点
                            color: '#3ab6d2'
                        },
                        lineStyle: {// 折线
                            color: '#3ab6d2'
                        },
                        symbol: "circle",// 实心圆
                        data: []
                    }
                ]
            };
            this.chartPRB.setOption(option);
        },
        /**
        * @description 获取数据-4G性能-PRB上下行利用率
        */
        axiosChartPRB (params) {
            this.chartPRB.setOption({
                xAxis: [
                    {
                        data: chartDataX
                    }
                ],
                series: [{
                    data: chartData1
                }, {
                    data: chartData2
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