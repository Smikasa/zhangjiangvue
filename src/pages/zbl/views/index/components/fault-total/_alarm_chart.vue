<template>
  <div class="chart-contain">
    <div class="chart-title">实时新增告警曲线</div>
    <div
      id="chartAlarm"
      class="chart"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { chartData9, chartDataX, chartData10 } from '../../data/data.js';
export default {
  data() {
    return {
      chartAlarm: ''
    }
  },
  mounted() {
    this.initChartAlarm();
    this.axiosChartAlarm()
  },
  methods: {
    /**
       * @description 初始化-实时新增告警曲线
       */
    initChartAlarm() {
      this.chartAlarm = echarts.init(document.getElementById('chartAlarm'));
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
          show: false,
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
            type: 'line',
            itemStyle: { // 柱条
              color: '#3b97cc'
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
      this.chartAlarm.setOption(option);
    },
    /**
    * @description 获取数据-实时新增告警曲线
    */
    axiosChartAlarm(params) {
      this.chartAlarm.setOption({
        xAxis: [
          {
            data: chartDataX
          }
        ],
        series: [{
          data: chartData9
        },
        {
          data: chartData10
        }]
      })
    },
  }
}
</script>

<style scoped>
/* .chart-contain {
  dis
} */
.chart-title {
  color: white;
  font-size: 26px;
  margin: 10px 0;
}
.chart {
  width: 1540px;
  height: 300px;
}
</style>