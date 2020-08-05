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
export default {
  data() {
    return {
      params: {
        projectId:136,
        type: 4
      },
      kpiParams: {
        projectId: 136,
        kpiType: 4, //指标类型(1:4G 2:5G 3:数据感知 4：语音感知)不传查所有类型
      },
      chartParams: {
        projectId: 136,  //项目id  
        kpiIdList: '',// 指标编号 ，由逗号隔开
        kpiType: 4, // 指标类型, (1:4G  2:5G  3:数据感知 4:Votle语音)
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
      chartLOSS: '',
      chartAV_kpiNameList: ['VoLTE语音接通率', 'VoLTE视频接通率'], 
      chartAV1_kpiNameList: ['VoLTE语音掉话率', 'VoLTE视频掉话率'],
      chartSRVCC_kpiNameList: ['SRVCC切换成功率'],
      chartLOSS_kpiNameList: ['RTP上行丢包率']

    }
  },
  mounted() {
    // 数据感知 
    this.initChartAV();
    this.initChartAV1();
    this.initChartSRVCC();
    this.initChartLOSS();
     // 获取kpi
    this.getHourNewKpi(this.params);
     // 获取kpi
    this.getKpiList(this.kpiParams);
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
     * 获取图表名称列表
     */
    getKpiList(params) {
      this.$api.getKpiList(params).then((resp) => {
        let curData = resp.data;
        this.getKpiChartData(this.chartAV_kpiNameList, curData, (xyData) => {
          this.axiosChartAV(xyData);
        })
        this.getKpiChartData(this.chartAV1_kpiNameList, curData, (xyData) => {
          this.axiosChartAV1(xyData);
        })
        this.getKpiChartData(this.chartSRVCC_kpiNameList, curData, (xyData) => {
          this.axiosChartSRVCC(xyData);
        })
        this.getKpiChartData(this.chartLOSS_kpiNameList, curData, (xyData) => {
          this.axiosChartLOSS(xyData);
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
      // console.log(chartDataX)
      // console.log(chartDataY)

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
          data: this.chartAV_kpiNameList
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
            name: this.chartAV_kpiNameList[0],
            type: 'line',
            itemStyle: { // 折线拐点
              color: '#2288ad'
            },
            lineStyle: {// 折线
              color: '#2288ad'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#2288ad' // 0% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            symbol: "circle",// 实心圆
            data: []
          }, {
            name: this.chartAV_kpiNameList[1],
            type: 'line',
            smooth:true,
            itemStyle: { // 折线拐点
              color: '#22558a'
            },
            lineStyle: {// 折线
              color: '#22558a'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#22558a' // 0% 处的颜色
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
    axiosChartAV(xyData) {
      this.chartAV.setOption({
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
          data: this.chartAV1_kpiNameList
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
            name: this.chartAV1_kpiNameList[0],
            type: 'bar',
            itemStyle: { // 柱条
              color: '#4896ee'
            },
            data: []
          },
          {
            name: this.chartAV1_kpiNameList[0],
            type: 'bar',
            itemStyle: { // 柱条
              color: '#189896'
            },
            data: []
          },
        ]
      };
      this.chartAV1.setOption(option);
    },
    /**
     * @description 获取数据-语音感知-语音掉线率+视频掉线率
     */
    axiosChartAV1(xyData) {
      this.chartAV1.setOption({
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
          data: this.chartSRVCC_kpiNameList
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
            name: this.chartSRVCC_kpiNameList[0],
            type: 'line',
            smooth:true,
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
    axiosChartSRVCC(xyData) {
      this.chartSRVCC.setOption({
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
          data: this.chartLOSS_kpiNameList
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
            name: this.chartLOSS_kpiNameList[0],
            type: 'line',
             smooth:true,
            lineStyle: { // 柱条
              color: '#166c93'
            },
            itemStyle: {
              color: '#166c93'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#166c93' // 0% 处的颜色
                }, {
                  offset: 0.5, color: '#166c93' // 100% 处的颜色
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
    axiosChartLOSS(xyData) {
      this.chartLOSS.setOption({
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