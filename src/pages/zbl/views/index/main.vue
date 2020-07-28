<template>
  <div class="main__div">
    <main-time class="main-time__div" />
    <main-nav
      class="main-nav__div"
      @changView="changView"
    />
    <!-- 小区告警总数 -->
    <template v-if="curNav === 'cellTotal'">
      <main-center class="main-center__div" />
      <main-bottom class="main-bottom__div" />
    </template>
    <!-- 故障告警总数 -->
    <template v-else-if="curNav === 'alarmTotal'">
      <alarm-total />
    </template>
    <!-- 性能预警数 -->
    <template v-else-if="curNav === 'kpiWarningTotal'">
      <kpi-warning />
    </template>
    <!-- 工单总数 -->
    <template v-else-if="curNav === 'taskTotal'">
      <work-order />
    </template>
    <!-- 到岗人员数 -->
    <template v-else-if="curNav === 'userTotal'">
      <user-total />
    </template>
  </div>
</template>
<script>
import mainTime from './components/main-time/index.vue';
import mainNav from './components/main-nav/index.vue';
import mainCenter from './components/communities-total/main-center/index.vue';
import mainBottom from './components/communities-total/main-bottom/index.vue';
import alarmTotal from './components/alarm-total/index';
import kpiWarning from './components/kpi-warning/index';
import workOrder from './components/work-order/index';
import userTotal from './components/user-total/index'


export default {
  components: {
    mainTime,
    mainNav,
    mainCenter,
    mainBottom,
    alarmTotal,
    kpiWarning,
    workOrder,
    userTotal
  },
  data() {
    return {
      curNav: "userTotal"
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
  font-family: "Microsoft YaHei", sans-serif;
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