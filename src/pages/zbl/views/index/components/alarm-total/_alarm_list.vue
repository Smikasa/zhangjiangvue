<template>
  <div>
    <div class="title__zj">
      已派单预警列表
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
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="orgSeverity"
          label="告警级别"
          width="120"
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
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="activeStatus"
          label="告警状态"
          width="120"
        >
          <template slot-scope="scope">
            {{ Number(scope.row.activeStatus) === 1 ? "已消除" : "未消除" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="taskId"
          label="工单ID"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="enb_ci"
          label="enb_ci"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleClick(scope.row)"
            >
              查看详情
            </el-button>
          </template>
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
        projectId: 136, //项目id
        studioId: 20, //场馆ID
        userId: 12, //用户id
        page: 1, //第几页 page不传默认为1
        size: 10, //每页显示数  size 不传默认为10 page,size都不传查所有
        startTimeMin: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        startTimeMax: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      },
    };
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
        if (resp.code === 10000) {
          let curdata = resp.data;
          let a = [].concat(curdata, curdata, curdata);
          // curdata ? this.tableData = curdata : this.tableData = [];
          this.tableData = a;
        }
      });
    },
    changePage(page) {
      this.getAlarmTable(this.params);
    },
    /**
     * 查看详情
     */
    handleClick(row) {
      if(window.alarmDetail){
        window.alarmDetail(row);
      }else {
        this.$message({
          message: '未定义故障告警详情函数alarmDetail',
          type: 'warning'
        });
      }
    },
  },
};
</script>

<style scoped>
.title__zj {
  color: white;
  font-size: 26px;
  margin-bottom: 42px;
}
</style>