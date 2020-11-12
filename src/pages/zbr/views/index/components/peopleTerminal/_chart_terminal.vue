<template>
  <div
    id="terminal"
    class="terminal"
    style="width: 537px;height: 537px;"
  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      charTerminal: '',
      params: {
        projectId: 132,
        studioId: 20,
      },
      // 缓存
      indicator: [{
        name: '--', max: 100,
      }, {
        name: '--', max: 100,
      }, {
        name: '--', max: 100,
      }, {
        name: '--', max: 100,
      }, {
        name: '--', max: 100
      }]
    }
  },
  mounted() {
    this.initChartPhoneModelList();
    this.axiosPhoneModelList(this.params);
  },
  methods: {
    /**
     * @description 终端型号图
     */
    initChartPhoneModelList() {
      this.charTerminal = echarts.init(document.getElementById('terminal'));
      // 指定图表的配置项和数据
      let indicator = this.indicator;
      let option = {
        title: {
          text: ''
        },
        textStyle: {
          fontFamily: 'SimHei'
        },
        tooltip: {
          formatter: function (obj) {
            let indicator = indicator;
            var el = '';
            for (var i = 0; i < indicator.length; i++) {
              el += indicator[i].name + ':' + obj.value[i] + '%</br> '
            }
            return el
          }
        },
        legend: {
          data: []
        },
        radar: {
          // shape: 'circle',
          // name: {
          //     textStyle: {
          //         color: '#1f87c6',
          //         // backgroundColor: '#999',
          //         borderRadius: 3,
          //         padding: [3, 5]
          //     }
          // },
          splitLine: { // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
            lineStyle: {
              color: '#0c4188',
            }
          },
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: { // 分隔区域的样式设置。
              color: ['#054685'],
              opacity: 0.2
              // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0c4188'
            }
          },
          indicator: this.indicator
        },
        series: [{
          name: '',
          type: 'radar',
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
                offset: 0, color: '#007591' // 0% 处的颜色
              }, {
                offset: 0.5, color: '#004e82' // 100% 处的颜色
              }, {
                offset: 1, color: '#043e90' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },

          // areaStyle: {normal: {}},
          data: [
            {
              value: [0, 0, 0, 0, 0],
              name: '',
              symbol: 'none'
            },
          ]
        }]
      };
      this.charTerminal.setOption(option);
    },
    /**
     * 获取数据-终端型号图
     */
    axiosPhoneModelList(params) {
      this.$api.getPhoneModelList(params).then((resp) => {
        if (resp.code === 10000) {
          let curData = resp.data
          let seriesData = this.handleTerminalData(curData).seriesData;
          let indicator = this.handleTerminalData(curData).indicator;
          if (seriesData.length && indicator.length) {
            this.charTerminal.setOption({
              tooltip: {
                formatter: function (obj) {
                  var el = '';
                  for (var i = 0; i < indicator.length; i++) {
                    el += indicator[i].name + '：' + obj.value[i] + '%</br> '
                  }
                  return el
                }
              },
              radar: {
                indicator: indicator
              },
              series: [{
                data: [
                  {
                    value: seriesData,
                    name: ''
                  }
                ]
              }]
            })
          }
        }
      })
    },
    /**
     * 数据处理-终端型号图--获取radar-indicator 即雷达图每个类别限制最大数 以及 展示数据seriesData
     */
    handleTerminalData(array) {
      let num = [];
      let max = 0;
      let indicator = [];
      let seriesData = []
      // 获取数据
      array.filter(function (value) {
        let obj = {
          name: value.model,
          max: 100
        }
        seriesData.push(parseInt(value.percentage))
        indicator.push(obj)
      })
      return {
        seriesData: seriesData,
        indicator: indicator,
      };
    },
  }
}
</script>

<style>
</style>