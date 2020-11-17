<template>
  <div>
    <div class="pr">
      <img src="@/assets/img/r1.png" />
      <!-- <transition-group name="bounce">
        <div
          key="1"
          class="floorCom"
          style="top: 291px; left: 260px"
        ></div>
        <div
          key="2"
          class="floorCom"
          style="top: 222px; left: 244px"
        ></div>
        <div
          key="3"
          class="floorCom"
          style="top: 207px; left: 390px"
        ></div>
        <div
          key="4"
          class="floorCom"
          style="top: 247px; left: 447px"
        ></div>
      </transition-group> -->
    </div>
    <img src="@/assets/img/r2.png" />
    <div class="pr">
      <img src="@/assets/img/r3.png" />
      <transition-group name="list">
        <div
          v-show="isShow"
          key="1"
          class="floorCom"
          style="top: 226px; left: 190px"
        ></div>
        <div
          v-show="isShow"
          key="2"
          class="floorCom"
          style="top: 180px; left: 238px"
        ></div>
        <div
          v-show="isShow"
          key="3"
          class="floorCom"
          style="top: 169px; left: 355px"
        ></div>
        <div
          v-show="isShow1"
          key="4"
          class="floorCom"
          style="top: 198px; left: 447px"
        >
          <span> {{ STADIUM_NO }} {{ NUMS }}人 </span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isShow1: false,
      STADIUM_NO: "",
      NUMS: "",
    };
  },
  mounted() {
    this.axiosFloorScenePeopleDistribution();
  },
  methods: {
    axiosFloorScenePeopleDistribution() {
      this.$api.floorScenePeopleDistribution().then((resp) => {
        if (resp.code === 10000) {
          this.STADIUM_NO = resp.data[0].STADIUM_NO;
          this.NUMS = resp.data[0].NUMS;
          this.isShow1 = true;
        }
      });
    },
  },
};
</script>

<style>
.pr {
  position: relative;
}
/* 楼层标识 */
.floorCom {
  width: 25px;
  height: 28px;
  /* border-radius: 50%; */
  background-repeat: no-repeat;
  position: absolute;
  background-image: url("~@/assets/img/floor.png");
  transition: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.rightThree img {
  width: 655px;
  display: block;
  margin-bottom: 50px;
}
.floorCom span {
  position: absolute;
  font-size: 22px;
  color: white;
  top: -25px;
  left: -24px;
  min-width: 172px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>