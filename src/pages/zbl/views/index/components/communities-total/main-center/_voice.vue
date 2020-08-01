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
            src="@/assets/img/voice_ICON1.png"
          />
          <p class="zl-box">
            <span class="list-name">VOLTE活跃用户数</span>
            <span class="list-data">{{ volte_active_user_num }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/voice_ICON2.png"
          />
          <p class="zl-box">
            <span class="list-name">VOLTE语音话务量</span>
            <span class="list-data">{{ volte_voice_erl }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/voice_ICON3.png"
          />
          <p class="zl-box">
            <span class="list-name">VOLTE视频话务量</span>
            <span class="list-data">{{ volte_video_erl }}</span>
          </p>
        </li>
      </ul>
      <ul class="zcl">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/voice_ICON4.png"
          />
          <p class="zl-box">
            <span class="list-name">接续时长（V-V）</span>
            <span class="list-data">{{ volte_begin_call_time_vv }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/voice_ICON4.png"
          />
          <p class="zl-box">
            <span class="list-name">接续时长（V-A）</span>
            <span class="list-data">{{ volte_begin_call_time_va }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/voice_ICON4.png"
          />
          <p class="zl-box">
            <span class="list-name">SRVVC切换时长</span>
            <span class="list-data">{{ srvcc_switch_time }}</span>
          </p>
        </li>
      </ul>
      <ul class="zcl">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/voice_ICON5.png"
          />
          <p class="zl-box">
            <span class="list-name">MOS</span>
            <span class="list-data">{{ mos_rtcp }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON6.png"
          />
          <p class="zl-box">
            <span class="list-name">上行MOS</span>
            <span class="list-data">{{ upload_mos_rtp }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON7.png"
          />
          <p class="zl-box">
            <span class="list-name">下行MOS</span>
            <span class="list-data">{{ download_mos_rtp }}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="main-center-contain-right fr">
      <div class="clearfix">
        <div class="fl chart-left-contain-top">
          <div class="chart-title">
            语音接通率+视频接通率
          </div>
          <div
            id="chartAV"
            class="chart"
          ></div>
        </div>
        <div class="fr">
          <div class="chart-title">
            语音掉线率+视频掉线率
          </div>
          <div
            id="chartAV1"
            class="chart"
          ></div>
        </div>
      </div>
      <div class="clearfix">
        <div class="fl chart-left-contain">
          <div class="chart-title">
            SRVCC切换成功率
          </div>
          <div
            id="chartSRVCC"
            class="chart"
          ></div>
        </div>
        <div class="fr">
          <div class="chart-title">
            上行丢包率
          </div>
          <div
            id="chartLOSS"
            class="chart"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {
  chartData, chartDataX, chartDataX1, chartData1,
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
  chartData15,
} from '../../../data/data.js';
export default {
  data() {
    return {
      params: {
        projectId:136,
        type: 4
      },
      volte_voice_erl: '',  //VoLTE语音话务量
      volte_begin_call_time_vv: '', //VoLTE始呼接续时长vv
      volte_video_erl: '', //VoLTE视频话务量
      download_mos_rtp: '',  //下行MOS值(RTP)
      mos_rtcp: '',   //MOS值（RTCP）
      volte_active_user_num: '', //VoLTE活跃用户数
      volte_begin_call_time_va: '',  //Volte始呼接续时长va
      upload_mos_rtp: '',  //下行MOS值(RTP)
      srvcc_switch_time: '',    //SRVCC切换时长
      chartAV: '',
      chartAV1: '',
      chartSRVCC: '',
      chartLOSS: ''

    }
  },
  mounted() {
    // 获取kpi
    this.getHourNewKpi(this.params);
    // 数据感知 
    this.initChartAV();
    this.axiosChartAV();
    this.initChartAV1();
    this.axiosChartAV1();
    this.initChartSRVCC();
    this.axiosChartSRVCC();
    this.initChartLOSS();
    this.axiosChartLOSS();
  },
  methods: {
    /**
     * 获取左侧KPI
     * 
     */
    getHourNewKpi(params) {
      this.$api.getHourNewKpi(params).then((resp) => {
        let curData = resp.data;
        this.volte_voice_erl = curData.volte_voice_erl;
        this.volte_begin_call_time_vv = curData.volte_begin_call_time_vv;
        this.volte_video_erl = curData.volte_video_erl;
        this.download_mos_rtp = curData.download_mos_rtp;
        this.mos_rtcp = curData.mos_rtcp;
        this.volte_active_user_num = curData.volte_active_user_num;
        this.volte_begin_call_time_va = curData.volte_begin_call_time_va;
        this.upload_mos_rtp = curData.upload_mos_rtp;
        this.srvcc_switch_time = curData.srvcc_switch_time;
      })
    },
    /**
     * @description 初始化-语音感知-语音接通率+视频接通率
     */
    initChartAV() {
      this.chartAV = echarts.init(document.getElementById('chartAV'));
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
          data: ['语音接通率', '视频接通率']
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
            name: '语音接通率',
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
          }, {
            name: '视频接通率',
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
      this.chartAV.setOption(option);
    },
    /**
     * @description 获取数据-语音感知-语音接通率+视频接通率
     */
    axiosChartAV(params) {
      this.chartAV.setOption({
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
     * @description 初始化-语音感知-语音掉线率+视频掉线率
     */
    initChartAV1() {
      this.chartAV1 = echarts.init(document.getElementById('chartAV1'));
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
          data: ['语音掉线率', '视频掉线率']
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
      this.chartAV1.setOption(option);
    },
    /**
     * @description 获取数据-语音感知-语音掉线率+视频掉线率
     */
    axiosChartAV1(params) {
      this.chartAV1.setOption({
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
     * @description 初始化-语音感知-SRVCC切换成功率
     */
    initChartSRVCC() {
      this.chartSRVCC = echarts.init(document.getElementById('chartSRVCC'));
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
          data: ['SRVCC切换成功率']
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
          }
        ],
        series: [
          {
            name: 'SRVCC切换成功率',
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
          }
        ]
      };
      this.chartSRVCC.setOption(option);
    },
    /**
     * @description 获取数据-语音感知-SRVCC切换成功率
     */
    axiosChartSRVCC(params) {
      this.chartSRVCC.setOption({
        xAxis: [
          {
            data: chartDataX1
          }
        ],
        series: [{
          data: chartData11
        }]
      })
    },
    /**
    * @description 初始化-语音感知-上行丢包率
    */
    initChartLOSS() {
      this.chartLOSS = echarts.init(document.getElementById('chartLOSS'));
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
          data: ['上行丢包率']
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
          }
        ],
        series: [
          {
            name: '上行丢包率',
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
          }
        ]
      };
      this.chartLOSS.setOption(option);
    },
    /**
    * @description 初始化-语音感知-上行丢包率
    */
    axiosChartLOSS(params) {
      this.chartLOSS.setOption({
        xAxis: [
          {
            data: chartDataX1
          }
        ],
        series: [{
          data: chartData5
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
  width: 540px;
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