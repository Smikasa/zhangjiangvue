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
      default: 5
    }
  },
  data() {
    return {
      params: {
        projectId: 132,
        chooseType: this.curTime,
        studioId: 20
      },
      chartPeopleNumber: ''
    }
  },
  watch: {
    curTime() {
      this.params.chooseType = this.curTime;
      this.axiosPeopleNumberByTime(this.params)
    }
  },
  mounted() {
    this.initChartPeopleNumber()
    this.axiosPeopleNumberByTime(this.params)
  },
  methods: {
    /**
     * 获取数据-人数曲线图
     */
    axiosPeopleNumberByTime(params) {
      this.$api.getPeopleCount(params).then((resp) => {
        if (resp.code === 10000) {
          let curData = resp.data ? resp.data.chooseType : {today:[],yesterday:[]} ;
          let Today = {
            x: this.getPeopleNumberXYData(curData.today).x,
            y: this.getPeopleNumberXYData(curData.today).y
          }
          let Yesterday = {
            x: this.getPeopleNumberXYData(curData.yesterday).x,
            y: this.getPeopleNumberXYData(curData.yesterday).y
          }
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
        }
      })
    },
    /**
     * 数据处理-人数曲线图-获取x y 数据
     */
    getPeopleNumberXYData(array) {
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
              backgroundColor: '#283b56',
              precision:0
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
          },
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
            min: 0,
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
            min: 0,
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