<template>
  <div class="clearfix">
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
            <span class="list-data">{{ volte_voice_erl }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON2.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE语音接通率</span>
            <span class="list-data">{{ volte_voice_connect_ratio }}%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON3.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE语音掉线率</span>
            <span class="list-data">{{ volte_voice_offline_ratio }}%</span>
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
            <span class="list-data">{{ volte_video_erl }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON5.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE视频接通率</span>
            <span class="list-data">{{ volte_video_connect_ratio }}%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON6.png"
          >
          <p class="zl-box">
            <span class="list-name">VOLTE视频掉线率</span>
            <span class="list-data">{{ volte_video_offline_ratio }}%</span>
          </p>
        </li>
      </ul>
      <ul
        class="zcl zcl-last"
      >
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON7.png"
          >
          <p class="zl-box">
            <span class="list-name">SRVCC切换成功率</span>
            <span class="list-data">{{ srvcc_switch }}%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON8.png"
          >
          <p class="zl-box">
            <span class="list-name">PDCCH信道CCE利用率</span>
            <span class="list-data">{{ pdcch_channel_cee_occupancy }}%</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="main-center-contain-right fr">
      <div class="clearfix">
        <div class="fl chart-left-contain-top">
          <div class="chart-title">
            上下行流量+无线利用率
          </div>
          <div
            id="chartSX"
            class="chart"
          ></div>
        </div>
        <div class="fr">
          <div class="chart-title">
            PRC连接数+峰值用户数+无线接通率
          </div>
          <div
            id="chartPRC"
            class="chart"
          ></div>
        </div>
      </div>
      <div class="clearfix">
        <div class="fl chart-left-contain">
          <div class="chart-title">
            无线掉线率+切换成功率+上行干扰电平
          </div>
          <div
            id="chartWX"
            class="chart"
          ></div>
        </div>
        <div class="fr">
          <div class="chart-title">
            PRB上下行利用率
          </div>
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
export default {
  data() {
    return {
      params: {
        projectId: 136,
        type: 1 // (1.4G   4.Volte)
      },
      kpiParams: {
        projectId: 136,
        kpiType: 1, //指标类型(1:4G 2:5G 3:数据感知 4：语音感知)不传查所有类型
      },
      chartParams: {
        projectId: 136,  //项目id  
        kpiIdList: '',// 指标编号 ，由逗号隔开
        kpiType: 1, // 指标类型, (1:4G  2:5G  3:数据感知 4:Votle语音)
      },
      volte_voice_erl: '',//VOLTE语音话务量 
      volte_voice_offline_ratio: '',//VOLTE语音掉线率
      volte_video_erl: '',//VOLTE视频话务量
      volte_voice_connect_ratio: '',//VOLTE语音接通率
      volte_video_connect_ratio: '',//VOLTE视频接通率
      pdcch_channel_cee_occupancy: '',//PDCCH信道CCE利用率
      srvcc_switch: '',//SRVCC切换成功率
      volte_video_offline_ratio: '',//VOLTE视频掉线率
      chartSX_kpiNameList: ['上行数据流量', '下行数据流量', '无线利用率'], //上下行流量+无线利用率
      chartPRC_kpiNameList: ['平均RRC连接数', '小区最大用户数', '无线接通率'],//PRC连接数+峰值用户数+无线接通率
      chartWX_kpiNameList: ['无线掉线率', '切换成功率', '上行干扰平均电平'],//无线掉线率+切换成功率+上行干扰电平
      chartPRB_kpiNameList: ['上行PRB利用率', '下行PRB利用率'],//PRB上下行利用率
    }
  },
  mounted() {
    // 初始化 图表
    this.initChartSX();
    this.initChartPRC();
    this.initChartWX();
    this.initChartPRB();
    // 获取kpi
    this.getHourNewKpi(this.params);
    // 获取左侧列表数据
    this.getKpiList(this.kpiParams);
  },
  methods: {
    /**
     * 获取左侧KPI
     */
    getHourNewKpi(params) {
      this.$api.getHourNewKpi(params).then((resp) => {
        let curData = resp.data;
        this.volte_voice_erl = curData.volte_voice_erl;
        this.volte_voice_offline_ratio = curData.volte_voice_offline_ratio;
        this.volte_video_erl = curData.volte_video_erl;
        this.volte_voice_connect_ratio = curData.volte_voice_connect_ratio;
        this.volte_video_connect_ratio = curData.volte_video_connect_ratio;
        this.pdcch_channel_cee_occupancy = curData.pdcch_channel_cee_occupancy;
        this.srvcc_switch = curData.srvcc_switch;
        this.volte_video_offline_ratio = curData.volte_video_offline_ratio;
      })
    },
    /**
     * 获取图表名称列表
     */
    getKpiList(params) {
      this.$api.getKpiList(params).then((resp) => {
        let curData = resp.data;
        this.getKpiChartData(this.chartSX_kpiNameList, curData, (xyData) => {
          this.axiosChartSX(xyData);
        })
        this.getKpiChartData(this.chartPRC_kpiNameList, curData, (xyData) => {
          this.axiosChartPRC(xyData);
        })
        this.getKpiChartData(this.chartWX_kpiNameList, curData, (xyData) => {
          this.axiosChartWX(xyData);
        })
        this.getKpiChartData(this.chartPRB_kpiNameList, curData, (xyData) => {
          this.axiosChartPRB(xyData);
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
     * @description 初始化-4G性能-上下行流量+无线利用率
     */
    initChartSX() {
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
          data: this.chartSX_kpiNameList
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
            min:0,
            scale: true,
            splitLine: {
              show: false //去掉网格线
            },
          },
          {
            type: 'value',
            axisLabel: {
              color: '#575b61'
            },
            min:0,
            minInterval: 1,// 数值取整
            scale: true,
            splitLine: {
              show: false     //去掉网格线
            },
          }
        ],
        series: [
          {
            name: this.chartSX_kpiNameList[0],
            type: 'bar',
            yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#3b97cc'
            },
            data: []
          },
          {
            name: this.chartSX_kpiNameList[1],
            type: 'bar',
            itemStyle: { // 柱条
              color: '#0076e3'
            },
            data: []
          },
          {
            name: this.chartSX_kpiNameList[2],
            type: 'line',
            smooth:true,
            itemStyle: { // 折线拐点
              color: '#09b395'
            },
            lineStyle: {// 折线
              type: 'dashed',
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
    axiosChartSX(xyData) {
      console.log(xyData.x)
      this.chartSX.setOption({
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
     * @description 初始化-4G性能-PRC连接数+峰值用户数+无线接通率
     */
    initChartPRC() {
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
          data: this.chartPRC_kpiNameList
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
            name: this.chartPRC_kpiNameList[0],
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#4896ee'
            },
            data: []
          },
          {
            name: this.chartPRC_kpiNameList[1],
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
            name: this.chartPRC_kpiNameList[2],
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1d7d9f' // 0% 处的颜色
                }, {
                  offset: 0.7, color: 'transparent' // 100% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: { // 折线拐点
              color: '#4c93ad'
            },
            lineStyle: {// 折线
              color: '#4c93ad'
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
    axiosChartPRC(xyData) {
      this.chartPRC.setOption({
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
     * @description 初始化-4G性能-无线掉线率+切换成功率+上行干扰电平
     */
    initChartWX() {
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
          data: this.chartWX_kpiNameList
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
            name: this.chartWX_kpiNameList[0],
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
                  offset: 0, color: '#0d3054' // 0% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: { // 折线拐点
              color: '#215489'
            },
            lineStyle: {// 折线
              color: '#215489'
            },
            symbol: "circle",// 实心圆
            data: []
          },
          {
            name: this.chartWX_kpiNameList[1],
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
            name: this.chartWX_kpiNameList[2],
            type: 'line',
            // xAxisIndex: 1, // 对应坐标轴
            yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#aefbbe'
            },
            lineStyle: {// 折线
              color: '#aefbbe',
              type: "dashed"
            },
            data: []
          },
        ]
      };
      this.chartWX.setOption(option);
    },
    /**
    * @description 获取数据-4G性能-无线掉线率+切换成功率+ 上行干扰电平
    */
    axiosChartWX(xyData) {
      this.chartWX.setOption({
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
     * @description 初始化-4G性能-PRB上下行利用率
     */
    initChartPRB() {
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
          data: this.chartPRB_kpiNameList
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
            name: this.chartPRB_kpiNameList[0],
            type: 'line',
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
            name: this.chartPRB_kpiNameList[1],
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
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
    axiosChartPRB(xyData) {
      this.chartPRB.setOption({
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

.main-center-contain-left ul.zcl-last{
  padding-top: 55px;
  margin-bottom: 0;
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
  margin-right: 137px;
  margin-bottom: 135px;
}

.main-center-contain-right .chart-left-contain {
  margin-right: 100px;
}

.chart {
  width: 530px;
  height: 270px;
}

.chart-title {
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 34px;
  padding-top: 50px;
}
</style>