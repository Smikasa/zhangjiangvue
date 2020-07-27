<template>
  <div>
    <top class="top__div" />
    <alarm-chart class="alarm-chart__div" />
    <alarm-list class="alarm-list__div" />
  </div>
</template>

<script>
import top from './_top'
import alarmList from './_alarm_list'
import alarmChart from './_alarm_chart'
export default {
  components: {
    top,
    alarmList,
    alarmChart
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.top__div {
  height: 430px;
}
.alarm-chart__div {
  height: 400px;
}
</style>