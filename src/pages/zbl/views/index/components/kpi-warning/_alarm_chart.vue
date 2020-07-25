<template>
  <div class="chart-contain">
    <div class="chart-title">
      分钟级新增预警曲线
    </div>
    <div
      id="chartAlarm"
      class="chart"
    ></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { chartData17, chartDataX2, chartData16 } from '../../data/data.js';
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
        grid: {
          left: '4%',
          right: 0,
          bottom: '24px'
          // width:'1800px',
          // height:'262px'
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
            lineStyle: {
              color: '#3d829e'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1b7499' // 0% 处的颜色
                }, {
                  offset: 0.6, color: '#1b7499' // 100% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth: true,
            data: []
          },
          {
            name: '下行',
            type: 'line',
            lineStyle: {// 折线
              color: '#5aa096'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#29857e' // 0% 处的颜色
                }, {
                  offset: 0.3, color: '#29857e' // 100% 处的颜色
                }, {
                  offset: 1, color: 'transparent' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth: true,
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
            data: chartDataX2
          }
        ],
        series: [{
          data: chartData17
        },
        {
          data: chartData16
        }]
      })
    },
  }
}
</script>

<style scoped>
.chart-title {
  color: white;
  font-size: 26px;
}
.chart {
  width: 1800px;
  height: 312px;
}
</style>