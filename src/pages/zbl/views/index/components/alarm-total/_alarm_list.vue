<template>
  <div>
    <div class="title__zj">
      已派单预警列表
    </div>
    <div class="el-table__zj">
      <el-table
        :data="tableData"
        :border="false"
        :height="650"
        style="width: 100%"
      >
        <el-table-column
          prop="alarmId"
          label="告警ID"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="orgSeverity"
          label="告警级别"
        >
        </el-table-column>
        <el-table-column
          prop="alarmTitle"
          label="告警标题"
        >
        </el-table-column>
        <el-table-column
          prop="alarmLocation"
          label="告警地址"
        >
        </el-table-column>
        <el-table-column
          prop="eventTime"
          label="告警开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="cancelTime"
          label="告警结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="lastTime"
          label="持续时间(分钟)"
        >
        </el-table-column>
        <el-table-column
          prop="activeStatus"
          label="告警状态"
        >
        </el-table-column>
        <el-table-column
          prop="taskId"
          label="工单ID"
        >
        </el-table-column>
        <el-table-column
          prop="enb_ci"
          label="enb_ci"
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
        projectId: 132, //项目id
        studioId: 20, //场馆ID
        userId: 12,  //用户id
        page: 1, //第几页 page不传默认为1
        size: 10,//每页显示数  size 不传默认为10 page,size都不传查所有
        startTimeMin: this.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        startTimeMax: this.$moment(new Date).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted() {
    this.getAlarmTable(this.params);
  },
  methods: {
    /**
     * 获取总览数据
    */
    getAlarmTable(params) {
      this.$api.getAlarmTable(params).then((resp) => {
        if (resp.code === 1000) {
          let curdata = resp.data;
          curdata ? this.tableData = curdata : this.tableData = [];
        } else {
          this.$message({
            message: resp.message,
            type: 'error',
            duration: 5 * 1000
          })
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
  margin-bottom: 42px;
}
</style>