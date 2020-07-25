<template>
  <div class="map-contain">
    <div
      id="map"
      class="map"
    ></div>
    <div
      style="display: none;"
      class="areaFrom"
    >
      <img
        src="~@/assets/img/area-from-bg.png"
        alt=""
        srcset=""
      >
    </div>
    <div class="map-btns clearfix">
      <div
        class="fl"
        :class="[curMapArea === 'china' ? 'active' : '']"
        @click="changSpreadMap('china')"
      >
        境内人员分布
      </div>
      <div
        class="fl"
        :class="[curMapArea === 'world' ? 'active' : '']"
        @click="changSpreadMap('world')"
      >
        境外人员分布
      </div>
      <div
        class="fl"
        :class="[curMapArea === 'province' ? 'active' : '']"
        @click="changSpreadMap('province')"
      >
        省内人员分布
      </div>
    </div>
    <div class="totalPerson">
      <span>总人数</span>
      <span class="numT">{{ totalPersonNum }}</span>
      <span>人</span>
    </div>
  </div>
</template>

<script>
require('./js/china');
require('./js/world');
require('./js/province/yunnan');
import echarts from 'echarts'
export default {
  data() {
    return {
      curMapArea: 'china',
      mapPeopleSpread: '',
      totalPersonNum: 99999,
      chinaData: [
        [{ name: '云南', value: 10000 }, { name: '山东', value: 5 }],
        [{ name: '云南', value: 10000 }, { name: '山西', value: 15 }],
        [{ name: '云南', value: 10000 }, { name: '广东', value: 595 }],
        [{ name: '云南', value: 10000 }, { name: '广西', value: 25 }],
        [{ name: '云南', value: 10000 }, { name: '北京', value: 45 }],
        [{ name: '云南', value: 10000 }, { name: '辽宁', value: 35 }],
        [{ name: '云南', value: 10000 }, { name: '海南', value: 345 }],
        [{ name: '云南', value: 10000 }, { name: '新疆', value: 123 }],
        [{ name: '云南', value: 10000 }, { name: '内蒙古', value: 65 }],
        [{ name: '云南', value: 10000 }, { name: '甘肃', value: 725 }],
        [{ name: '云南', value: 10000 }, { name: '河南', value: 365 }],
        [{ name: '云南', value: 10000 }, { name: '湖南', value: 5435 }],
        [{ name: '云南', value: 10000 }, { name: '浙江', value: 765 }],
        [{ name: '云南', value: 10000 }, { name: '江苏', value: 345 }],
        [{ name: '云南', value: 10000 }, { name: '黑龙江', value: 975 }],
        [{ name: '云南', value: 10000 }, { name: '吉林', value: 525 }],
        [{ name: '云南', value: 10000 }, { name: '陕西', value: 575 }],
        [{ name: '云南', value: 10000 }, { name: '四川', value: 545 }],
        [{ name: '云南', value: 10000 }, { name: '福建', value: 165 }],
        [{ name: '云南', value: 10000 }, { name: '江西', value: 95 }],
        [{ name: '云南', value: 10000 }, { name: '西藏', value: 63 }],
        [{ name: '云南', value: 10000 }, { name: '青海', value: 65 }],
        [{ name: '云南', value: 10000 }, { name: '香港', value: 175 }],
        [{ name: '云南', value: 10000 }, { name: '澳门', value: 85 }],
        [{ name: '云南', value: 10000 }, { name: '台湾', value: 135 }],
        [{ name: '云南', value: 10000 }, { name: '天津', value: 515 }],
        [{ name: '云南', value: 10000 }, { name: '宁夏', value: 115 }],
        [{ name: '云南', value: 10000 }, { name: '上海', value: 155 }],
        [{ name: '云南', value: 10000 }, { name: '重庆', value: 215 }],

      ],
      worldData: [
        // [{ name: 'Denmark' }, { name: 'Denmark', value: 5 }],
        [{ name: 'China', value: 100 }, { name: 'Spain', value: 15 }],
        [{ name: 'China', value: 100 }, { name: 'France', value: 595 }],
        [{ name: 'China', value: 100 }, { name: 'United Kingdom', value: 25 }],

      ],
      beijingData: [
        [{ name: '保山市', value: 100 }, { name: '普洱市', value: 5 }],
        [{ name: '保山市', value: 100 }, { name: '昭通市', value: 15 }],
        [{ name: '保山市', value: 100 }, { name: '丽江市', value: 595 }],
      ],
    }
  },
  mounted() {
    this.initMap()
    this.changSpreadMap('china');
  },
  methods: {
    /**
   * @description 地图-echart
   */
    initMap() {
      /*
      * 图中相关城市经纬度,根据你的需求添加数据
      * 关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
      */
      var geoCoordMap = {
        //东盟十国
        '广州': [113.5107, 23.2196],
        '马来西亚': [101.975766, 4.210484],
        '印度尼西亚': [113.921327, -0.789275],
        '泰国': [100.992541, 15.870032],
        '菲律宾': [121.774017, 12.879721],
        '文莱': [114.727669, 4.535277],
        '越南': [108.277199, 14.058324],
        '老挝': [102.495496, 19.85627],
        '缅甸': [95.956223, 21.913965],
        '柬埔寨': [104.990963, 12.565679],
        '新加坡': [103.51, 1.17],
        '中国': [116.40, 39.90],
        '蒙古': [103.846656, 46.862496],
        '俄罗斯': [105.318756, 61.52401],
        '东帝汶': [125.727539, -8.874217],
        '印度': [78.96288, 20.593684],
        '巴基斯坦': [69.34511599999999, 30.375321],
        '孟加拉国': [90.356331, 23.684994],
        '斯里兰卡': [80.77179699999999, 7.873053999999999],
        '阿富汗': [67.709953, 33.93911],
        '尼泊尔': [84.12400799999999, 28.394857],
        '马尔代夫': [73.5, 4.2],
        '不丹': [90.433601, 27.514162],
        '沙特阿拉伯': [45.079162, 23.885942],
        '阿联酋': [53.847818, 23.424076],
        '阿曼': [55.923255, 21.512583],
        '伊朗': [53.688046, 32.427908],
        '土耳其': [35.243322, 38.963745],
        '以色列': [34.851612, 31.046051],
        '埃及': [30.802498, 26.820553],
        '科威特': [47.481766, 29.31166],
        '伊拉克': [43.679291, 33.223191],
        '卡塔尔': [51.183884, 25.354826],
        '约旦': [36.238414, 30.585164],
        '黎巴嫩': [35.862285, 33.854721],
        '巴林': [50.36, 26.12],
        '也门': [48.516388, 15.552727],
        '叙利亚': [38.996815, 34.80207499999999],
        '巴勒斯坦': [34.28, 31.30],
        '波兰': [19.145136, 51.919438],
        '罗马尼亚': [24.96676, 45.943161],
        '捷克共和国': [15.472962, 49.81749199999999],
        '斯洛伐克': [19.699024, 48.669026],
        '保加利亚': [25.48583, 42.733883],
        '匈牙利': [19.503304, 47.162494],
        '拉脱维亚': [24.603189, 56.879635],
        '立陶宛': [23.881275, 55.169438],
        '斯洛文尼亚': [14.995463, 46.151241],
        '爱沙尼亚': [25.013607, 58.595272],
        '克罗地亚': [15.2, 45.1],
        '阿尔巴尼亚': [20.168331, 41.153332],
        '塞尔维亚': [21.005859, 44.016521],
        '马其顿': [21.745275, 41.608635],
        '波黑': [43.52, 18.26],
        '黑山': [19.37439, 42.708678],
        '哈萨克斯坦': [66.923684, 48.019573],
        '乌兹别克斯坦': [64.585262, 41.377491],
        '土库曼斯坦': [59.556278, 38.969719],
        '吉尔吉斯斯坦': [74.766098, 41.20438],
        '塔吉克斯坦': [71.276093, 38.861034],
        '乌克兰': [31.16558, 48.379433],
        '白俄罗斯': [27.953389, 53.709807],
        '格鲁吉亚': [43.356892, 42.315407],
        '阿塞拜疆': [47.576927, 40.143105],
        '亚美尼亚': [45.038189, 40.069099],
        '摩尔多瓦': [28.369885, 47.411631],
        //欧美国家
        '挪威': [8.468945999999999, 60.47202399999999],
        '丹麦': [9.501785, 56.26392],
        '瑞典': [18.643501, 60.12816100000001],
        '芬兰': [25.748151, 61.92410999999999],
        '英国': [-3.435973, 55.378051],
        '荷兰': [5.291265999999999, 52.132633],
        '爱尔兰': [-8.24389, 53.41291],
        '比利时': [4.469936, 50.503887],
        '卢森堡': [6.129582999999999, 49.815273],
        '法国': [2.213749, 46.227638],
        '西班牙': [-3.74922, 40.46366700000001],
        '葡萄牙': [-8.224454, 39.39987199999999],
        '德国': [10.451526, 51.165691],
        '奥地利': [14.550072, 47.516231],
        '瑞士': [8.227511999999999, 46.818188],
        '美国': [-95.712891, 37.09024],
        '加拿大': [-102.646409, 59.994255],
        '澳大利亚': [133.775136, -25.274398],
        '新西兰': [174.885971, -40.900557]
      };

      // 基于准备好的dom，初始化echarts实例
      this.mapPeopleSpread = echarts.init(document.getElementById('map'));
      // 线条动画
      let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
      let series = [];
      // 用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
      // 线条配置
      this.mapOptionLines = {
        //出发地信息
        name: '',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 9
        },
        lineStyle: {
          normal: {
            color: function (params) {
              return '#fff' // 飞机颜色
            },
            width: 1.5,
            opacity: 0.4,
            curveness: 0.2
          }
        },

        data: []
      }
      //目的地
      this.mapOptionTo = {
        // 目的地信息 
        name: '',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 4,
        // emphasis: {
        //     label: {
        //         show: true,
        //         formatter: function (param) {
        //             return param.data[3];
        //         },
        //         position: 'top'
        //     }
        // },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          // color: new echarts.graphic.RadialGradient(0.1, 0.3, 1, [{
          //     offset: 0,
          //     color: '#8af2e2'
          // }, {
          //     offset: 1,
          //     color: '#8af2e2'
          // }]),
          color: 'rgba(34,72,46,.7)',
          fontWeight: 700,
          // color: {
          //     image: this.imgFrom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          //     repeat: 'repeat'
          // },
          formatter: '{b}',
        },
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{b}\n{@value}',
          }
        },
        symbolSize: 50,
        data: []
        /**
         * 获取方法
         * value： geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
         * 
         * 数据格式
         * [{
         * name:''
         * value:''
         * }]
         */
      }
      // 出发地自身绘制
      this.mapOptionFrom = {
        name: '',
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        // emphasis: {
        //     label: {
        //         show: true,
        //         formatter: function (param) {
        //             return param.data[3];
        //         },
        //         position: 'top'
        //     }
        // },
        itemStyle: {
          /* shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5, */
          // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
          //     offset: 0,
          //     color: '#067691'
          // }, {
          //     offset: 0.8,
          //     color: '#00ffff'
          // }, {
          //     offset: 1,
          //     color: '#00ffff'
          // }]),
          color: 'rgba(7,120,115,.7)',
          // color: {
          //     image: imgTo, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          //     repeat: 'repeat'
          // },
          formatter: '{b}',
        },
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: '{b}\n{@value}',
          }
        },
        symbolSize: 50,
        data: []
      };
      // 指定地图相关的配置项和数据
      let mapBoxOption = {
        textStyle: {
          fontFamily: 'SimHei'
        },
        // 地图悬浮tooltip
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            if (params.data.value) {
              let res = "<span>城市：</span><span style='color:#fff;padding-right:5px;'>" + params.name +
                "</span> <br /><span>数量：</sapn><span style='padding-right:5px;'>" + params.value[2] + '</span>';
              return res;
            } else {
              let res = "<span>城市：</span><span style='color:#fff;padding-right:5px;'>" + params.data.toName +
                "</span> <br /><span>数量：</sapn><span style='padding-right:5px;'>" + params.data.numValue + '</span>';
              return res;
            }

          }
        },
        // 地理坐标系组件
        geo: {
          map: 'world', // 地图类型
          roam: true, // 是否开启鼠标缩放和平移漫游
          aspectScpale: 0.75,
          center: [116.405285, 39.904989],
          zoom: 1.1,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#0864de'
              }
            },
            emphasis: { // 对应的鼠标悬浮效果
              show: false,
              textStyle: {
                color: "#0864de"
              }
            }
          },
          // 区域填充颜色
          itemStyle: {
            normal: { // 正常
              areaColor: '#021835', // 区域颜色
              borderColor: '#0864de'// 区域边框
            },
            emphasis: { // hover
              borderWidth: 0,
              borderColor: '#0066ba',
              areaColor: "#0494e1",
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        },
        series: series
      };
      // 使用制定的配置项和数据显示图表
      this.mapPeopleSpread.setOption(mapBoxOption);
      // echart图表自适应
      window.addEventListener("resize", function () {
        this.mapPeopleSpread.resize();
      });

    },
    /**
     * @description 地图数据切换
     */
    changSpreadMap(area) {
      this.curMapArea = area;
      if (area === 'world') {
        let data = this.worldData;
        this.mapPeopleSpread.setOption({
          geo: {
            // map: 'china' | '四川'
            // 必须要先引入了对应地图的js文件或者json文件，在这一步的时候，echarts会自动将对应的JS文件注入，地图才会显示.
            map: 'world',
            center: [-3.581176, 27.81331],
          },
          series: this.getMapSeries(area, data),
        })
      } else if (area === "china") {
        this.totalPersonNum = 6000;
        let data = this.chinaData;
        this.mapPeopleSpread.setOption({
          geo: {
            map: 'china',
            center: [108.948024, 34.263161],
          },
          series: this.getMapSeries(area, data),
        })

      } else if (area === 'province') {
        this.totalPersonNum = 710;
        let data = this.beijingData;
        this.mapPeopleSpread.setOption({
          geo: {
            map: '云南',
            center: [102.712251, 25.040609], // 昆明市
          },
          series: this.getMapSeries('云南', data),
        })
      }
    },
    /**
      * 数据处理-地图数据-获取Series
      */
    getMapSeries(area, data) {
      let convertMapData = this.convertMapData(area, data);
      let geoCoordMap = this.getMapFeatures(area);
      let mapOptionLines = Object.assign(this.mapOptionLines, {
        name: data[0].name,
        data: convertMapData
      })
      let mapOptionFrom = Object.assign(this.mapOptionFrom, {
        name: data[0].name,
        data: data.map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
          };
        })
      })
      let mapOptionTo = Object.assign(this.mapOptionTo, {
        name: data[0].name,
        data: data.map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          };
        })
      })
      // mapOptionFrom = Object.assign(this.mapOptionFrom,{
      //     name:data[0].name,
      //     data: data.map(function (dataItem) {
      //         return {
      //             name: dataItem[0].name,
      //             value: geoCoordMap[dataItem[0].name]
      //         };
      //     })
      // })
      return [mapOptionLines, mapOptionFrom, mapOptionTo]
    },
    /**
        * 数据处理-地图数据
        * 数据格式:
        *  {
        *  fromName: "安徽" // 出发地
           toName: "山东" // 目的地
           numValue: 5 // 数值
           coords: [ // 坐标
               [117.283042, 31.26119]
               [118.000923, 36.275807]
           ]
        * }
        */
    convertMapData(area, data) {
      let res = [];
      let geoCoordMap = this.getMapFeatures(area);
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let fromCoord = geoCoordMap[dataItem[0].name];
        let toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            numValue: dataItem[1].value,
            coords: [fromCoord, toCoord]
          });
        }
      }
      return res;
    },
    /**
    * 数据处理-地图数据-获取坐标点 名称+坐标
    * 数据格式:
    * {
    *  台湾:[121.509062, 24.044332]
    *  河北:[114.502461, 38.045474]
    *  }
    */
    getMapFeatures(area) {
      let mapFeatures = echarts.getMap(area).geoJson.features;
      let geoCoordMap = {};
      mapFeatures.forEach(function (v) {
        // 地区名称
        let name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      return geoCoordMap;
    },
  }
}
</script>

<style scoped>
.map-contain {
  position: relative;
  /* border: 1px solid #163565; */
  background-image: url("~@/assets/img/map-bg.png");
  background-size: 100% 100%;
}
.map {
  width: 1042px;
  height: 760px;
}

.map-btns {
  position: absolute;
  top: 21px;
  left: 18px;
  height: 0px;
  color: white;
}

.map-btns div {
  height: 64px;
  line-height: 38px;
  padding: 0 26px;
  text-align: center;
  background-size: 100% 100%;
  cursor: pointer;
  color: #656568;
}

.map-btns div.active {
  background-image: url("~@/assets/img/map-btns-bg.png");
  color: #fff;
}

.totalPerson {
    position: absolute;
    bottom: 20px;
    right: 80px;
    color: #fff;
    font-size: 28px;
    z-index: 10000;
}

.totalPerson .numT {
    font-size: 32px;
    color: #d59301;
}

</style>