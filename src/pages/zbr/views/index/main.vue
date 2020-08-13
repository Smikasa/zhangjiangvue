<template>
  <div class="main__div">
    <div class="rightThree">
      <img src="@/assets/img/r1.png" />
      <img src="@/assets/img/r2.png" />
      <img src="@/assets/img/r3.png" />
    </div>
    <total class="top__div"></total>
    <div class="left__div">
      <peopleTerminal class="left-top__div clearfix"></peopleTerminal>
      <spread class="left-center__div"></spread>
      <gender class="left-bottom__div"></gender>
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
  width: 1769px;
  padding: 79px 79px 78px 252px;
  line-height: 1;
  box-sizing: content-box;
  position: relative;
}
.top__div {
  height: 239px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.left__div {
  width: 1106px;
}

.left-top__div {
  margin-bottom: 40px;
}

.people__div {
  margin-right: 37px;
}

.left-center__div {
  margin-bottom: 70px;
}
.left-bottom__div {
  color: white;
  margin-bottom: 0px;
}

.rightThree{
    position: absolute;
    right:79px;
    top:325px;
    height:1640px;
}
.rightThree img{
    width: 655px;
    display: block;
    margin-bottom:50px;
}
</style>