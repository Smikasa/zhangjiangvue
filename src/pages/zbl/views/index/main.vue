<template>
  <div class="main__div">
    <main-time class="main-time__div"></main-time>
    <main-nav
      class="main-nav__div"
      @changView="changView"
    ></main-nav>
    <!-- 小区告警总数 -->
    <template v-if="curNav === 'communitiesTotal'">
      <main-center class="main-center__div"></main-center>
      <main-bottom class="main-bottom__div"></main-bottom>
    </template>
    <!-- 故障告警总数 -->
    <template v-else-if="curNav === 'faultTotal'">
      <fault-total></fault-total>
    </template>
    <!-- 性能预警数 -->
    <template v-else-if="curNav === 'performance'">
      <performance></performance>
    </template>
    <template v-else-if="curNav === 'workOrder'">
      <work-order></work-order>
    </template>
    <template v-else-if="curNav === 'duty'">
      <div>4</div>
    </template>
  </div>
</template>
<script>
import {  chartData,
  chartData1,
  chartData2,
  chartData3,
  chartData4,
  chartData5,
  chartData6,
  chartData7,
  chartData8,
  chartData9,
  chartData10,
  chartData11,
  chartData12,
  chartData13,
  chartData14,
  chartData15,} from './data/data.js';
import mainTime from './components/main-time/index.vue';
import mainNav from './components/main-nav/index.vue';
import mainCenter from './components/communities-total/main-center/index.vue';
import mainBottom from './components/communities-total/main-bottom/index.vue';
import faultTotal from './components/fault-total/index';
import performance from './components/performance/index';
import workOrder from './components/work-order/index';


export default {
  components: {
    mainTime,
    mainNav,
    mainCenter,
    mainBottom,
    faultTotal,
    performance,
    workOrder
  },
  data() {
    return {
      curNav: "communitiesTotal"
    };
  },
  created() {
  },
  methods: {
    changView(name) {
      this.curNav = name;
    }
  }
};
</script>

<style scoped>
.main__div {
  width: 2100px;
  height: 2100px;
  padding: 60px 254px 0 46px;
  line-height: 1;
  font-family: 'Microsoft YaHei',sans-serif;
}
.main-time__div {
  height: 112px;
  /* margin-bottom: 80px; */
}
.main-nav__div {
  height: 312px;
  position: relative;
}

.main-center__div {
  height: 969px;
  margin-bottom: 102px;
}

.main-bottom__div {
  height: 443px;
  margin-bottom: 161px;
}
</style>