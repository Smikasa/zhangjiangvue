<template>
  <div
    id="peopleNumber"
    class="people-number"
    style="width: 515px;height: 424px;"
  ></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    curTime: {
      type: Number,
      default:5
    }
  },
  data() {
    return {
      PeopleNumberByTime1: {
        success: true,
        code: 1000,
        data: {
          Today: [{
            Time: '12:12',
            Num: 12
          }, {
            Time: '12:13',
            Num: 13
          },
          {
            Time: '12:14',
            Num: 14
          },
          {
            Time: '12:15',
            Num: 10
          },
          {
            Time: '12:16',
            Num: 18
          },
          {
            Time: '12:17',
            Num: 8
          },
          {
            Time: '12:18',
            Num: 10
          }
          ],
          Yesterday: [{
            Time: '12:12',
            Num: 9
          }, {
            Time: '12:13',
            Num: 8
          },
          {
            Time: '12:14',
            Num: 7
          },
          {
            Time: '12:15',
            Num: 4
          },
          {
            Time: '12:16',
            Num: 13
          },
          {
            Time: '12:17',
            Num: 4
          },
          {
            Time: '12:18',
            Num: 12
          }
          ]
        }
      },
      PeopleNumberByTime2: {
        success: true,
        code: 1000,
        data: {
          Today: [{
            Time: '12:15',
            Num: 12
          }, {
            Time: '12:16',
            Num: 6
          },
          {
            Time: '12:17',
            Num: 3
          },
          {
            Time: '12:18',
            Num: 8
          },
          {
            Time: '12:19',
            Num: 5
          },
          {
            Time: '12:20',
            Num: 11
          },
          {
            Time: '12:21',
            Num: 9
          }
          ],
          Yesterday: [{
            Time: '12:15',
            Num: 4
          }, {
            Time: '12:16',
            Num: 12
          },
          {
            Time: '12:17',
            Num: 6
          },
          {
            Time: '12:18',
            Num: 8
          },
          {
            Time: '12:19',
            Num: 3
          },
          {
            Time: '12:20',
            Num: 10
          },
          {
            Time: '12:21',
            Num: 7
          }
          ]
        }
      },
      chartPeopleNumber:''
    }
  },
  watch:{
    curTime(){
      this.axiosPeopleNumberByTime({TIME:this.curTime})    
    }
  },
  mounted() {
    this.initChartPeopleNumber()
    this.axiosPeopleNumberByTime({TIME:this.curTime})
  },
  methods: {
    /**
     * 获取数据-人数曲线图
     */
    axiosPeopleNumberByTime(params) {
      // axios.post('/app/queryPeopleNumberByTime', params)
      //   .then(function (response) {
      //         let res = response.data 
      //         let Today = {
      //             x:this.getPeopleNumberXYData(res.Today).x,
      //             y:this.getPeopleNumberXYData(res.Today).y
      //         } 
      //         let Yesterday= {
      //             x:this.getPeopleNumberXYData(res.Yesterday).x,
      //             y:this.getPeopleNumberXYData(res.Yesterday).y
      //         } 
      //         this.chartPeopleNumber.setOption({
      //             xAxis: [
      //                 {
      //                     data: Today.x
      //                 }
      //             ],
      //             series:[{
      //                 data:Today.y
      //             },{
      //                 data:Yesterday.y
      //             }]
      //         })
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      let PeopleNumberByTime = params.TIME === 5 ? this.PeopleNumberByTime1 : this.PeopleNumberByTime2;
      let res = PeopleNumberByTime.data
      console.log(PeopleNumberByTime)
      let Today = {
        x: this.getPeopleNumberXYData(res.Today).x,
        y: this.getPeopleNumberXYData(res.Today).y
      }
      let Yesterday = {
        x: this.getPeopleNumberXYData(res.Yesterday).x,
        y: this.getPeopleNumberXYData(res.Yesterday).y
      }
      console.log(Today, Yesterday)
      this.chartPeopleNumber.setOption({
        xAxis: [
          {
            data: Today.x
          }
        ],
        series: [{
          data: Today.y
        }, {
          data: Yesterday.y
        }]
      })
    },
    /**
     * 数据处理-人数曲线图-获取x y 数据
     */
    getPeopleNumberXYData(array) {
      let x = []
      let y = [];
      array.filter(function (value) {
        x.push(value.Time)
        y.push(value.Num)
      })
      return {
        x: x,
        y: y
      }
    },
    /**
     * @description 人数直方折线图
     */
    initChartPeopleNumber() {
      this.chartPeopleNumber = echarts.init(document.getElementById('peopleNumber'));
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
          left: 23,
          itemGap: 35,
          inactiveColor: '#575b61',// 图例关闭时颜色
          data: ['今日人数', '昨日人数']
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
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
            boundaryGap: [0.2, 0.2]
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
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '今日人数',
            type: 'bar',
            // xAxisIndex: 1, // 对应坐标轴
            yAxisIndex: 1, // 对应坐标轴
            itemStyle: { // 柱条
              color: '#4457a4'
            },
            data: []
          },
          {
            name: '昨日人数',
            type: 'line',
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
      this.chartPeopleNumber.setOption(option);
    },
  }
}
</script>

<style>
</style>