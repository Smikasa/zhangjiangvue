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
          layout="prev, pager, next"
          :current-page.sync="params.page"
          :size="params.size"
          :total="tableData.length"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </div>
    <div class="main-contain">
      <div class="el-table__zj">
        <el-table
          :data="tableData"
          :border="false"
          :height="650"
          style="width: 100%"
        >
          <el-table-column
            prop="userId"
            label="人员ID"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="人员名称"
            width="100"
          >
          </el-table-column>
          <el-table-column 
            label="签到状态"
            width="100"
          >
            <template slot-scope="scope">
              <div
                v-if="Number(scope.row.state) === 0 "
                class="red"
              >
                无
              </div>
              <div
                v-else-if="Number(scope.row.state) === 1 "
                class="cyan"
              >
                签到
              </div>
              <div
                v-else-if="Number(scope.row.state) === 2 "
                class="orange"
              >
                签退
              </div>
              <div
                v-else
                class=""
              >
                {{ scope.row.state }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="ecg"
            label="小区ECG"
          >
          </el-table-column>
          <el-table-column
            prop="cellName"
            label="主服小区名称"
          >
          </el-table-column>
          <el-table-column
            prop="sinr"
            label="主服小区信号质量"
          >
          </el-table-column>
          <el-table-column
            prop="rsrp"
            label="主服小区信号强度"
          >
          </el-table-column>
          <el-table-column
            prop="scene"
            label="人员所处场景名称"
          >
          </el-table-column>
          <el-table-column
            prop="taskTotal"
            label="工单总数"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="solvedTask"
            label="已处理工单数"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="processingTask"
            label="处理中工单数"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="pendingTask"
            label="待处理工单数"
            width="120"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curTabsName: "1",
      tableData: [],
      params: {
        projectId: 136,  //项目id   
        page: 1, //第几页
        size: 10,//每页显示数
      }
    }
  },
  mounted() {
    this.getUsers(this.params)
  },
  methods: {
    tabsChange(tab) {
      this.curTabsName = tab;
    },
    /**
    * 获取总览数据
   */
    getUsers(params) {
      this.$api.getUsers(params).then((resp) => {
        if (resp.code === 10000) {
          let curdata = resp.data;
          curdata ? this.tableData = curdata : this.tableData = [];
        }
      })
    },
    changePage(page) {
      this.getUsers(this.params)
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
.cyan {
  color: rgba(1, 241, 255);
}
.orange {
  color: rgb(255, 134, 0);
}
.red {
  color: rgb(187, 46, 59);
}
</style>