<template>
  <div>
    <div class="main-center-contain-left fl">
      <ul class="zcl zcl-four">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON1.png"
          >
          <p class="zl-box">
            <span class="list-name">告警总数</span>
            <span class="list-data">{{ alarmTotal }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON2.png"
          >
          <p class="zl-box">
            <span class="list-name">已消除告警数</span>
            <span class="list-data">{{ alarmSolved }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON3.png"
          >
          <p class="zl-box">
            <span class="list-name">已派单告警数</span>
            <span class="list-data">{{ alarmTaskSend }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON3.png"
          >
          <p class="zl-box">
            <span class="list-name">未派单告警数</span>
            <span class="list-data">{{ alarmNoTask }}</span>
          </p>
        </li>
      </ul>
      <ul class="zcl">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON4.png"
          >
          <p class="zl-box">
            <span class="list-name">无线网告警数</span>
            <span class="list-data">{{ alarmWirelessNetwork }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON5.png"
          >
          <p class="zl-box">
            <span class="list-name">核心网告警数</span>
            <span class="list-data">{{ alarmCoreNetwork }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON6.png"
          >
          <p class="zl-box">
            <span class="list-name">传输告警数</span>
            <span class="list-data">{{ alarmTransfer }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON7.png"
          >
          <p class="zl-box">
            <span class="list-name">家宽告警数</span>
            <span class="list-data">{{ alarmHomewire }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON8.png"
          >
          <p class="zl-box">
            <span class="list-name">动环告警数</span>
            <span class="list-data">{{ alarmPowerAround }}</span>
          </p>
        </li>
      </ul>
      <ul class="zcl zcl-four">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON7.png"
          >
          <p class="zl-box">
            <span class="list-name">一级告警数</span>
            <span class="list-data">{{ alarmLevel1 }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON8.png"
          >
          <p class="zl-box">
            <span class="list-name">二级告警数</span>
            <span class="list-data">{{ alarmLevel2 }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON8.png"
          >
          <p class="zl-box">
            <span class="list-name">三级告警数</span>
            <span class="list-data">{{ alarmLevel3 }}</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/ICON8.png"
          >
          <p class="zl-box">
            <span class="list-name">四级告警数</span>
            <span class="list-data">{{ alarmLevel4 }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alarmTotal: '--', //告警总数
      alarmSolved: '--', //已消除告警数
      alarmTaskSend: '--', // 已派单告警数
      alarmNoTask: '--',  //未派单告警数
      alarmWirelessNetwork: '--', //无线网告警数
      alarmCoreNetwork: '--', //核心网告警数
      alarmTransfer: '--',//传输告警数
      alarmHomewire: '--', //家宽告警数
      alarmPowerAround: '--',//动环告警数
      alarmLevel1: '--', //一级告警数
      alarmLevel2: '--', //二级告警数
      alarmLevel3: '--', //三级告警数
      alarmLevel4: '--', //四级告警数
      params: {
        projectId: 132, //项目id
      }
    }
  },
  mounted() {
    this.getFaultAlarmCountsPandect(this.params);
  },
  methods: {
    /**
     * 获取总览数据
    */
    getFaultAlarmCountsPandect(params) {
      this.$api.getFaultAlarmCountsPandect(params).then((resp) => {
        if (resp.code === 1000) {
          let curdata = resp.data;
          this.alarmTotal = curdata.alarmTotal; //告警总数
          this.alarmSolved = curdata.alarmSolved;  //已消除告警数
          this.alarmTaskSend = curdata.alarmTaskSend;  // 已派单告警数
          this.alarmNoTask = curdata.alarmNoTask;   //未派单告警数
          this.alarmWirelessNetwork = curdata.alarmWirelessNetwork;  //无线网告警数
          this.alarmCoreNetwork = curdata.alarmCoreNetwork;  //核心网告警数
          this.alarmTransfer = curdata.alarmTransfer; //传输告警数
          this.alarmHomewire = curdata.alarmHomewire;  //家宽告警数
          this.alarmPowerAround = curdata.alarmPowerAround; //动环告警数
          this.alarmLevel1 = curdata.alarmLevel1;  //一级告警数
          this.alarmLevel2 = curdata.alarmLevel2;  //二级告警数
          this.alarmLevel3 = curdata.alarmLevel3;  //三级告警数
          this.alarmLevel4 = curdata.alarmLevel4;  //四级告警数
        } else {
          this.$message({
            message: resp.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.main-center-contain-left ul.zcl {
  list-style-type: none;
  background: url("~@/assets/img/1-2.png");
  background-size: 100%;
  width: 475px;
  height: 350px;
  margin-bottom: 40px;
  padding: 20px 0;
  box-sizing: border-box;
  float: left;
  margin-right: 120px;
  overflow: hidden;
}

.main-center-contain-left ul.zcl > li {
  height: 50px;
  padding-left: 15px;
  margin-bottom: 15px;
  display: block;
  overflow: hidden;
}
.main-center-contain-left ul.zcl.zcl-four {
  padding: 30px 0 20px 0;

}
.main-center-contain-left ul.zcl.zcl-four > li{
   margin-bottom: 30px;
}
.main-center-contain-left ul.zcl > li:last-child {
  margin-bottom: 0;
}
.main-center-contain-left ul.zcl > li span {
  display: inline-block;
}
.main-center-contain-left ul.zcl > li .list-icon {
  width: 46px;
  height: 46px;
  float: left;
  vertical-align: middle;
}

.zl-box {
  float: left;
  width: 395px;
  height: 46px;
  line-height: 20px;
  background: url("~@/assets/img/zllbg.png") no-repeat;
  background-size: 100%;
  margin-left: 15px;
  vertical-align: middle;
  margin-top: 5px;
  padding: 10px 0 10px 8px;
  box-sizing: border-box;
}

.list-name {
  font-size: 25px;
  color: #abadc1;
}
.list-data {
  font-size: 25px;
  color: #fff;
  font-weight: 700;
  float: right;
  margin-right: 42px;
}
</style>