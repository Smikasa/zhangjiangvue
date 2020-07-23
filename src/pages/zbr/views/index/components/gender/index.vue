<template>
  <div>
    <div class="bottom-title">
      性别分布
    </div>
    <div class="clearfix">
      <div class="clearfix fl man">
        <div class="sex-icon fl"></div>
        <div class="sex-info fl">
          <div class="sex-info-per">
            {{ man.number }}
          </div>
          <div class="sex-info-type">
            {{ man.name }}
          </div>
        </div>
      </div>
      <div class="clearfix fl woman">
        <div class="sex-icon  fl"></div>
        <div class="sex-info fl">
          <div class="sex-info-per">
            {{ woman.number }}
          </div>
          <div class="sex-info-type">
            {{ woman.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // bottom
      man: {
        number: "60%",
        name: "男性"
      },
      woman: {
        number: "40%",
        name: "女性"
      }
    }
  }
}
</script>

<style scoped>
.bottom-title {
    font-size: 30px;
    color: white;
    margin-bottom: 58px;
}

.sex-icon {
    height: 101px;
    width: 53px;
    background-size: 100%;
    margin-right: 28px;
}
.man ,.bottom .woman{
    margin: 0px 110px 0 34px;
}

.man .sex-icon {
    background-image: url('~@/assets/img/man.png');
}
.woman .sex-icon {
    background-image: url('~@/assets/img/woman.png');
}

.man .sex-info-per {
    color: #3a71cc;
    font-size: 54px;
    margin-bottom: 24px;
}
.woman .sex-info-per {
    color: #b851af;
    font-size: 54px;
    margin-bottom: 24px;
}
.sex-info-type {
    color: #6d7d99;
    font-size: 24p;
}
</style>