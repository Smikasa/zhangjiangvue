<template>
  <div>
    <div>
      <ul class="clearfix tab">
        <li
          class="tab-pane fl fontTitle"
          :class="[curPeopleSpread === 0 ? 'active' : '']"
          @click="changCurPeopleSpread(0)"
        >
          地图
        </li>
        <li
          class="tab-pane fr fontTitle"
          :class="[curPeopleSpread === 1 ? 'active' : '']"
          @click="changCurPeopleSpread(1)"
        >
          列表
        </li>
      </ul>
    </div>
    <div v-show="curPeopleSpread === 0">
      <!-- 中国地图展示 -->
      <spreadMap
        :area="areaType"
        :map-data="mapData"
        @changType="changeMapType"
      ></spreadMap>
    </div>
    <div v-show="curPeopleSpread === 1">
      <spreadTable
        :area="areaType"
        :table-data="tableData"
        @changType="changeTableType"
      ></spreadTable>
    </div>
  </div>
</template>

<script>
import spreadMap from "./_map.vue";
import spreadTable from "./_table.vue";
export default {
  components: {
    spreadTable,
    spreadMap,
  },
  data() {
    return {
      curPeopleSpread: 0,
      areaType: "china",
      mapData: [],
      tableData: [],
      tmplArea: {
        china: 1,
        world: 2,
        province: 3,
      },
      params: {
        type: 1,
      },
    };
  },
  mounted() {
    this.axiosPassengerDistribution();
  },
  methods: {
    /**
     * @description 人数分布地图 切换地图/列表
     */
    changCurPeopleSpread(data) {
      this.curPeopleSpread = data;
      this.axiosPassengerDistribution(this.params);
    },
    // 切换1境内2境外3省内
    changeTableType(area) {
      this.areaType = area;
      this.params.type = this.tmplArea[area];
      this.axiosPassengerDistribution(this.params);
    },
    // 切换1境内2境外3省内
    changeMapType(area) {
      this.areaType = area;
      this.params.type = this.tmplArea[area];
      this.axiosPassengerDistribution(this.params);
    },
    // 数据获取
    axiosPassengerDistribution(params) {
      this.$api.passengerDistribution(params).then((resp) => {
        if (resp.code === 10000) {
          this.tableData = this.transferTableData(resp.data);
          this.mapData = this.transferMapData(resp.data, this.areaType);
        }
      });
    },
    transferTableData(data) {
      let curObj = data[0];
      let curObjLength = Object.keys(curObj).length / 2;
      let tableData = [];
      for (let index = 1; index < curObjLength + 1; index++) {
        let obj = {
          name: curObj["SOURCE_IN_" + index],
          value: curObj["SOURCE_IN_" + index + "_NUM"],
        };
        tableData.push(obj);
      }
      return tableData;
    },
    transferMapData(data, area) {
      let curData = this.transferTableData(data);
      let curMapData = [];
      let centerArea = {
        name: "",
        value: 0,
      };
      for (let index = 0; index < curData.length; index++) {
        let element = curData[index];
        if (area === "china" && element.name === "云南") {
          centerArea = {
            name: element.name,
            value: element.value,
          };
        } else if (area === "world" && element.name === "中国") {
          centerArea = {
            name: element.name,
            value: element.value,
          };
        } else if (area === "province" && element.name === "滇池") {
          centerArea = {
            name: element.name,
            value: element.value,
          };
        }
      }
      for (let i = 0; i < curData.length; i++) {
        let element = curData[i];
        if (area === "china" && element.name !== "云南") {
          let arr = [
            centerArea,
            { name: element["name"], value: element["value"] },
          ];
          curMapData.push(arr);
        } else if (area === "world" && element["name"] === "中国") {
          let arr = [
            centerArea,
            { name: element["name"], value: element["value"] },
          ];
          curMapData.push(arr);
        } else if (area === "province" && element["name"] === "滇池") {
          let arr = [
            centerArea,
            { name: element["name"], value: element["value"] },
          ];
          curMapData.push(arr);
        }
      }
      return curMapData;
    },
  },
};
</script>

<style scoped>
.tab {
  height: 66px;
  line-height: 66px;
  font-size: 26px;
  width: 486px;
  margin-bottom: 27px;
  cursor: pointer;
  text-align: center;
}
.tab-pane.active {
  background-color: #1a2640;
  border-color: #163565;
  color: #ececec;
}

.tab-pane {
  width: 239px;
  border: 1px solid transparent;
  color: #656565;
  background-color: #020c1a;
  cursor: pointer;
}
</style>