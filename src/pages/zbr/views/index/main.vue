<template>
  <div class="main__div">
    <div class="rightThree">
      <img src="@/assets/img/r1.png" />
      <img src="@/assets/img/r2.png" />
      <img src="@/assets/img/r3.png" />
    </div>
    <div class="top__div">
      <total></total>
    </div>
    <div class="left__div">
      <div class="left-top__div clearfix">
        <peopleTerminal></peopleTerminal>
      </div>
      <div class="left-center__div">
        <spread></spread>
      </div>
      <div class="left-bottom__div">
        <gender></gender>
      </div>
    </div>
    <div class="right__div">
    </div>
  </div>
</template>

<script>
import total from './components/total/index.vue';
import peopleTerminal from './components/peopleTerminal/index.vue';
import spread from './components/spread/index.vue';
import gender from './components/gender/index';
export default {
  components: {
    total,
    peopleTerminal,
    spread,
    gender,
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.main__div {
  width: 2100px;
  padding: 87px 79px 80px 252px;
  line-height: 1;
}
.top__div {
  height: 238px;
  position: relative;
}

.left__div {
  width: 1106px;
}

.left-top__div {
  margin-bottom: 94px;
}

.people__div {
  margin-right: 37px;
}

.left-center__div {
  margin-bottom: 75px;
}
.left-bottom__div {
  color: white;
  margin-bottom: 0px;
}

.rightThree{
    position: absolute;
    right:80px;
    top:325px;
    height:1640px;
}
.rightThree img{
    width: 665px;
    display: block;
    margin-bottom:50px;
}
</style>