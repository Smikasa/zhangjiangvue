<template>
  <div>
    <div class="main-center-title">
      <ul class="clearfix tabs">
        <li
          class="tab"
          :class="[this.curTabsName === '0' ? 'active' : '']"
          @click="tabsChange('0')"
        >
          <div>4G性能</div>
          <!-- <img src="img/yelloLog.png" /> -->
        </li>
        <li
          class="tab"
          :class="[this.curTabsName === '1' ? 'active' : '']"
          @click="tabsChange('1')"
        >
          <div>5G性能</div>
        </li>
        <li
          class="tab"
          :class="[this.curTabsName === '2' ? 'active' : '']"
          @click="tabsChange('2')"
        >
          <div>数据感知</div>
        </li>
        <li
          class="tab"
          :class="[this.curTabsName === '3' ? 'active' : '']"
          @click="tabsChange('3')"
        >
          <div>语音感知</div>
        </li>
        <li class="tab r1">
          <div class="select">
            <div
              class="select-name"
              @click="controlSelct"
            >颗粒度选择</div>
            <div
              class="select-ul"
              v-show="isShowSelect"
            >
              <div
                class="select-li"
                @click="controlSelct"
              >颗粒度选择</div>
              <div
                class="select-li"
                @click="controlSelct"
              >颗粒度选择</div>
              <div
                class="select-li"
                @click="controlSelct"
              >颗粒度选择</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 4G性能 -->
    <four v-show="curTabsName === '0'"></four>
    <!-- 5G性能 -->
    <five v-show="curTabsName === '1'"></five>
    <!-- 数据感知 -->
    <record v-show="curTabsName === '2'"></record>
    <!-- 语音感知 -->
    <voice v-show="curTabsName === '3'"></voice>
  </div>
</template>

<script>
import four from './_four.vue'
import five from './_five.vue'
import record from './_record.vue'
import voice from './_voice.vue'

export default {
  components: {
    four,
    five,
    record,
    voice
  },
  data() {
    return {
      curTabsName: "0",
      isShowSelect: false,
    }
  },
  methods: {
    tabsChange(name) {
      this.curTabsName = name;
    },
    /**
     * 右侧筛选栏点击select弹出公共事件
     */
    controlSelct() {
      this.isShowSelect = !this.isShowSelect;
    },
  }
}
</script>

<style scoped>
.main-center-title {
  background: url("~@/assets/img/all6.png");
  background-size: 100%;
  height: 83px;
  line-height: 83px;
}

.main-center-title ul {
  list-style-type: none;
  /* padding-top:30px; */
  /* padding-bottom:24px; */
  padding-left: 45px;
  position: relative;
}
.main-center-title ul > li {
  margin-right: 85px;
  font-size: 30px;
  color: #154b65;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  float: left;
}
.main-center-title ul > li.r1 {
  float: right;
}
.main-center-title ul > li.r1 select {
  color: #d19328;
  font-size: 30px;
  border: none;
  background-color: transparent;
}

.main-center-title ul > li.active {
  color: #fff;
}
.main-center-title ul > li.tab.active div {
  position: relative;
}

.main-center-title ul > li.tab.active div:after {
  content: "";
  /* width: 97%; */
  height: 5px;
  background-color: #d19328;
  width: 100%;
  display: block;
  position: absolute;
  bottom: 6px;
}
.select {
  width: 160px;
  display: inline-block;
  height: 40px;
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
  background-color: #101b31;
}
.select-ul .select-li {
  font-size: 14px;
  padding: 8px 14px;
  cursor: pointer;
  color: #6a6a6a;
  line-height: 1;
}

.select-ul .select-li:hover {
  color: white;
}
</style>