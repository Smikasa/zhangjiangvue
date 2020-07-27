<template>
  <div>
    <div class="main-center-title">
      <ul class="clearfix tabs">
        <li
          class="tab"
          :class="[curTabsName === '0' ? 'active' : '']"
          @click="tabsChange('0')"
        >
          <div>4G性能</div>
          <!-- <img src="img/yelloLog.png" /> -->
        </li>
        <li
          class="tab"
          :class="[curTabsName === '1' ? 'active' : '']"
          @click="tabsChange('1')"
        >
          <div>5G性能</div>
        </li>
        <li
          class="tab"
          :class="[curTabsName === '2' ? 'active' : '']"
          @click="tabsChange('2')"
        >
          <div>数据感知</div>
        </li>
        <li
          class="tab"
          :class="[curTabsName === '3' ? 'active' : '']"
          @click="tabsChange('3')"
        >
          <div>语音感知</div>
        </li>
        <li class="tab r1">
          <div class="select">
            <div
              class="select-name"
              :class="[!isShowSelect ? 'select-open' : 'select-close']"
              @click="controlSelct"
            >
              颗粒度选择
            </div>
            <div
              v-show="isShowSelect"
              class="select-ul"
            >
              <div
                class="select-li"
                @click="controlSelct"
              >
                颗粒度选择
              </div>
              <div
                class="select-li"
                @click="controlSelct"
              >
                颗粒度选择
              </div>
              <div
                class="select-li"
                @click="controlSelct"
              >
                颗粒度选择
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 4G性能 -->
    <four
      v-show="curTabsName === '0'"
      class="main-center-contain"
    ></four>
    <!-- 5G性能 -->
    <five
      v-show="curTabsName === '1'"
      class="main-center-contain"
    ></five>
    <!-- 数据感知 -->
    <record
      v-show="curTabsName === '2'"
      class="main-center-contain"
    ></record>
    <!-- 语音感知 -->
    <voice
      v-show="curTabsName === '3'"
      class="main-center-contain"
    ></voice>
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
.main-center-contain {
  overflow: hidden;
}
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
</style>