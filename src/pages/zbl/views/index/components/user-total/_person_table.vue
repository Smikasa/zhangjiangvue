<template>
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
</template>

<script>
export default {
  props:{
    tableData:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
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