<template>
  <div>
    <div class="title__zj">
      已派单预警列表
    </div>
    <div class="el-table__zj">
      <el-table
        :data="tableData"
        :border="false"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
.title__zj {
    color: white;
    font-size: 26px;
    margin: 10px 0;
}
.el-table__zj .el-table {
  background-color: transparent;
}
.el-table__zj .el-table thead {
  color: white;
}
.el-table__zj .el-table__header-wrapper th {
  background-color: #248ecc;
}

.el-table__zj .el-table .el-table__body-wrapper th:hover {
  background-color: transparent;
}

.el-table__zj .el-table .el-table__body-wrapper tr:hover {
  background-color: transparent;
}

.el-table__zj .el-table .el-table__body-wrapper th,
.el-table__zj .el-table .el-table__body-wrapper tr {
  background-color: transparent;
}

.el-table__zj .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}

.el-table__zj .el-table td,
.el-table__zj .el-table th.is-leaf {
  border-color: transparent;
}
.el-table__zj .el-table--border::after,
.el-table__zj .el-table--group::after,
.el-table__zj .el-table::before {
  background-color: transparent;
}
</style>