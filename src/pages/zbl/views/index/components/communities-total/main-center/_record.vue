<template>
  <div class="clearfix">
    <div class="clearfix chart__main">
      <div class="fl chart-contain">
        <div class="chart-title">
          HTTP业务成功率+HTTP平均响应延迟
        </div>
        <div
          id="chartHTTP"
          class="chart"
        ></div>
      </div>
      <div class="fl chart-contain">
        <div class="chart-title">
          上行流量
        </div>
        <div
          id="chartT"
          class="chart"
        ></div>
      </div>
      <div class="fl">
        <div class="chart-title">
          下行流量
        </div>
        <div
          id="chartB"
          class="chart"
        ></div>
      </div>
    </div>
    <div class="clearfix">
      <div class="fl chart-contain">
        <div class="chart-title">
          下行速率+下行速率(>500k)
        </div>
        <div
          id="chartKPBS"
          class="chart"
        ></div>
      </div>
      <div class="fl chart-contain">
        <div class="chart-title">
          TCP建立成功率+TCP建立平均延时
        </div>
        <div
          id="chartTCP"
          class="chart"
        ></div>
      </div>
      <div class="fl">
        <div class="chart-title">
          TCP建立时延无线侧+TCP建立时延核心侧
        </div>
        <div
          id="chartTCP2"
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
        kpiType: 3, //指标类型(1:4G 2:5G 3:数据感知 4：语音感知)不传查所有类型
      },
      chartParams: {
        projectId: 136,  //项目id  
        kpiIdList: '',// 指标编号 ，由逗号隔开
        kpiType: 3, // 指标类型, (1:4G  2:5G  3:数据感知 4:Votle语音)
      },
      //数据感知
      chartHTTP: '',
      chartT: '',
      chartB: '',
      chartKPBS: '',
      chartTCP: '',
      chartTCP2: '',
      // name 
      chartHTTP_kpiNameList:[{name:"HTTP业务成功率",key:"http_service_success_rate"},{name:"HTTP平均响应时延",key:"http_avg_respones_delay"}],
      chartT_kpiNameList:[{name:"上行流量",key:"upload_flow"}],
      chartB_kpiNameList:[{name:"下行流量",key:"download_flow"}],
      chartKPBS_kpiNameList:[{name:"下行速率", key:"download_speed"}, {name:"下行速率(>500KB)",key:"download_speed_500"}],
      chartTCP_kpiNameList:[{name:"TCP建立成功率",key:"tcp_build_success_rate"},{ name:"TCP建立平均时延",key:"tcp_build_avg_delay"}],
      chartTCP2_kpiNameList:[{name:"TCP建立平均时延(无线侧)",key:"tcp_build_avg_delay_wireless"},{name:"TCP建立平均时延(核心网)",key:"tcp_build_avg_delay_core_network"}],
    }
  },
  mounted() {
    // 获取
    // this.initData(this.kpiParams);
    // 数据感知 
    this.initChartHTTP();
    this.initChartT();
    this.initChartB();
    this.initChartKPBS();
    this.initChartTCP();     
    this.initChartTCP2();

     this.initData(this.kpiParams);

  },
  methods: {
    /*数据获取 */
    initData(data) {
       this.$api.getEchartData3({'projectId':this.chartParams.projectId}).then((resp) => {
        let curData = resp.data;
        this.initChartData(curData)
      })
    },
    /**
     * 图标赋值
     */
    initChartData(data){
       this.handleXYData(data,this.chartHTTP_kpiNameList, (xyData) => {
          this.axiosChartHTTP(xyData);
        })
        this.handleXYData(data,this.chartT_kpiNameList, (xyData) => {
          this.axiosChartT(xyData);
        })
        this.handleXYData(data,this.chartB_kpiNameList, (xyData) => {
          this.axiosChartB(xyData);
        })
        this.handleXYData(data,this.chartKPBS_kpiNameList, (xyData) => {
          this.axiosChartKPBS(xyData);
        })
        this.handleXYData(data,this.chartTCP_kpiNameList, (xyData) => {
          this.axiosChartTCP(xyData);
        })
        this.handleXYData(data,this.chartTCP2_kpiNameList, (xyData) => {
          this.axiosChartTCP2(xyData);
        })
    },
    /**
     * 获取图例名称
     */
    getlegendNames(array){
      let arr = [];
      array.filter((value,index)=>{
        arr.push(value.name)
      })
    },
    /**
     * 数据处理-人数曲线图-获取x y 数据
     */
    handleXYData(array,curKpiObj, callback) {
      let chartDataX = []
      let chartDataY = [];
      curKpiObj.filter((obj,i)=>{
        let x = [];
        let y = [];
        array.filter(function (value) {
          x.push(value.dtcreatetime)
          y.push(Number(value[obj.key] ? value[obj.key] : 0))
        })
        chartDataX = x;
        chartDataY.push(y)
      })
      callback({
        x: chartDataX,
        y: chartDataY
      })
    },
    /**
    * @description 初始化-数据感知-HTTP业务成功率+HTTP平均响应延迟
    */
    initChartHTTP() {
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
          data: this.getlegendNames(this.chartHTTP_kpiNameList)
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
            name: this.chartHTTP_kpiNameList[0].name,
            type: 'line',
            smooth:true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#196b91' // 0% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: { // 折线拐点
              color: '#4b92ad'
            },
            lineStyle: {// 折线
              color: '#4b92ad'
            },
            symbol: "circle",// 实心圆
            data: []
          },
          {
            name: this.chartHTTP_kpiNameList[1].name,
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            // yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#00a4c7'
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
    axiosChartHTTP(xyData) {
      this.chartHTTP.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        },{
          data: xyData.y[1]
        }]
      })
    },
    /**
     * @description 初始化-数据感知-上行
     */
    initChartT() {
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
          data:  this.getlegendNames(this.chartT_kpiNameList)
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
            name: this.chartT_kpiNameList[0].name,
            type: 'line',
            smooth:true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1f7c75' // 0% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: { // 折线拐点
              color: '#09b395'
            },
            lineStyle: {// 折线
              color: '#09b395'
            },
            symbol: "circle",// 实心圆
            data: []
          },
          
        ]
      };
      this.chartT.setOption(option);
    },
    /**
     * @description 初始化-获取数据-上行
     */
    axiosChartT(xyData) {
      this.chartT.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }]
      })
    },
    /**
     * @description 初始化-数据感知-下行
     */
    initChartB() {
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
          data: this.getlegendNames(this.chartB_kpiNameList)
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
            name: this.chartB_kpiNameList[0].name,
            type: 'line',
            smooth:true,
            itemStyle: { // 折线拐点
              color: '#4e98b4'
            },
            lineStyle: {// 折线
              color: '#4e98b4'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1678a3' // 0% 处的颜色
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
    axiosChartB(xyData) {
      this.chartB.setOption({
        xAxis: [
          {
            data: xyData.x
          }
        ],
        series: [{
          data: xyData.y[0]
        }]
      })
    },
    /**
     * @description 初始化-数据感知-下行速率+下行速率(>500k)
     */
    initChartKPBS() {
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
          data:  this.getlegendNames(this.chartKPBS_kpiNameList)
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
            name: this.chartKPBS_kpiNameList[0].name,
            type: 'line',
            itemStyle: { // 柱条
              color: '#5591b1'
            },
            lineStyle: { // 柱条
              color: '#5591b1'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#134d77' // 0% 处的颜色
                }, {
                  offset: 0.5, color: '#134d77' // 100% 处的颜色
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
            name: this.chartKPBS_kpiNameList[1].name,
            type: 'line',
            itemStyle: { // 折线拐点
              color: '#37a3b3'
            },
            lineStyle: {// 折线
              color: '#37a3b3'
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
    axiosChartKPBS(xyData) {
      this.chartKPBS.setOption({
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
     * @description 初始化-数据感知-TCP建立成功率+TCP建立平均延时
     */
    initChartTCP() {
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
          data:  this.getlegendNames(this.chartTCP_kpiNameList)
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
            name: this.chartTCP_kpiNameList[0].name,
            type: 'line',
            smooth:true,
            itemStyle: { // 柱条
              color: '#4a8fa9'
            },
            lineStyle: {
              color: '#4a8fa9'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#207da1' // 0% 处的颜色
                }, {
                  offset: 0.5, color: '#207da1' // 100% 处的颜色
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
            name: this.chartTCP_kpiNameList[1].name,
            type: 'line',
            itemStyle: { // 折线拐点
              color: '#aefbbe'
            },

            lineStyle: {// 折线
              color: '#aefbbe'
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
    axiosChartTCP(xyData) {
      this.chartTCP.setOption({
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
    * @description 初始化-数据感知-TCP建立时延无线侧+TCP建立时延核心侧
    */
    initChartTCP2() {
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
          data:  this.getlegendNames(this.chartTCP2_kpiNameList)
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
            name: this.chartTCP2_kpiNameList[0].name,
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
            name: this.chartTCP2_kpiNameList[1].name,
            type: 'line',
            lineStyle: { // 柱条
              color: '#235890'
            },
            itemStyle: {
              color: '#235890'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#235890' // 0% 处的颜色
                }, {
                  offset: 0.5, color: '#235890' // 100% 处的颜色
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
    axiosChartTCP2(xyData) {
      this.chartTCP2.setOption({
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
  margin-right: 143px;
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