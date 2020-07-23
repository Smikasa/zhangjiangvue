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
              <span class="t_num t_num1"></span>
            </div>
          </div>
          <!-- <span class="total-number">{{allNum.number}}</span> -->
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
            <div
              :id="'total'+index"
              style="overflow: hidden;"
            >
              <span class="t_num t_num1"></span>
              <span class="spread-per t_text">({{ item.Ratio }})</span>
            </div>
          </div>
          <!-- <span class="spread-number">{{item.Num}}</span> -->
        </div>

        <div v-if="item.hasOwnProperty('Yesterday') && item.Yesterday">
          <span class="spread-yes">昨日</span>
          <span class="spread-diff">{{ item.Yesterday }}</span>
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
      spread: [
        {
          id: 'venueIn',
          name: '今日馆内人数',
          Num: 0,
          Ratio: '0%',
          Yesterday: "-0"
        }, {
          id: 'venueOut',
          name: '今日馆外人数',
          Num: 0,
          Ratio: '0%',
          Yesterday: "-0"
        }, {
          id: 'churchyard',
          name: '今日境内人数',
          Num: 0,
          Ratio: '0%',
          Yesterday: "-0"
        }, {
          id: 'overseas',
          name: '今日境外人数',
          Num: 0,
          Ratio: '0%',
          Yesterday: "-10"
        },
      ],
    }
  },
  mounted() {
    this.$nextTick(()=>{
        this.show_num1(9785676, '#total-text');
        this.show_num1(34678, '#total0');
        this.show_num1(872970, '#total1');
        this.show_num1(169690, '#total2');
        this.show_num1(27234, '#total3');
    })
  },
  methods: {
    show_num1: function (n, ele) {
      var it = $(ele + " .t_num1 i");
      var len = String(n).length;
      for (var i = 0; i < len; i++) {
        if (it.length <= i) {
          $(ele + " .t_num1").append("<i></i>");
        }
        var num = String(n).charAt(i);
        //根据数字图片的高度设置相应的值
        var y = parseInt(num) ? -(56 + (parseInt(num) - 1) * 81.7) : "-793";
        var obj = $(ele + " .t_num1 i").eq(i);
        // obj.animate({
        //   backgroundPosition: '-148px ' + String(y) + 'px'
        // }, 'slow', 'swing', function () {
        //   console.log('a')
        // });
        obj.css({ 'backgroundPosition': '-148px ' + String(y) + 'px'})
      }
    },
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
}
.t_text {
  display: block;
  height: 50px;
  line-height: 55px;
  float: left;
  margin-left: 15px;
}
</style>