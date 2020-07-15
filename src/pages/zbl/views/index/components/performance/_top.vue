<template>
  <div class="clearfix">
    <div class="main-center-contain-left fl">
      <ul
        class="zcl"
      >
        <li>
          <img
            class="list-icon"
            src="@/assets/img/1.png"
          >
          <p class="zl-box">
            <span class="list-name">预警总数</span>
            <span class="list-data">12321</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/2.png"
          >
          <p class="zl-box">
            <span class="list-name">已派单目消除预警数</span>
            <span class="list-data">99%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/3.png"
          >
          <p class="zl-box">
            <span class="list-name">已派单未消除预警数</span>
            <span class="list-data">99%</span>
          </p>
        </li>
      </ul>
      <ul class="zcl zcl-center">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/4.png"
          >
          <p class="zl-box">
            <span class="list-name">4G性能预警数</span>
            <span class="list-data">12321</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/5.png"
          >
          <p class="zl-box">
            <span class="list-name">5G性能预警数</span>
            <span class="list-data">1341</span>
          </p>
        </li>
      </ul>
      <ul class="zcl zcl-center">
        <li>
          <img
            class="list-icon"
            src="@/assets/img/7.png"
          >
          <p class="zl-box">
            <span class="list-name">SRVCC切换成功率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
        <li>
          <img
            class="list-icon"
            src="@/assets/img/8.png"
          >
          <p class="zl-box">
            <span class="list-name">PDCCH信道CCE利用率</span>
            <span class="list-data">99%</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main-center-contain-left ul.zcl {
  list-style-type: none;
  background: url("~@/assets/img/1-2.png");
  background-size: 100%;
  width: 475px;
  height: 240px;
  padding: 20px 0;
  box-sizing: border-box;
  float: left;
  margin-right: 120px;
}

.main-center-contain-left ul.zcl {
  list-style-type: none;
  background: url("~@/assets/img/1-2.png");
  background-size: 100%;
  width: 475px;
  height: 240px;
  padding: 20px 0;
  box-sizing: border-box;
  float: left;
  margin-right: 120px;
}

.main-center-contain-left ul.zcl.zcl-center {
  padding-top: 54px;
}


.main-center-contain-left ul.zcl > li {
  height: 50px;
  padding-left: 15px;
  margin-bottom: 30px;
  display: block;
  overflow: hidden;
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

.zl-box{
    float:left;
    width:395px;
    height: 46px;
    line-height: 20px;
    background: url("~@/assets/img/zllbg.png") no-repeat;
    background-size: 100%;
    margin-left: 15px;
    vertical-align: middle;
    margin-top: 5px;
    padding:10px 0 10px 8px;
    box-sizing: border-box;
}

.list-name{
    font-size:25px;
    color:#abadc1;
}
.list-data{
    font-size:25px;
    color:#fff;
    font-weight: 700;
    float: right;
    margin-right: 42px;
}
</style>