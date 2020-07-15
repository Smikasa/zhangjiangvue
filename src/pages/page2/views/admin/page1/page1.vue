<template>
  <div>
    right
  </div>
</template>
<script>
import { getList } from "@/pages/page2/api/index";
export default {
  data() {
    return {
      list: null,
      listLoading: true
    };
  },
  created() {
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    }
  }
};
</script>

<style>
</style>