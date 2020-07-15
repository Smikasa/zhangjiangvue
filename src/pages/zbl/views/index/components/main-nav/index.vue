<template>
  <div>
    <div
      class="fl main-info-contain"
      v-for="(value,index) in spread"
      :key="index"
      :class="[value.classContain ? 'active' : '']"
      @click="changView(value)"
    >
      <div
        class="main-info-icon"
        :class="[value.class]"
      ></div>
      <div class="main-info-content clearfix">
        <div class="main-info-num">{{value.Num}}</div>
        <div class="main-info-title">{{value.name}}</div>
      </div>
    </div>
    <div class="main-info-bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spread: [
        {
          id: 'communitiesTotal',
          name: '小区总数',
          Num: 0,
          class: 'main-info-icon-communities',
          classContain: true
        }, {
          id: 'faultTotal',
          name: '故障告警总数',
          Num: 0,
          class: 'main-info-icon-alarm',
          classContain: false

        }, {
          id: 'performance',
          name: '性能预警数',
          Num: 0,
          class: 'main-info-icon-communities1',
          classContain: false
        }, {
          id: 'workOrder',
          name: '工单总数',
          Num: 0,
          class: 'main-info-icon-communities2',
          classContain: false
        }, {
          id: 'duty',
          name: '到岗人员数',
          Num: 0,
          class: 'main-info-icon-communities3',
          classContain: false
        }
      ],
    }
  },
  methods: {
    changView(item) {
      this.spread.filter((value) => {
        value.id === item.id ? value.classContain = true : value.classContain = false;
      })
      this.$emit("changView", item.id)
    }
  }
}
</script>

<style scoped>
.main-info-contain {
  width: 360px;
  padding-left: 125px;
  padding-top: 60px;
  cursor: pointer;
  position: relative;
}

.main-info-contain.active::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 16px solid transparent;
  border-right: 15px  solid transparent;
  border-bottom: 16px solid #d19328;
  border-left: 15px  solid transparent;
  bottom: -20px;
  left: 47%;
}

.main-info-icon {
  position: absolute;
  left: 0;
  top: 46px;
  width: 160px;
  height: 180px;
  background-size: 100%;
  background-repeat: no-repeat;
}

.main-info-icon.main-info-icon-communities {
  background-image: url("~@/assets/img/zll4.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}
.main-info-icon.main-info-icon-alarm {
  background-image: url("~@/assets/img/zll2.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}
.main-info-icon.main-info-icon-communities1 {
  background-image: url("~@/assets/img/zll5.png");
  /* background-size: 130%;
  background-position: -12px -25px; */
}
.main-info-icon.main-info-icon-communities2 {
  background-image: url("~@/assets/img/zll3.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}
.main-info-icon.main-info-icon-communities3 {
  background-image: url("~@/assets/img/zll1.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}

.main-info-content {
  float: left;
  padding-left: 8px;
}

.main-info-content .main-info-num {
  font-size: 60px;
  color: white;
  margin-bottom: 21px;
}

.main-info-content .main-info-title {
  font-size: 28px;
  color: #248ecc;
}
.main-info-bottom {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  background-size: 100% 100%;
  bottom: 0px;
  height: 142px;
  background-image: url("~@/assets/img/top-bg.png");
}
</style>