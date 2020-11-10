<template>
  <div>
    <div class="title__zj">
      已派单预警列表
      <div class="page__div">
        <el-pagination
          layout="prev, pager, next"
          :current-page.sync="params.page" 
          :page-size="params.size"
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
        height="670px"
        style="width: 100%"
      >
        <el-table-column
          prop="kpiWarningId"
          label="预警ID"
        />
        <el-table-column
          prop="kpiWarningType"
          label="预警类"
        />
        <el-table-column
          prop="kpiWarningState"
          label="预警状态"
          width="120"
        />
        <el-table-column
          prop="cellId"
          label="小区ID"
        />
        <el-table-column
          prop="taskId"
          label="工单ID"
          width="120"
        />
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="180"
        />
        <el-table-column
          prop="lastTime"
          label="结束时间"
          width="120"
        />
        <el-table-column
          prop="lastTime"
          label="持续时间"
          width="120"
        />
        <el-table-column
          prop="kpiWarningDescribe"
          label="预警描述"
        />
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
        projectId: 132, //项目id
        page: 1, //第几页 page不传默认为1
        size: 10,//每页显示数  size 不传默认为10 page,size都不传查所有
        startTimeMin: this.$moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
        startTimeMax: this.$moment(new Date).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  mounted() {
    this.getPerformanceList(this.params);
  },
  methods: {
    /**
     * 获取总览数据
    */
    getPerformanceList(params) {
      this.$api.getPerformanceList(params).then((resp) => {
        if (resp.code === 10000) {
          let curdata = resp.data;
          curdata ? this.tableData = curdata : this.tableData = [];
        }
      })
    },
    changePage(page){
      this.getPerformanceList(this.params)
    },
    /**
     * 查看详情
     */
    handleClick(row) {},
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