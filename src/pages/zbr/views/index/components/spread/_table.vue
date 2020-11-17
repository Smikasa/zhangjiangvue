<template>
  <div class="map-table-contain">
    <div class="table-item-contain">
      <div
        v-for="(item, index) in transferData(tableData)"
        :key="index"
        class="table-item clearfix"
      >
        <div class="table-progress-area fl">
          {{ item.name }}
        </div>
        <div class="table-progress fl clearfix">
          <div class="table-progress-bg">
            <div
              class="table-progress-pro fl"
              :style="{ width: item.pro }"
            >
              <div class="table-progress-num fl">
                {{ item.pro }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="map-table-btns clearfix">
      <div
        class="fl"
        :class="[area === 'china' ? 'active' : '']"
        @click="changSpreadMapTable('china')"
      >
        境内
      </div>
      <div
        class="fl"
        :class="[area === 'world' ? 'active' : '']"
        @click="changSpreadMapTable('world')"
      >
        境外
      </div>
      <div
        class="fl"
        :class="[area === 'province' ? 'active' : '']"
        @click="changSpreadMapTable('province')"
      >
        省内
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    area: {
      type: String,
      default: "china",
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },

  methods: {
    /**
     * @description 地图表格数据切换
     */
    changSpreadMapTable(area) {
      this.$emit("changType", area);
    },
    /**
     * @description 获取总数
     */
    transferData(array) {
      let num = 0;
      let arr = [];
      array.map(function (item) {
        num += item.value;
      });
      array.map(function (item) {
        let pro = Number((item.value / num) * 100).toFixed(2);
        let obj = {
          name: item.name,
          value: item.value,
          pro: pro + "%",
        };
        arr.push(obj);
      });
      return arr;
    },
  },
};
</script>

<style scoped>
.map-table-contain {
  position: relative;
  border: 1px solid #163565;
  overflow: auto;
  background-image: url("~@/assets/img/map-bg.png");
  background-size: 100% 100%;
}

.table-item-contain {
  margin: 90px 60px 59px;
  overflow: auto;
  height: 600px;
}

/* 进度条 */

.map-table-contain {
  width: 1042px;
  height: 760px;
}

.map-table-contain .table-item {
  /* width: 600px; */
  height: 20px;
  margin-bottom: 16px;
  color: white;
}
.map-table-contain .table-item .table-progress-area {
  margin-right: 16px;
  color: white;
  width: 55px;
}
.map-table-contain .table-item .table-progress {
  width: 700px;
  height: 20px;
  /* overflow: hidden; */
  position: relative;
}
.map-table-contain .table-item .table-progress .table-progress-bg {
  background-color: #021835;
  position: absolute;
  width: 770px;
  height: 20px;
  left: 0;
  top: 0;
}

.map-table-contain .table-item .table-progress .table-progress-pro {
  background-color: #0d4b98;
  width: 400px;
  height: 20px;
  position: relative;
}
.map-table-contain .table-item .table-progress .table-progress-num {
  height: 20px;
  position: absolute;
  right: -60px;
}

.map-table-btns {
  position: absolute;
  top: 21px;
  left: 18px;
  height: 0px;
  color: white;
}

.map-table-btns div {
  height: 46px;
  line-height: 46px;
  width: 200px;
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #020c1a;
  color: #c7c7c7;
}

.map-table-btns div.active {
  background-color: #1a2640;
}
</style>