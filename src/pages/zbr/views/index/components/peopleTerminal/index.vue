<template>
  <div>
    <div class="fl left-top-number">
      <div class="top-title fontTitle">
        人数曲线图
      </div>
      <ul class="clearfix tab">
        <li
          class="tab-pane fl"
          :class="[curPeopleNumber === 5 ?'active':'']"
          @click="changCurPeopleNumber(5)"
        >
          5分钟
        </li>
        <li
          class="tab-pane fl"
          :class="[curPeopleNumber === 15 ?'active':'']"
          @click="changCurPeopleNumber(15)"
        >
          15分钟
        </li>
      </ul>
      <peopel :cur-time="curTime"></peopel>
    </div>
    <div class="fl left-top-terminal">
      <div class="top-title fontTitle">
        终端型号分布
      </div>
      <div>
        <terminal></terminal>  
      </div>
    </div>
  </div>
</template>

<script>
import peopel from './_chart_people.vue'
import terminal from './_chart_terminal.vue'
export default {
  components: {
    peopel,
    terminal
  },
  data() {
    return {
      curPeopleNumber: 5,
      chartPeopleNumber: "",
      curTime:5,
    }
  },
  methods: {
    /**
     * @description 人数曲线图 切换五分钟/十分钟
     */
    changCurPeopleNumber(data) {
      // tab 效果
      this.curPeopleNumber = data;
      // 数据切换
      this.curTime = data
    },
    
  }
}
</script>

<style scoped>
.left-top-number {
  margin-right: 23px;
}

.top-title {
  font-size: 30px;
  color: white;
  margin-bottom: 46px;
}
.tab {
  height: 46px;
  line-height: 46px;
  font-size: 26px;
  width: 486px;
  margin-bottom: 60px;
  cursor: pointer;
  text-align: center;
}
.tab-pane {
  width: 50%;
  color: #636666;
  background-color: #010817;
  cursor: pointer;
}

.tab-pane.active {
  background-color: #4457a4;
  color: #c7c7c8;
}
</style>