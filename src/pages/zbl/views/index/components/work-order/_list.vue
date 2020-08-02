<template>
  <div>
    <div class="title__zj">
      工单列表
    </div>
    <div class="el-table__zj">
      <el-table
        :data="tableData"
        :border="false"
        :height="1450"
        style="width: 100%"
      >
        <el-table-column
          prop="taskId"
          label="工单ID"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="taskTitle"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="taskClass"
          label="任务类型"
        >
        </el-table-column>
        <el-table-column
          prop="taskLevel"
          label="任务等级"
        >
        </el-table-column>
        <el-table-column
          prop="taskState"
          label="任务状态"
        >
        </el-table-column>
        <el-table-column
          prop="taskCreateTime"
          label="任务创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="taskSolvedTime"
          label="工单处理时长（分钟）"
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="处理人ID"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="处理人名称"
        >
        </el-table-column>
        <el-table-column
          prop="kpiWarningId"
          label="性能预警ID"
        >
        </el-table-column>
        <el-table-column
          prop="alarmUniqueId"
          label="故障告警指纹id"
        >
        </el-table-column>
        <el-table-column
          prop="Taskreply"
          label="任务处理结果"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      params: {
        projectId:136,
        studioId: 20, //场馆ID
        userId: 12,  //用户id
        page: 1, //第几页 page不传默认为1
        size: 10,//每页显示数  size 不传默认为10 page,size都不传查所有
        createTimeMin: this.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        createTimeMax: this.$moment(new Date).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted() {
    this.getTaskList(this.params);
  },
  methods: {
    /**
     * 获取总览数据
    */
    getTaskList(params) {
      this.$api.getTaskList(params).then((resp) => {
        if (resp.code === 1000) {
          let curdata = resp.data;
          curdata ? this.tableData = curdata : this.tableData = [];
        }
      })
    }
  }
}
</script>

<style scoped>
.title__zj {
  color: white;
  font-size: 26px;
  margin: 10px 0;
  margin-bottom: 42px;
}
</style>