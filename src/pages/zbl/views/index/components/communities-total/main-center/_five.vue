<template>
  <div class="main-center-contain clearfix five-g">
    <div class="clearfix five-g-contain-top">
      <div class="fl chart-left-contain-top">
        <div class="chart-title">5G用户量</div>
        <div
          class="chart"
          id="chart5G"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">上下行流量+无线利用率</div>
        <div
          class="chart"
          id="chartTB"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">PRC连接数+峰值用户数+无线接通率</div>
        <div
          class="chart"
          id="chartPRC2"
        ></div>
      </div>
    </div>
    <div class="clearfix">
      <div class="fl chart-left-contain-top">
        <div class="chart-title">上下PUSCH行流量+下行PDCCH利用率</div>
        <div
          class="chart"
          id="chartPUPD"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">无线掉线率+切换成功率+上行干扰电平</div>
        <div
          class="chart"
          id="chartWXQHSX"
        ></div>
      </div>
      <div class="fl ">
        <div class="chart-title">PRB上下行利用率</div>
        <div
          class="chart"
          id="chartPRB2"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {  chartData, chartDataX,chartDataX1, chartData1,
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
  data() {
    return {
      // 5g
      chart5G: '',
      chartTB: '',
      chartPRC2: '',
      chartPUPD: '',
      chartWXQHSX: '',
      chartPRB2: '',
    }
  },
  mounted() {
    // 5g
    this.initChart5G();
    this.axiosChart5G();
    this.initChartTB();
    this.axiosChartTB();
    this.initChartPRC2();
    this.axiosChartPRC2();
    this.initChartPUPD();
    this.axiosChartPUPD();
    this.initChartWXQHSX();
    this.axiosChartWXQHSX();
    this.initChartPRB2();
    this.axiosChartPRB2();
  },
  methods: {
    /**
    * @description 初始化-5g性能-5g用户量
    */
    initChart5G() {
      this.chart5G = echarts.init(document.getElementById('chart5G'));
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
          data: ['5G用户量']
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
            name: '5G用户量',
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
      this.chart5G.setOption(option);
    },
    /**
    * @description 获取数据-5g性能-5g用户量
    */
    axiosChart5G(params) {
      this.chart5G.setOption({
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
     * @description 初始化-5g性能-上下行流量+无线利用率
     */
    initChartTB() {
      this.chartTB = echarts.init(document.getElementById('chartTB'));
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
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#3b97cc'
            },
            data: []
          },
          {
            name: '下行',
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
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
      this.chartTB.setOption(option);
    },
    /**
     * @description 初始化-获取数据-上下行流量+无线利用率
     */
    axiosChartTB(params) {
      this.chartTB.setOption({
        xAxis: [
          {
            data: chartDataX1
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
     * @description 初始化-5g性能-PRC连接数+峰值用户数+无线接通率
     */
    initChartPRC2() {
      this.chartPRC2 = echarts.init(document.getElementById('chartPRC2'));
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
          data: ['PRC连接数', '峰值用户数', '无线接通率']
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
            name: 'PRC连接数',
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#4896ee'
            },
            data: []
          },
          {
            name: '峰值用户数',
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#189896'
            },
            data: []
          },
          {
            name: '无线接通率',
            type: 'line',
            itemStyle: { // 折线拐点
              color: '#09b395'
            },
            lineStyle: {// 折线
              color: '#09b395'
            },
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
            symbol: "circle",// 实心圆
            data: []
          }
        ]
      };
      this.chartPRC2.setOption(option);
    },
    /**
     * @description 获取数据-5g性能-PRC连接数+峰值用户数+无线接通率
     */
    axiosChartPRC2(params) {
      this.chartPRC2.setOption({
        xAxis: [
          {
            data: chartDataX1
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
     * @description 初始化-5g性能-上下PUSCH行流量+下行PDCCH利用率
     */
    initChartPUPD() {
      this.chartPUPD = echarts.init(document.getElementById('chartPUPD'));
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
          data: ['上下PUSCH行流量', '下行PDCCH利用率']
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
            name: '上下PUSCH行流量',
            type: 'line',
            itemStyle: { // 柱条
              color: '#134b76'
            },
            lineStyle: { // 柱条
              color: 'transparent'
            },
            areaStyle: {
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
            symbol: "circle",
            data: []
          },
          {
            name: '下行PDCCH利用率',
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
      this.chartPUPD.setOption(option);
    },
    /**
     * @description 获取数据-5g性能-上下PUSCH行流量+下行PDCCH利用率
     */
    axiosChartPUPD(params) {
      this.chartPUPD.setOption({
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
     * @description 初始化-5g性能-无线掉线率+切换成功率+上行干扰电平
     */
    initChartWXQHSX() {
      this.chartWXQHSX = echarts.init(document.getElementById('chartWXQHSX'));
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
            name: '无线掉线率',
            type: 'line',
            itemStyle: { // 柱条
              color: '#20868d'
            },
            lineStyle: {
              color: 'transparent'
            },
            areaStyle: {
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
            name: '切换成功率',
            type: 'line',
            itemStyle: { // 柱条
              color: '#145f85'
            },
            lineStyle: {
              color: 'transparent'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#145f85' // 0% 处的颜色
                }, {
                  offset: 0.5, color: '#145f85' // 100% 处的颜色
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
            name: '上行干扰电平',
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
      this.chartWXQHSX.setOption(option);
    },
    /**
     * @description 获取数据-5g性能-无线掉线率+切换成功率+上行干扰电平
     */
    axiosChartWXQHSX(params) {
      this.chartWXQHSX.setOption({
        xAxis: [
          {
            data: chartDataX1
          }
        ],
        series: [{
          data: chartData9
        }, {
          data: chartData1
        }, {
          data: chartData7
        }]
      })
    },
    /**
    * @description 初始化-5g性能-上行+下行
    */
    initChartPRB2() {
      this.chartPRB2 = echarts.init(document.getElementById('chartPRB2'));
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
            itemStyle: {
              color: '#248bb1'
            },
            areaStyle: {
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
            itemStyle: {
              color: '#21568c'
            },
            areaStyle: {
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
      this.chartPRB2.setOption(option);
    },
    /**
    * @description 初始化-5g性能-上行+下行
    */
    axiosChartPRB2(params) {
      this.chartPRB2.setOption({
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
.main-center .five-g-contain-top {
  margin-bottom: 128px;
}

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

.zl-box {
  float: left;
  width: 395px;
  height: 46px;
  line-height: 20px;
  background: url("~@/assets/img/zllbg.png") no-repeat;
  background-size: 100%;
  margin-left: 15px;
  vertical-align: middle;
  margin-top: 5px;
  padding: 10px 0 10px 8px;
  box-sizing: border-box;
}

.list-name {
  font-size: 25px;
  color: #abadc1;
}
.list-data {
  font-size: 25px;
  color: #fff;
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
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 34px;
  padding-top: 50px;
}
</style>