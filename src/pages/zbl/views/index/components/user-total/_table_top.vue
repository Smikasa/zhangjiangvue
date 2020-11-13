<template>
  <div>
    <div class="main-title">
      <ul class="clearfix tabs">
        <li
          class="tab"
          :class="[curTabsName === '1' ? 'active' : '']"
          @click="tabsChange('1')"
        >
          <div>
            人员
          </div>
        </li>
        <li
          class="tab"
          :class="[curTabsName === '2' ? 'active' : '']"
          @click="tabsChange('2')"
        >
          <div>
            车辆备件
          </div>
        </li>
      </ul>
      <div class="page__div">
        <el-pagination
          v-show="curTabsName === '1'"
          layout="prev, pager, next"
          :current-page.sync="personParams.page"
          :size="personParams.size"
          :total="personTableData.length"
          @current-change="changePersonPage"
        >
        </el-pagination>
        <!-- <el-pagination
          v-show="curTabsName === '2'"
          layout="prev, pager, next"
          :current-page.sync="carParams.page"
          :size="carParams.size"
          :total="carTableData.length"
          @current-change="changeCarPage"
        >
        </el-pagination> -->
        <!-- :total="carTableData.length" -->
      </div>
    </div>
    <div class="main-contain">
      <personTable
        v-show="curTabsName === '1'"
        :table-data="personTableData"
      />  
      <carTable
        v-show="curTabsName === '2'"
        :table-data="carTableData"
      />  
    </div>
  </div>
</template>

<script>
import carTable from './_car_table'
import personTable from './_person_table'
export default {
  components:{
    carTable,
    personTable
  },
  data() {
    return {
      curTabsName: "1",
      personTableData: [],
      carTableData:[],
      carParams: {
        projectId: 136,  //项目id   
        // page: 1, //第几页
        // size: 10,//每页显示数
      },
      personParams:{
        projectId: 136,  //项目id   
        page: 1, //第几页
        size: 10,//每页显示数
      }
    }
  },
  mounted(){
    this.getOnDutypersonList(this.personParams);
    this.getOnDutyCarList(this.carParams);
  },
  methods: {
    tabsChange(tab) {
      this.curTabsName = tab;
    },
    changePersonPage(page) {
      this.getOnDutypersonList(this.personParams) 
    },
    changeCarPage(page) {
      this.getOnDutyCarList(this.carParams)
    },
    // 获取人员
    getOnDutypersonList(params) {
      this.$api.getOnDutypersonList(params).then((resp) => {
          if (resp.code === 10000) {
          let curdata = resp.data;
          curdata ? this.personTableData = curdata : this.personTableData = [];
          }
      })
    },
    // 获取车辆备件
    getOnDutyCarList(params) {
      this.$api.getOnDutyCarList(params).then((resp) => {
          if (resp.code === 10000) {
          let curdata = resp.data;
          curdata ? this.carTableData = curdata : this.carTableData = [];
          }
      })
    }
  }
}
</script>

<style scoped>
.main-title {
  background-size: 100%;
  height: 83px;
  line-height: 83px;
  margin-bottom: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.page__div {
  padding-top: 37px;
}
.main-title ul {
  list-style-type: none;
  position: relative;
}
.main-title ul > li {
  margin-right: 50px;
  font-size: 30px;
  color: #154b65;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  float: left;
}
.main-title ul > li.r1 {
  float: right;
}
.main-title ul > li.r1 select {
  color: #d19328;
  font-size: 30px;
  border: none;
  background-color: transparent;
}

.main-title ul > li.active {
  color: #fff;
}
.main-title ul > li.tab.active div {
  position: relative;
}

.main-title ul > li.tab.active div:after {
  content: "";
  /* width: 97%; */
  height: 5px;
  background-color: #d19328;
  width: 100%;
  display: block;
  position: absolute;
  bottom: 6px;
}
.main-contain {
  margin-bottom: 35px;
}

</style>