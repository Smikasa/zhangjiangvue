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
              :class="[!isShowSelect ? 'select-open' : 'select-close']"
              @click="controlSelctBottom(params.floor)"
            >
              {{ params.floor }}
            </div>
            <div
              v-show="isShowSelect"
              class="select-ul"
            >
              <div
                class="select-li"
                :class="[params.floor === '1F' ? 'active' : '']"
                @click="controlSelctBottom('1F')"
              >
                1F
              </div>
              <div
                class="select-li"
                :class="[params.floor === '2F' ? 'active' : '']"
                @click="controlSelctBottom('2F')"
              >
                2F
              </div>
              <div
                class="select-li "
                :class="[params.floor === '3F' ? 'active' : '']"
                @click="controlSelctBottom('3F')"
              >
                3F
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="main-bottom-contain clearfix">
      <div
        v-for="(item,index) in pieData"
        :key="index"
        class="chatr-contain"
      >
        <div
          :id="'chartPIE'+index"
          class="chart"
        ></div>
        <div class="bbm">
          <img :src="require('@/assets/img/bb'+ renderIndex(index) +'.png')" />
          <span>{{ item.scene }}</span>
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
      isShowSelect: false,
      pieData: [],
      pieCharts: [],
      params: {
        projectId: 136,
        floor: '1F',
        zhibiao: 35
      },
      option: {
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
      }
    }
  },
  mounted() {
    this.axiosChartPIE(this.params);
  },
  methods: {
    /**
    * 获取数据-饼图组
    */
    axiosChartPIE(params) {
      this.$api.getFloorKpiValue(params).then((resp) => {
        if (resp.code === 10000) {
          let curdata = resp.data;
          curdata ? this.pieData = curdata : this.pieData = [];
          this.$nextTick(() => {
            _.forEach(this.pieData, (item, index) => {
              let chart = echarts.init(document.getElementById('chartPIE' + index));
              this.pieCharts.push(chart)
              this.option.series[0].data[0].value = Number(item.kpiData)
              this.option.series[0].data[1].value = 100 -  Number(item.kpiData)
              chart.setOption(this.option);
            })
          })
        }
      })
    },
    /**
     * 点击其他区域select收起公共事件
     */
    controlSelctBottom(value) {
      this.isShowSelect = !this.isShowSelect;
      this.params.floor = value;
      this.axiosChartPIE(this.params)
    },
    /**
     * 处理图片index
     */
    renderIndex(index) {
      if (index > 4) {
        return 5
      } else {
        return index + 1
      }
    }
  }
}
</script>

<style scoped>
.main-bottom-contain {
  width: 1800px;
  display: flex;
  overflow: auto;
}
.main-bottom-contain .chatr-contain {
  margin-right: 100px;
  margin-bottom: 22px;
  /* display: inline-block; */
}
.main-bottom-contain .fl:last-child {
  margin-right: 0;
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
  display: flex;
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


#zlbb {
  width: 100%;
  list-style-type: none;
  background: url("~@/assets/img/all6.png") no-repeat;
  padding-left: 65px;
  height: 80px;
  margin-bottom: 80px;
  line-height: 80px;
}
#zlbb > li {
  font-size: 30px;
  color: #d19328;
  font-weight: 700;
  margin-right: 163px;
  display: inline-block;
}

.select {
  width: 85px;
}
.select-ul {
  width: 120px;
}

</style>