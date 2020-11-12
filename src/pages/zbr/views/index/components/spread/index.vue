<template>
  <div>
    <div>
      <ul class="clearfix tab">
        <li
          class="tab-pane fl fontTitle"
          :class="[curPeopleSpread === 0 ?'active':'']"
          @click="changCurPeopleSpread(0)"
        >
          地图
        </li>
        <li
          class="tab-pane fr fontTitle"
          :class="[curPeopleSpread === 1 ?'active':'']"
          @click="changCurPeopleSpread(1)"
        >
          列表
        </li>
      </ul>
    </div>
    <div v-show="curPeopleSpread === 0">
      <!-- 中国地图展示 -->
      <spreadMap></spreadMap>
    </div>
    <div v-show="curPeopleSpread === 1">
      <spreadTable></spreadTable>
    </div>
  </div>
</template>

<script>
import spreadMap from './_map.vue'
import spreadTable from './_table.vue'
export default {
  components: {
    spreadTable,
    spreadMap
  },
  data() {
    return {
      curPeopleSpread: 0
    }
  },
  methods: {
    /**
     * @description 人数分布地图 切换地图/列表
     */
    changCurPeopleSpread(data) {
      this.curPeopleSpread = data;
    },
  }
}
</script>

<style scoped>
.tab {
  height: 66px;
  line-height: 66px;
  font-size: 26px;
  width: 486px;
  margin-bottom: 27px;
  cursor: pointer;
  text-align: center;
}
.tab-pane.active {
  background-color: #1a2640;
  border-color: #163565;
  color: #ececec;
}

.tab-pane {
  width: 239px;
  border: 1px solid transparent;
  color: #656565;
  background-color: #020c1a;
  cursor: pointer;
}





</style>