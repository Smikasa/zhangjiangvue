<template>
  <div>
    <div class="total clearfix fl">
      <div class="total-icon fl"></div>
      <div class="fl">
        <div class="total-title">
          {{ allNum.name }}
        </div>
        <div class="total-info">
          <div class="am_num">
            <div id="total-text">
              <span class="t_num t_num1">
                00000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr spread-contain">
      <div
        v-for="(item,index) in spread"
        :key="index"
        class="spread fl"
      >
        <div class="spread-title">
          {{ item.name }}
        </div>
        <div class="spread-info">
          <div class="am_num">
            <!-- style="overflow: hidden;" -->
            <div :id="'total'+index">
              <span class="t_num t_num1">00000</span>
              <span class="spread-per t_text">({{ item.percentage }})</span>
            </div>
          </div>
        </div>
        <div v-if="item.hasOwnProperty('comparedWithYesterday') && item.comparedWithYesterday">
          <span class="spread-yes">昨日</span>
          <span class="spread-diff">{{ item.comparedWithYesterday }}</span>
        </div>
      </div>
    </div>
    <div class="top-bottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allNum: {
        name: '实时总人数',
        number: 0,
      },
      spread: {
        insideVenue: {
          id: 'insideVenue',
          name: '今日馆内人数',
          Num: 0,
          percentage: '0%',
          comparedWithYesterday: "-0"
        },
        outVenue: {
          id: 'outVenue',
          name: '今日馆外人数',
          Num: 0,
          percentage: '0%',
          comparedWithYesterday: "-0"
        },
        chinese: {
          id: 'chinese',
          name: '今日境内人数',
          Num: 0,
          percentage: '0%',
          comparedWithYesterday: "-0"
        },
        abroad: {
          id: 'abroad',
          name: '今日境外人数',
          Num: 0,
          percentage: '0%',
          comparedWithYesterday: "-10"
        },
      },
    }
  },
  mounted() {
    this.axiosTotal();
  },
  methods: {
    axiosTotal() {
      this.$api.getTotalList().then((resp) => {
        if (resp.code === 10000) {
          let data = resp.data;
          this.spread = _.merge({}, this.spread, data);
          _.forIn(this.spread, (item, index) => {
            if (index === 'insideVenue') {
              this.show_num1(Number(item.insideVenuePeople), '#total' + index);
              this.show_num1(Number(item.allVenuePeople), '#total-text');
            }
            if (index === 'outVenue') {
              this.show_num1(Number(item.outVenuePeople), '#total' + index);
            }
            if (index === 'chinese') {
              this.show_num1(Number(item.chinese), '#total' + index);
            }
            if (index === 'abroad') {
              this.show_num1(Number(item.abroadPeople), '#total' + index);
            }
          })
        }
      })
    },
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
    }
  }
}
</script>

<style>
.total {
  margin-right: 110px;
}

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
  margin-bottom: 24px;
}
.spread-title {
  margin-bottom: 22px;
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
</style>