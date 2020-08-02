<template>
  <div>
    <div
      v-for="(value,index) in spread"
      :key="index"
      class="fl main-info-contain"
      :class="[value.classContain ? 'active' : '']"
      @click="changView(value)"
    >
      <div
        class="main-info-icon"
        :class="[value.class]"
      ></div>
      <div class="main-info-content clearfix">
        <div
          :id="'total'+index"
          class="main-info-num"
        >
          <span class="t_num t_num1">00000</span>
        </div>
        <div class="main-info-title">
          {{ value.name }}
        </div>
      </div>
    </div>
    <div class="main-info-bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        projectId: 136, //项目id
        studioId: ''  //场馆ID 
      },
      spread: {
        cellTotal: {
          id: 'cellTotal',
          name: '小区总数',
          Num: 0,
          class: 'main-info-icon-communities',
          classContain: true
        },
        alarmTotal: {
          id: 'alarmTotal',
          name: '故障告警总数',
          Num: 0,
          class: 'main-info-icon-alarm',
          classContain: false
        },
        kpiWarningTotal: {
          id: 'kpiWarningTotal',
          name: '性能预警数',
          Num: 0,
          class: 'main-info-icon-communities1',
          classContain: false
        },
        taskTotal: {
          id: 'taskTotal',
          name: '工单总数',
          Num: 0,
          class: 'main-info-icon-communities2',
          classContain: false
        },
        userTotal: {
          id: 'userTotal',
          name: '到岗人员数',
          Num: 0,
          class: 'main-info-icon-communities3',
          classContain: false
        }
      },
    }
  },
  mounted() {
    this.getOverview(this.params);
  },
  methods: {
    /**
     * 切换
     */
    changView(item) {
      _.forIn(this.spread, (value, index) => {
        value.id === item.id ? value.classContain = true : value.classContain = false;
      })
      this.$emit("changView", item.id)
    },
    /**
     * 数字用照片显示
     */
    show_num1: function (n, ele) {
      var len = String(n).length;
      $(ele + " .t_num1").html('');
      for (var i = 0; i < len; i++) {
        $(ele + " .t_num1").append("<i></i>");
        var num = String(n).charAt(i);
        //根据数字图片的高度设置相应的值
        var y = parseInt(num) ? -(56 + (parseInt(num) - 1) * 81.7) : "-793";
        var obj = $(ele + " .t_num1 i").eq(i);
        // obj.animate({
        //   backgroundPosition: '-148px ' + String(y) + 'px'
        // }, 'slow', 'swing', function () {
        //   console.log('a')
        // });
        obj.css({ 'backgroundPosition': '-148px ' + String(y) + 'px' })
      }
    },
    /**
     * 获取总览数据
     */
    getOverview(params) {
      this.$api.getOverview(params).then((resp) => {
        if (resp.code === 10000) {
          let curdata = resp.data;
          _.forIn(this.spread, (item, index) => {
            this.show_num1(Number(curdata[index]), '#total' + index);
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.main-info-contain {
  width: 360px;
  padding-left: 125px;
  padding-top: 60px;
  cursor: pointer;
  position: relative;
}

.main-info-contain.active::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-top: 16px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 16px solid #d19328;
  border-left: 15px solid transparent;
  bottom: -20px;
  left: 47%;
}

.main-info-icon {
  position: absolute;
  left: 0;
  top: 46px;
  width: 160px;
  height: 180px;
  background-size: 100%;
  background-repeat: no-repeat;
}

.main-info-icon.main-info-icon-communities {
  background-image: url("~@/assets/img/zll4.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}
.main-info-icon.main-info-icon-alarm {
  background-image: url("~@/assets/img/zll2.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}
.main-info-icon.main-info-icon-communities1 {
  background-image: url("~@/assets/img/zll5.png");
  /* background-size: 130%;
  background-position: -12px -25px; */
}
.main-info-icon.main-info-icon-communities2 {
  background-image: url("~@/assets/img/zll3.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}
.main-info-icon.main-info-icon-communities3 {
  background-image: url("~@/assets/img/zll1.png");
  /* background-size: 130%;
  background-position: -12px -16px; */
}

.main-info-content {
  float: left;
  padding-left: 8px;
}

.main-info-content /deep/ .main-info-num {
  font-size: 60px;
  color: white;
  margin-bottom: 21px;
}

.main-info-content /deep/ .main-info-title {
  font-size: 28px;
  color: #248ecc;
}
.main-info-bottom {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  background-size: 100% 100%;
  bottom: 0px;
  height: 142px;
  background-image: url("~@/assets/img/top-bg.png");
}

.main-info-contain /deep/ .t_num i {
  width: 30px;
  height: 50px;
  display: inline-block;
  background: url("~@/assets/img/num.png") no-repeat;
  background-position: 0 0;
  background-size: 832%;
}

.main-info-contain /deep/ .t_num {
  display: block;
  height: 50px;
  /* float: left; */
  font-size: 46px;
  color: white;
}
</style>