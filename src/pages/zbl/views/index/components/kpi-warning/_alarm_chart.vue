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
export default {
  data() {
    return {
      chartAlarm: ''
    }
  },
  mounted() {
    this.initChartAlarm();
    this.getMinutePerformanceAddCounts()
  },
  methods: {
    /**
       * @description 初始化-分钟级新增预警曲线
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
              backgroundColor: '#283b56',
              precision:0
            }
          }
        },
        legend: {
          show: false,
          left: 0,
          itemGap: 35,
          inactiveColor: '#575b61',// 图例关闭时颜色
          data: ['告警数']
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
            name: '告警数',
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
          }
        ]
      };
      this.chartAlarm.setOption(option);
    },
    /**
    * @description 获取数据-分钟级新增预警曲线
    */
    getMinutePerformanceAddCounts(params) {
       this.$api.getMinutePerformanceAddCounts(params).then((resp) => {
        if (resp.code === 10000) {
          let curdata = resp.data;
          curdata ? this.tableData = curdata : this.tableData = [];
          this.chartAlarm.setOption({
            xAxis: [
              {
                data: this.getXYData(curdata).x
              }
            ],
            series: [{
              data: this.getXYData(curdata).y
            }]
          })
        } else {
          this.$message({
            message: resp.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    /**
     * 获取x y轴数值
     */
    getXYData(array) {
      let x = []
      let y = [];
      array.filter(function (value) {
        x.push(value.time)
        y.push(Number(value.kpiWarningNum))
      })
      return {
        x: x,
        y: y
      }
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