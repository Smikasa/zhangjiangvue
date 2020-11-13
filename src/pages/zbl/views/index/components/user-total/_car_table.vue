<template>
  <div class="el-table__zj">
    <el-table
      :data="tableData"
      :border="false"
      :height="650"
      style="width: 100%"
    >
      <el-table-column
        prop="carNo"
        label="车牌号"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="carBrand"
        label="车辆品牌"
      >
      </el-table-column>
      <el-table-column
        prop="carModel"
        label="车辆型号"
      >
      </el-table-column>
      <el-table-column
        prop="carInfo"
        label="车辆信息 "
      >
      </el-table-column>
      <el-table-column
        prop="lng"
        label="经度"
      >
      </el-table-column>
      <el-table-column
        prop="lat"
        label="纬度"
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

<style>

</style>