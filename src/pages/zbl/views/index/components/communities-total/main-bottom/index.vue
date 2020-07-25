<template>
  <div class="main-bottom">
    <div class="main-bottom-title">
      <ul
        id="zlbb"
        class="clearfix"
      >
        <li>PRB上行利用率</li>
        <li>
          <div class="select">
            <div
              class="select-name"
              @click="controlSelctBottom"
            >
              2F
            </div>
            <div
              v-show="isShowSelectBottom"
              class="select-ul"
            >
              <div
                class="select-li"
                @click="controlSelctBottom"
              >
                1F
              </div>
              <div
                class="select-li"
                @click="controlSelctBottom"
              >
                2F
              </div>
              <div
                class="select-li"
                @click="controlSelctBottom"
              >
                3F
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="main-bottom-contain clearfix">
      <div class="fl">
        <div
          id="chartPIE1"
          class="chart"
        ></div>
        <div class="bbm">
          <img src="@/assets/img/bb1.png" />
          <span>2F2号馆</span>
        </div>
      </div>
      <div class="fl">
        <div
          id="chartPIE2"
          class="chart"
        ></div>
        <div class="bbm">
          <img src="@/assets/img/bb5.png" />
          <span>2F商业圈</span>
        </div>
      </div>
      <div class="fl">
        <div
          id="chartPIE3"
          class="chart"
        ></div>
        <div class="bbm">
          <img src="@/assets/img/bb2.png" />
          <span>2F宴会厅</span>
        </div>
      </div>
      <div class="fl">
        <div
          id="chartPIE4"
          class="chart"
        ></div>
        <div class="bbm">
          <img src="@/assets/img/bb3.png" />
          <span>2F办公区</span>
        </div>
      </div>
      <div class="fl">
        <div
          id="chartPIE5"
          class="chart"
        ></div>
        <div class="bbm">
          <img src="@/assets/img/bb1.png" />
          <span>2F2号馆</span>
        </div>
      </div>
      <div class="fl">
        <div
          id="chartPIE6"
          class="chart"
        ></div>
        <div class="bbm">
          <img src="@/assets/img/bb1.png" />
          <span>2F2号馆</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {
  chartData, chartDataX, chartDataX1, pie1,
  pie2,
  pie3,
  pie4,
  pie5,
  pie6,
  pie7,
  pie8,
  pie9,
  pie10,
} from '../../../data/data.js';
export default {
  data() {
    return {
      isShowSelectBottom: false,
      chartPIE1: '',
      chartPIE2: '',
      chartPIE3: '',
      chartPIE4: '',
      chartPIE5: '',
      chartPIE6: '',
    }
  },
  mounted() {
    this.initChartPIE();
    this.$nextTick(() => {
      this.axiosChartPIE();
    })

  },
  methods: {
    /**
       * @description 饼图
       */
    initChartPIE() {
      this.chartPIE1 = echarts.init(document.getElementById('chartPIE1'));
      this.chartPIE2 = echarts.init(document.getElementById('chartPIE2'));
      this.chartPIE3 = echarts.init(document.getElementById('chartPIE3'));
      this.chartPIE4 = echarts.init(document.getElementById('chartPIE4'));
      this.chartPIE5 = echarts.init(document.getElementById('chartPIE5'));
      this.chartPIE6 = echarts.init(document.getElementById('chartPIE6'));
      let option = {
        tooltip: null,
        animation: false,
        legend: null,
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['70%', '88%'],
            avoidLabelOverlap: false,
            labelLine: {
              show: false
            },
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: 40.21,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: 59.79,
                name: '底色'
              },
            ]
          }
        ]
      };
      this.chartPIE1.setOption(option);
      this.chartPIE2.setOption(option);
      this.chartPIE3.setOption(option);
      this.chartPIE4.setOption(option);
      this.chartPIE5.setOption(option);
      this.chartPIE6.setOption(option);
    },
    /**
    * 获取数据-饼图组
    */
    axiosChartPIE(params) {
      this.chartPIE1.setOption({
        series: [
          {
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: pie1,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: pie2,
                name: '底色'
              },
            ]
          }
        ]
      });
      this.chartPIE2.setOption({
        series: [
          {
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: pie3,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: pie4,
                name: '底色'
              },
            ]
          }
        ]
      });
      this.chartPIE3.setOption({
        series: [
          {
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: pie1,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: pie2,
                name: '底色'
              },
            ]
          }
        ]
      });
      this.chartPIE4.setOption({
        series: [
          {
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: pie1,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: pie2,
                name: '底色'
              },
            ]
          }
        ]
      });
      this.chartPIE5.setOption({
        series: [
          {
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: pie1,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: pie2,
                name: '底色'
              },
            ]
          }
        ]
      });
      this.chartPIE6.setOption({
        series: [
          {
            data: [
              {
                itemStyle: {
                  color: '#0079b7',
                },
                selected: false,
                label: {
                  position: 'center',
                  formatter: '{d}%',
                  color: "#fff",
                  fontSize: 28,
                },
                value: pie1,
                name: '底色'
              },
              {
                markPoint: {
                  itemStyle: {
                    color: '#0079b7',
                    barBorderRadius: 23,
                  },
                },
                itemStyle: {
                  color: '#01283d',
                  borderColor: "#0079b7",
                  borderWidth: 1,
                },
                value: pie2,
                name: '底色'
              },
            ]
          }
        ]
      });
    },
    /**
     * 点击其他区域select收起公共事件
     */
    controlSelctBottom() {
      this.isShowSelectBottom = !this.isShowSelectBottom;
    },
  }
}
</script>

<style scoped>
.select {
  width: 160px;
  display: inline-block;
  height: 80px;
  position: relative;
}
.select-name {
  cursor: pointer;
  height: 80px;
  color: #d19328;
}
.select-ul {
  position: absolute;
  left: 0;
  top: 80px;
  border: 1px solid black;
  /* width: 160px; */
  text-align: left;
}
.select-ul .select-li {
  font-size: 14px;
  padding: 8px 14px;
  cursor: pointer;
}

.main-bottom .select {
  width: 160px;
  display: inline-block;
  height: 80px;
  position: relative;
}
.main-bottom .select-name {
  cursor: pointer;
  height: 80px;
  color: #d19328;
}
.main-bottom .select-ul {
  position: absolute;
  left: 0;
  top: 80px;
  border: 1px solid black;
  /* width: 160px; */
  text-align: left;
}
.main-bottom .select-ul .select-li {
  font-size: 14px;
  padding: 8px 14px;
  cursor: pointer;
}

.main-bottom .select-ul .select-li:hover {
  color: white;
}

.select-ul .select-li:hover {
  color: white;
}

.main-bottom-contain .chart {
  width: 195px;
  height: 195px;
}
.bbm {
  overflow: hidden;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.bbm img {
  vertical-align: middle;
}
.bbm span {
  display: inline-block;
  font-size: 30px;
  color: #175773;
  vertical-align: middle;
  margin-left: 12px;
}
.main-bottom-contain .fl {
  margin-right: 110px;
}
.main-bottom-contain .fl:last-child {
  margin-right: 0;
}

#zlbb {
  width: 100%;
  list-style-type: none;
  background: url("~@/assets/img/all6.png") no-repeat;
  /* background-size: 100%; */
  padding-left: 65px;
  height: 80px;
  margin-bottom: 80px;
  line-height: 80px;
  /* overflow: hidden; */
}
#zlbb > li {
  font-size: 30px;
  color: #d19328;
  font-weight: 700;
  margin-right: 163px;
  float: left;
  display: inline-block;
}
</style>