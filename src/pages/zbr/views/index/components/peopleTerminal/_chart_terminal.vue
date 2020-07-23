<template>
  <div
    id="terminal"
    class="terminal"
    style="width: 519px;height: 423px;"
  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      charTerminal: '',
      PeopleModelType: {
        success: true,
        code: 1000,
        data: [{
          Name: '华为Mate30',
          Num: 15
        }, {
          Name: 'oppor17',
          Num: 13
        }, {
          Name: 'iphone11',
          Num: 14
        }, {
          Name: '三星S20',
          Num: 15
        }, {
          Name: 'iphoneX',
          Num: 12
        }]
      }
    }
  },
  mounted() {
    this.initChartPeopleTerminal();
    this.axiosPeopleTerminal();
  },
  methods: {
    /**
     * @description 终端型号图
     */
    initChartPeopleTerminal() {
      this.charTerminal = echarts.init(document.getElementById('terminal'));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: ''
        },
        textStyle: {
          fontFamily: 'SimHei'
        },
        tooltip: {},
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
          indicator: [{
            name: 'null', max: 100,
          }, {
            name: 'null', max: 100,
          }, {
            name: 'null', max: 100,
          }, {
            name: 'null', max: 100,
          }, {
            name: 'null', max: 100
          }]
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
              value: [0, 0, 0],
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
    axiosPeopleTerminal(params) {
      // axios.post('/app/queryPeopleModelType', params)
      //   .then(function (response) {
      //     let res = response.data 
      //     let indicator = this.handleCharTerminalData(res).indicator;
      //     let seriesData = this.handleCharTerminalData(res).seriesData;
      //     this.charTerminal.setOption({
      //         radar: {
      //             indicator:indicator
      //         },
      //         series: [{
      //             data: [
      //                 {
      //                     value:seriesData,
      //                     name: ''
      //                 }
      //             ]
      //         }]
      //     })
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      let res = this.PeopleModelType.data
      let indicator = this.handleTerminalData(res).indicator;
      let seriesData = this.handleTerminalData(res).seriesData;
      this.charTerminal.setOption({
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
    },
    /**
     * 数据处理-终端型号图--获取radar-indicator 即雷达图每个类别限制最大数 以及 展示数据seriesData
     */
    handleTerminalData(array) {
      let num = [];
      let max = 0;
      let indicator = [];
      let seriesData = []
      // 获取最大值
      array.filter(function (value) {
        num.push(value.Num)
      })
      max = Math.max.apply(null, num);
      // 获取数据
      array.filter(function (value) {
        let obj = {
          name: value.Name,
          max: max
        }
        seriesData.push(value.Num)
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