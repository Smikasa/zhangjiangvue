<template>
  <div class="map-table-contain">
    <div class="table-item-contain">
      <div
        v-for="(item,index) in curPeopleSpradTable"
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
              :style="{width:item.pro}"
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
        :class="[curMapTableArea === 'china' ? 'active' : '']"
        @click="changSpreadMapTable('china')"
      >
        境内
      </div>
      <div
        class="fl"
        :class="[curMapTableArea === 'world' ? 'active' : '']"
        @click="changSpreadMapTable('world')"
      >
        境外
      </div>
      <div
        class="fl"
        :class="[curMapTableArea === 'province' ? 'active' : '']"
        @click="changSpreadMapTable('province')"
      >
        省内
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curMapTableArea: 'china',
      curPeopleSpradTable: [],
      beijingData1: [
        { name: '丰台区', value: 15 },
        { name: '石景山区', value: 595 },
      ],
      worldData1: [
        { name: 'Spain', value: 15 },
        { name: 'France', value: 595 },
        { name: 'United Kingdom', value: 25 }]
      ,
      chinaData1: [{ name: '山东', value: 5 },
      { name: '山西', value: 35 },
      { name: '广东', value: 59 },
      { name: '广西', value: 25 },
      { name: '北京', value: 45 },
      { name: '辽宁', value: 35 },
      { name: '海南', value: 34 },
      { name: '新疆', value: 35 },
      { name: '内蒙古', value: 65 },
      { name: '甘肃', value: 72 },
      { name: '河南', value: 36 },
      { name: '湖南', value: 54 },
      { name: '浙江', value: 76 },
      { name: '江苏', value: 34 },
      { name: '黑龙江', value: 97 },
      { name: '吉林', value: 52 },
      { name: '陕西', value: 57 },
      { name: '四川', value: 54 },
      { name: '福建', value: 35 },
      { name: '云南', value: 78 },
      { name: '江西', value: 95 },
      { name: '西藏', value: 63 },
      { name: '青海', value: 65 },
      { name: '香港', value: 35 },
      { name: '澳门', value: 85 },
      { name: '台湾', value: 35 },
      { name: '天津', value: 51 },
      { name: '宁夏', value: 35 },
      { name: '上海', value: 35 },
      { name: '重庆', value: 21 }
      ]
    }
  },
  methods: {
    /**
   * @description 地图表格数据切换
   */
    changSpreadMapTable(area) {
      this.curMapTableArea = area;
      if (area === 'world') {
        let data = this.cloneArr(this.worldData1)
        this.curPeopleSpradTable = this.getTotal(data);
      } else if (area === "china") {
        let data = this.cloneArr(this.chinaData1)
        this.curPeopleSpradTable = this.getTotal(data);
      } else if (area === 'province') {
        let data = this.cloneArr(this.beijingData1)
        this.curPeopleSpradTable = this.getTotal(data);
      }
    },
    cloneArr(array) {
      let arr = [];
      array.filter(function (item) {
        arr.push(Object.assign({}, item))
        return item;
      })
      return arr
    },
    /**
          * @description 获取总数
          */
    getTotal(array) {
      let num = 0;
      let arr = [];
      array.map(function name(item) {
        num += item.value
      })
      arr = array.map(function name(item) {
        item.value = (item.value / num).toFixed(2)
        item.pro = (item.value * 100) + '%'
        return item;
      })
      return arr;
    },
  }
}
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
  right: -40px;
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