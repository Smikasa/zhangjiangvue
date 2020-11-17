<template>
  <div>
    <div class="pr">
      <img src="@/assets/img/r1.png" />
      <transition-group name="list">
        <div
          v-if="floor1.length > 0"
          key="1"
          class="floorCom"
          style="top: 291px; left: 260px"
        >
          <span> {{ floor1[0].STADIUM_NO }} {{ floor1[0].NUMS }}人 </span>
        </div>
        <div
          v-if="floor1.length > 1"
          key="2"
          class="floorCom"
          style="top: 222px; left: 244px"
        >
          <span> {{ floor1[1].STADIUM_NO }} {{ floor1[1].NUMS }}人 </span>
        </div>
        <div
          v-if="floor1.length > 2"
          key="3"
          class="floorCom"
          style="top: 207px; left: 390px"
        >
          <span> {{ floor1[1].STADIUM_NO }} {{ floor1[1].NUMS }}人 </span>
        </div>
        <div
          v-if="floor1.length > 3"
          key="4"
          class="floorCom"
          style="top: 247px; left: 447px"
        >
          <span> {{ floor1[1].STADIUM_NO }} {{ floor1[1].NUMS }}人 </span>
        </div>
      </transition-group>
      <div class="total">
        <span class="floorStyle"> 1F</span>
        共计
        <span class="floorNum">{{ floor1Total }}</span>
        人
      </div>
    </div>
    <div class="pr">
      <img src="@/assets/img/r2.png" />
      <transition-group name="list">
        <div
          v-if="floor2.length > 0"
          key="1"
          class="floorCom"
          style="top: 292px; left: 289px"
        >
          <span> {{ floor2[0].STADIUM_NO }} {{ floor2[0].NUMS }}人 </span>
        </div>
        <div
          v-if="floor2.length > 1"
          key="2"
          class="floorCom"
          style="top: 216px; left: 221px"
        >
          <span> {{ floor2[1].STADIUM_NO }} {{ floor2[1].NUMS }}人 </span>
        </div>
        <div
          v-if="floor2.length > 2"
          key="3"
          class="floorCom"
          style="top: 169px; left: 355px"
        >
          <span> {{ floor2[2].STADIUM_NO }} {{ floor2[2].NUMS }}人 </span>
        </div>
        <div
          v-if="floor2.length > 3"
          key="4"
          class="floorCom"
          style="top: 198px; left: 447px"
        >
          <span> {{ floor2[3].STADIUM_NO }} {{ floor2[3].NUMS }}人 </span>
        </div>
      </transition-group>
      <div class="total">
        <span class="floorStyle"> 2F</span>
        共计
        <span class="floorNum">{{ floor2Total }}</span>
        人
      </div>
    </div>

    <div class="pr">
      <img src="@/assets/img/r3.png" />
      <transition-group name="list">
        <div
          v-if="floor3.length > 0"
          key="1"
          class="floorCom"
          style="top: 226px; left: 190px"
        >
          <span> {{ floor3[0].STADIUM_NO }} {{ floor3[0].NUMS }}人 </span>
        </div>
        <div
          v-if="floor3.length > 1"
          key="2"
          class="floorCom"
          style="top: 180px; left: 238px"
        >
          <span> {{ floor3[1].STADIUM_NO }} {{ floor3[1].NUMS }}人 </span>
        </div>
        <div
          v-if="floor3.length > 2"
          key="3"
          class="floorCom"
          style="top: 169px; left: 355px"
        >
          <span> {{ floor3[2].STADIUM_NO }} {{ floor3[2].NUMS }}人 </span>
        </div>
        <div
          v-if="floor3.length > 3"
          key="4"
          class="floorCom"
          style="top: 198px; left: 447px"
        >
          <span> {{ floor3[3].STADIUM_NO }} {{ floor3[3].NUMS }}人 </span>
        </div>
      </transition-group>
      <div class="total">
        <span class="floorStyle"> 3F</span>
        共计
        <span class="floorNum">{{ floor3Total }}</span>
        人
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      floor1: [],
      floor1Total: 0,
      floor2: [],
      floor2Total: 0,
      floor3: [],
      floor3Total: 0,
    };
  },
  mounted() {
    this.axiosFloorScenePeopleDistribution({
      floor: 1,
    });
    this.axiosFloorScenePeopleDistribution({
      floor: 2,
    });
    this.axiosFloorScenePeopleDistribution({
      floor: 3,
    });
  },
  methods: {
    axiosFloorScenePeopleDistribution(params) {
      this.$api.floorScenePeopleDistribution(params).then((resp) => {
        if (resp.code === 10000) {
          if (params.floor === 1) {
            this.floor1 = resp.data;
            this.floor1Total = this.getTotal(resp.data);
          } else if (params.floor === 2) {
            this.floor2 = resp.data;
            this.floor2Total = this.getTotal(resp.data);
          } else if (params.floor === 3) {
            this.floor3 = resp.data;
            this.floor3Total = this.getTotal(resp.data);
          }
        }
      });
    },
    getTotal(array) {
      let num = 0;
      array.map((value, index) => {
        num += parseInt(value.NUMS);
      });
      return num;
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
.total {
  position: absolute;
  width: 100%;
  right: 8px;
  bottom: 8px;
  text-align: right;
  font-size: 22px;
  padding: 0 8px;
  color: white;
}
.total span {
  display: inline-block;
}
.total .floorNum {
  color: orange;
}
.total .floorStyle {
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  background-color: #195086;
  border-radius: 50%;
}
</style>