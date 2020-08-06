<template>
  <div class="clearfix chart__main">
    <div class="clearfix">
      <div class="fl chart-contain">
        <div class="chart-title">
          下行最大激活DRB数+下行平均激活DRB数
        </div>
        <div
          id="chart5G"
          class="chart"
        ></div>
      </div>
      <div class="fl chart-contain">
        <div class="chart-title">
          小区最大发射功率+小区平均发射功率
        </div>
        <div
          id="chartTB"
          class="chart"
        ></div>
      </div>
      <div class="fl">
        <div class="chart-title">
          小区RB上行平均干扰电平
        </div>
        <div
          id="chartPRC2"
          class="chart"
        ></div>
      </div>
    </div>
    <div class="clearfix">
      <div class="fl chart-contain">
        <div class="chart-title">
          上行PRB占用率+下行PRB占用率
        </div>
        <div
          id="chartPUPD"
          class="chart"
        ></div>
      </div>
      <div class="fl chart-contain">
        <div class="chart-title">
          干扰_全带宽+干扰_D1+干扰_D2
        </div>
        <div
          id="chartWXQHSX"
          class="chart"
        ></div>
      </div>
      <div class="fl">
        <div class="chart-title">
          pdcp下行流量+pdcp上行流量
        </div>
        <div
          id="chartPRB2"
          class="chart"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      kpiParams: {
        projectId: 136,
        kpiType: 2, //指标类型(1:4G 2:5G 3:数据感知 4：语音感知)不传查所有类型
      },
      chartParams: {
        projectId: 136,  //项目id  
        kpiIdList: '',// 指标编号 ，由逗号隔开
        kpiType: 2, // 指标类型, (1:4G  2:5G  3:数据感知 4:Votle语音)
      },
      // 5g
      chart5G: '',
      chartTB: '',
      chartPRC2: '',
      chartPUPD: '',
      chartWXQHSX: '',
      chartPRB2: '',
      chart5G_kpiNameList: ['下行最大激活DRB数', '下行平均激活DRB数'],
      chartTB_kpiNameList: ['小区最大发射功率', '小区平均发射功率'],
      chartPRC2_kpiNameList_show: ['全带宽', 'D1', 'D2', 'D4', 'D5', 'D6'],
      chartPRC2_kpiNameList: ['小区RB上行平均干扰电平_全带宽', '小区RB上行平均干扰电平_D1', '小区RB上行平均干扰电平_D2', '小区RB上行平均干扰电平_D4', '小区RB上行平均干扰电平_D5', '小区RB上行平均干扰电平_D6'],
      chartPUPD_kpiNameList: ['上行业务信息PRB占用率', '下行业务信息PRB占用率'],
      chartWXQHSX_kpiNameList: ['是否存在干扰_全带宽', '是否存在干扰_D1', '是否存在干扰_D2'],
      chartPRB2_kpiNameList: ['pdcp下行流量', 'pdcp上行流量'],
    }
  },
  mounted() {

    // 5g
    this.initChart5G();
    this.initChartTB();
    this.initChartPRC2();
    this.initChartPUPD();
    this.initChartWXQHSX();
    this.initChartPRB2();
    // 获取图表数据
    this.getKpiList(this.kpiParams);
  },
  methods: {
    /**
     * 获取图表名称列表
     */
    getKpiList(params) {
      this.$api.getKpiList(params).then((resp) => {
        let curData = resp.data;
        this.getKpiChartData(this.chart5G_kpiNameList, curData, (xyData) => {
          this.axiosChart5G(xyData);
        })
        this.getKpiChartData(this.chartTB_kpiNameList, curData, (xyData) => {
          this.axiosChartTB(xyData);
        })
        this.getKpiChartData(this.chartPRC2_kpiNameList, curData, (xyData) => {
          this.axiosChartPRC2(xyData);
        })
        this.getKpiChartData(this.chartPUPD_kpiNameList, curData, (xyData) => {
          this.axiosChartPUPD(xyData);
        })
        this.getKpiChartData(this.chartWXQHSX_kpiNameList, curData, (xyData) => {
          this.axiosChartWXQHSX(xyData);
        })
        this.getKpiChartData(this.chartPRB2_kpiNameList, curData, (xyData) => {
          this.axiosChartPRB2(xyData);
        })
      })
    },
    /**
     * 获取图表数据
     */
    getKpiChartData(curKpiNames, allKpiNames, callback) {
      let kpiIds = [];
      let params = {};
      let chartDataY = [];
      let chartDataX = [];
      curKpiNames.filter((value) => {
        allKpiNames.filter((item) => {
          if (value === item.kpi_name) {
            kpiIds.push(item.kpi_num)
          }
        })
      })
      params = Object.assign({}, this.chartParams, { kpiIdList: kpiIds.join(',') })
      this.$api.getEchartData(params).then((resp) => {
        let curData = resp.data;
        curKpiNames.filter((value, index) => {
          let y = []
          curData.filter((item) => {
            let num = item['kpiData' + (index + 1)]
            y.push(num)
            if (index === 0) {
              chartDataX.push(item['time'])
            }
          })
          chartDataY.push(y)
        })
        callback({
          x: chartDataX,
          y: chartDataY
        })
      })
    },
    /**
     * 数据处理-人数曲线图-获取x y 数据
     */
    geXYData(array) {
      let x = []
      let y = [];
      array.filter(function (value) {
        x.push(value.realTime)
        y.push(Number(value.people))
      })
      return {
        x: x,
        y: y
      }
    },
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
          data: this.chart5G_kpiNameList
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
            name: this.chart5G_kpiNameList[0],
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#0e6976'
            },
            data: []
          },
          {
            name: this.chart5G_kpiNameList[1],
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#0076e3'
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
    axiosChart5G(xyData) {
      this.chart5G.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        },
        {
          data: xyData.y[1]
        },]
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
          data: this.chartTB_kpiNameList
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
            name: this.chartTB_kpiNameList[0],
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#3b97cc'
            },
            data: []
          },
          {
            name: this.chartTB_kpiNameList[1],
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
    axiosChartTB(xyData) {
      this.chartTB.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }, {
          data: xyData.y[1]
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
          data: this.chartPRC2_kpiNameList_show
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
            name: this.chartPRC2_kpiNameList_show[0],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              // color: '#4896ee'
            },
            data: []
          },
          {
            name: this.chartPRC2_kpiNameList_show[1],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            // itemStyle: { // 柱条
            //   color: '#189896'
            // },
            data: []
          },
          {
            name: this.chartPRC2_kpiNameList_show[2],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            // itemStyle: { // 柱条
            //   color: '#189896'
            // },
            data: []
          },
          {
            name: this.chartPRC2_kpiNameList_show[3],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            // itemStyle: { // 柱条
            //   color: '#189896'
            // },
            data: []
          },
          {
            name: this.chartPRC2_kpiNameList_show[4],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            // itemStyle: { // 柱条
            //   color: '#189896'
            // },
            data: []
          },
          {
            name: this.chartPRC2_kpiNameList_show[5],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            // itemStyle: { // 柱条
            //   color: '#189896'
            // },
            data: []
          }

        ]
      };
      this.chartPRC2.setOption(option);
    },
    /**
     * @description 获取数据-5g性能-PRC连接数+峰值用户数+无线接通率
     */
    axiosChartPRC2(xyData) {
      this.chartPRC2.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }, {
          data: xyData.y[1]
        }, {
          data: xyData.y[2]
        }, {
          data: xyData.y[3]
        }, {
          data: xyData.y[4]
        }, {
          data: xyData.y[5]
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
          data: this.chartPUPD_kpiNameList
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
            name: this.chartPUPD_kpiNameList[0],
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
            name: this.chartPUPD_kpiNameList[1],
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
    axiosChartPUPD(xyData) {
      this.chartPUPD.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }, {
          data: xyData.y[1]
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
          data: this.chartWXQHSX_kpiNameList
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
            name: this.chartWXQHSX_kpiNameList[0],
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
            name: this.chartWXQHSX_kpiNameList[1],
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
            name: this.chartWXQHSX_kpiNameList[2],
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
    axiosChartWXQHSX(xyData) {
      this.chartWXQHSX.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }, {
          data: xyData.y[1]
        }, {
          data: xyData.y[2]
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
          data: this.chartPRB2_kpiNameList
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
            name: this.chartPRB2_kpiNameList[0],
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
            name: this.chartPRB2_kpiNameList[1],
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
    axiosChartPRB2(xyData) {
      this.chartPRB2.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }, {
          data: xyData.y[1]
        }]
      })
    },
  }
}
</script>

<style scoped>
.chart__main {
  padding-top: 73px;
  box-sizing: content-box;
}
.chart-contain {
  margin-right: 135px;
  margin-bottom: 136px;
}

.chart {
  width: 495px;
  height: 270px;
}

.chart-title {
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 36px;
}
</style>