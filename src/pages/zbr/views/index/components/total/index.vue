<template>
  <div>
    <div class="total clearfix">
      <div class="total-icon fl"></div>
      <div class="fl">
        <div class="total-title fontTitle">
          {{ allNum.name }}
        </div>
        <div class="total-info">
          <div class="am_num">
            <div id="total-text">
              <span class="t_num t_num1 fontNumber"> 00000 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="spread-contain">
      <div
        v-for="(item, index) in spread"
        :key="index"
        class="spread fl"
      >
        <div class="spread-title fontTitle">
          {{ item.name }}
        </div>
        <div class="spread-info">
          <div class="am_num">
            <!-- style="overflow: hidden;" -->
            <div :id="'total' + index">
              <span class="t_num t_num1 fontNumber">00000</span>
              <span
                class="spread-per t_text"
              >(<span class="fontNumber">{{ item.percentage }}</span>)</span>
            </div>
          </div>
        </div>
        <div>
          <span class="spread-yes">昨日</span>
          <span class="spread-diff">{{ item.comparedWithYesterday }}</span>
        </div>
      </div>
    </div>
    <div class="top-bottom fontNumber"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allNum: {
        name: "实时总人数",
        number: 0,
      },
      spread: {
        insideVenue: {
          id: "insideVenue",
          name: "今日馆内人数",
          Num: 0,
          percentage: "0%",
          comparedWithYesterday: "0",
        },
        outVenue: {
          id: "outVenue",
          name: "今日馆外人数",
          Num: 0,
          percentage: "0%",
          comparedWithYesterday: "0",
        },
        chinese: {
          id: "chinese",
          name: "今日境内人数",
          Num: 0,
          percentage: "0%",
          comparedWithYesterday: "0",
        },
        abroad: {
          id: "abroad",
          name: "今日境外人数",
          Num: 0,
          percentage: "0%",
          comparedWithYesterday: "0",
        },
      },
    };
  },
  mounted() {
    this.axiosTotal();
  },
  methods: {
    axiosTotal() {
      this.$api.getTotalList().then((resp) => {
        if (resp.code === 10000) {
          this.spread = _.merge({}, this.spread, this.transferData(resp.data));
          _.forIn(this.spread, (item, index) => {
            this.show_num1(item.Num, "#total" + index);
          });
          this.show_num1(this.allNum.number, "#total-text");
        }
      });
    },
    // 数据转换
    transferData(object) {
      for (const key in object) {
        object[key] = Number(object[key]);
      }
      this.allNum.number =
        object.indoor + object.china + object.outdoor + object.world;
      let obj = {
        insideVenue: {
          Num: object.indoor,
          percentage: this.toNumber(object.indoor, this.allNum.number),
          comparedWithYesterday: object.yesterdayIndoor,
        },
        outVenue: {
          Num: object.outdoor,
          percentage: this.toNumber(object.outdoor, this.allNum.number),
          comparedWithYesterday: object.yesterdayOutdoor,
        },
        chinese: {
          Num: object.china,
          percentage: this.toNumber(object.china, this.allNum.number),
          comparedWithYesterday: object.yesterdayChina,
        },
        abroad: {
          Num: object.world,
          percentage: this.toNumber(object.world, this.allNum.number),
          comparedWithYesterday: object.yesterdayWorld,
        },
      };
      return obj;
    },
    toNumber(num, total) {
      let pro = Number((num / total) * 100).toFixed(2);
      return pro + "%";
    },
    show_num1: function (n, ele) {
      var len = String(n).length;
      $(ele + " .t_num1").html("");
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
        obj.css({ backgroundPosition: "-148px " + String(y) + "px" });
      }
    },
  },
};
</script>

<style>
/* .total {
  margin-right: 110px;
} */

.spread-contain {
  width: 1257px;
}

.spread {
  width: 25%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.spread-info {
  height: 50px;
  margin-bottom: 18px;
}

.total-icon {
  width: 150px;
  height: 150px;
  margin-top: -20px;
  background-image: url("~@/assets/img/total.png");
  background-size: 100%;
}

.total-title,
.spread-title {
  color: #228fcf;
  font-size: 26px;
}
.total-title {
  margin-bottom: 12px;
}
.spread-title {
  margin-bottom: 12px;
}

.total-number,
.spread-number {
  color: #ffffff;
  font-size: 48px;
}

.total-per,
.spread-per {
  color: #999999;
  font-size: 30px;
}

.total-yes,
.spread-yes {
  color: #999999;
  font-size: 30px;
}

.total-diff,
.spread-diff {
  color: #ba822a;
  font-size: 26px;
  padding-left: 8px;
}

.t_num i {
  width: 30px;
  height: 50px;
  display: inline-block;
  background: url("~@/assets/img/num.png") no-repeat;
  background-position: 0 0;
  background-size: 832%;
}

.t_num {
  display: block;
  height: 50px;
  float: left;
  font-size: 46px;
  color: white;
}
.t_text {
  display: block;
  height: 50px;
  line-height: 55px;
  float: left;
  margin-left: 15px;
}

.top-bottom {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  background-size: 100% 100%;
  bottom: 0px;
  height: 150px;
  background-image: url("~@/assets/img/top-bg.png");
}
</style>