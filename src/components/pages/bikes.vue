<template>
  <div>
    <button @click="getPosition" class="btn btn-primary">取得當下位置</button>
    <div style="height: 450px">
      <l-map :zoom="maps.zoom" :center="[25.08, 121.54]" class="mb-5" style="height: 450px">
        <l-tile-layer :url="maps.url" :attribution="maps.attribution"></l-tile-layer>
        <l-geo-json :geojson="geoJsonExample"></l-geo-json>
      </l-map>
    </div>
    <ul class="banner-sec">
      <li class="second-banner"></li>
      <li class="first-banner"></li>
      <div class="banner-func">
        <h1 class="banner-title">Welcome to Travel Taiwan</h1>
        <div class="select-sec d-sm-flex justify-content-center align-items-center">
          <select class="rounded" name="selectCity" id="selectCity" v-model="selectedCity">
            <option value="" disabled>請選擇縣市</option>
            <option :value="city.en" v-for="city in cities" :key="city.zh">
              {{ city.zh }}
            </option>
          </select>
          <button class="btn-confirm btn rounded" @click="getTDXdata"></button>
        </div>
      </div>
    </ul>
    <div class="bike-description">
      <h2 class="pl-4 font-weight-bold">
        {{ currentCounty }}路網
        <!-- {{ cities.find((city) => city.en === selectedCity).zh }}路網 -->
      </h2>
      <p class="pl-4 font-weight-bold">
        台灣的各個美景，都美不勝收。<br />等你一同來發現這座寶島的奧妙！
      </p>
    </div>
    <div class="bike-sec row">
      <div class="col-12 col-sm-3" v-for="(item, index) in routes" :key="item.ID">
        <div class="bike-item rounded py-3">
          <h3 class="bike-title font-weight-bold pl-3">
            {{ item.RouteName }}
          </h3>
          <!-- <p class="px-3 pt-3" v-if="item.OpenTime">
            <img class="clock" src="@/assets/clock.png" alt="clock" />
            {{ item.OpenTime }}
          </p> -->
          <p class="px-3">
            <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
            起點：{{ item.RoadSectionStart || '無提供' }}
          </p>
          <p class="px-3">
            <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
            終點：{{ item.RoadSectionEnd || '無提供' }}
          </p>
          <div class="d-flex justify-content-center align-items-center">
            <button
              type="button"
              class="detail-btn btn w-50 text-center py-1"
              @click="
                getRouteDetails(index);
                getMapSize();
              "
              data-toggle="modal"
              data-target="#bikeModal"
            >
              了解更多
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- the Modal component made by Bootstrap 4 -->
    <div class="modal fade" id="bikeModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header px-5">
            <h5 class="modal-title" id="modalLabel">
              {{ checkRoute.RouteName }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <img src="@/assets/dismiss.png" alt="dismiss-button" />
            </button>
          </div>
          <div class="modal-body px-5">
            <!-- <p class="modal-address" v-if="checkAct.Address">
              <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
              {{ checkAct.Address }}
            </p>
            <p class="modal-address" v-else>
              <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
              {{ checkAct.Location }}
            </p> -->
            <!-- <p class="modal-text">
              {{ checkRoute.Description }}
            </p> -->
            <l-map
              :zoom="maps.zoom"
              :center="[
                checkRoute.geojson.features[0].geometry.coordinates[0][0][1],
                checkRoute.geojson.features[0].geometry.coordinates[0][0][0],
              ]"
              ref="bikeMap"
              class="mb-5"
              style="height: 300px"
            >
              <l-tile-layer :url="maps.url" :attribution="maps.attribution"></l-tile-layer>
              <l-marker
                :lat-lng="[
                  checkRoute.geojson.features[0].geometry.coordinates[0][0][1],
                  checkRoute.geojson.features[0].geometry.coordinates[0][0][0],
                ]"
              ></l-marker>
              <l-geo-json :geojson="checkRoute.geojson"></l-geo-json>
            </l-map>
            <div class="row pb-4 modal-btm-info">
              <!-- 因資料內容可能不完整，四欄資訊都加上 v-if，確保有資料才顯示 -->
              <div class="col" v-if="checkRoute.StartTime">
                <img src="@/assets/open-time.png" alt="start-time" />
                活動開始： <br />
                {{ formatTime(checkRoute.StartTime) }}
              </div>
              <div class="col" v-if="checkRoute.EndTime">
                <img src="@/assets/open-time.png" alt="end-time" />
                活動結束：<br />
                {{ formatTime(checkRoute.EndTime) }}
              </div>
              <div class="col" v-if="checkRoute.Phone">
                <img src="@/assets/phone.png" alt="phone" />
                <!-- 消除電話都是 886- 國際碼起頭的狀況 -->
                {{ '0' + checkRoute.Phone.substring(4) }}
              </div>
              <div class="col" v-if="checkRoute.Class1">
                <img src="@/assets/category.png" alt="category" />
                {{ checkRoute.Class1 }}
                <br />
                <span class="other-class">
                  {{ checkRoute.Class2 }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jsSHA from 'jssha';
// import L from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet';
// 處理 webpack 造成 marker 圖示遺失的問題
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
import wicket from 'wicket';

export default {
  name: 'bikes',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
  },
  data() {
    return {
      geoJsonExample: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'MultiLineString',
              coordinates: [
                // 第一組線段
                [
                  [121.54, 25.08],
                  [121.541, 25.081],
                ],
                // 第二組線段
                [
                  [121.545, 25.082],
                  [121.545, 25.081],
                ],
              ],
            },
          },
        ],
      },
      // 必選，且不可一次取得全國，因此預設為'Taipei'
      selectedCity: 'Taipei',
      cities: [
        { zh: '臺北市', en: 'Taipei' },
        { zh: '新北市', en: 'NewTaipei' },
        { zh: '桃園市', en: 'Taoyuan' },
        { zh: '臺中市', en: 'Taichung' },
        { zh: '臺南市', en: 'Tainan' },
        { zh: '高雄市', en: 'Kaohsiung' },
        { zh: '基隆市', en: 'Keelung' },
        { zh: '新竹市', en: 'Hsinchu' },
        { zh: '新竹縣', en: 'HsinchuCounty' },
        { zh: '苗栗縣', en: 'MiaoliCounty' },
        { zh: '彰化縣', en: 'ChanghuaCounty' },
        { zh: '南投縣', en: 'NantouCounty' },
        { zh: '雲林縣', en: 'YunlinCounty' },
        { zh: '嘉義縣', en: 'ChiayiCounty' },
        { zh: '嘉義市', en: 'Chiayi' },
        { zh: '屏東縣', en: 'PingtungCounty' },
        { zh: '宜蘭縣', en: 'YilanCounty' },
        { zh: '花蓮縣', en: 'HualienCounty' },
        { zh: '臺東縣', en: 'TaitungCounty' },
        { zh: '金門縣', en: 'KinmenCounty' },
        { zh: '澎湖縣', en: 'PenghuCounty' },
      ],
      routes: [],
      checkRoute: {
        geojson: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'MultiLineString',
                coordinates: [
                  [
                    [0, 0],
                    [0, 1],
                  ],
                ],
              },
            },
          ],
        },
      },
      maps: {
        url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
        attribution: `&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
        zoom: 14,
      },
    };
  },
  methods: {
    getAuthorizationHeader() {
      const AppID = 'e966312d4abd46fbbe1d4748dd4d71d5';
      const AppKey = '46Va5HzlLVj6YLoZOXWCGzfBts8';
      // HMAC 加密演算
      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      let HMAC = ShaObj.getHMAC('B64');
      let Auth = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
      // let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
      return { Authorization: Auth, 'X-Date': GMTString };
    },
    getTDXdata() {
      const vm = this;
      let city = vm.selectedCity;
      console.log('City: ', city);
      const url = `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${city}?$top=12&$format=JSON`;
      vm.axios
        .get(url, { headers: this.getAuthorizationHeader() })
        .then((res) => {
          console.log(res.data);
          vm.routes = res.data;
        })
        .catch(() => console.error('cannot get TDX data'));
    },
    getRouteDetails(index) {
      const vm = this;
      vm.checkRoute = vm.routes[index];
      // 重新建立 GeoJSON 結構
      vm.checkRoute.geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {},
          },
        ],
      };
      // 呼叫 convertWkt() 函數會得到 geometry 轉成 GeoJSON 的回傳，並將其放到 checkRoute 中等待顯示
      vm.checkRoute.geojson.features[0].geometry = vm.convertWkt(vm.checkRoute.Geometry);
      console.log('vm.checkRoute.geojson: ', vm.checkRoute.geojson);
    },
    getMapSize() {
      setTimeout(() => {
        this.$refs.bikeMap.mapObject.invalidateSize();
      }, 200);
    },
    convertWkt(geometry) {
      const wkt = new wicket.Wkt();
      // 需要先讀入 WKT 到 wkt，再轉成 JSON 的程序
      const geoJsonFeature = wkt.read(geometry).toJson();
      // console.log('geoJsonFeature', geoJsonFeature);
      return geoJsonFeature;
    },
    getPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const longitude = position.coords.longitude; // 取得經度
            const latitude = position.coords.latitude; // 取得緯度
            console.log(longitude, latitude);
            // mymap.setView([latitude, longitude], 13); // 重新設定初始位置
            // getStationData(longitude, latitude); // 將經緯度傳給 getStationData 執行
          },
          // 錯誤訊息
          function (e) {
            const errCode = e.code;
            const errMsg = e.message;
            console.error(errCode);
            console.error(errMsg);
          }
        );
      }
    },
  },
  computed: {
    currentCounty() {
      const vm = this;
      // 找出 cities 中，英文名等同 selectedCity 的城市的中文名
      let theCityObj = vm.cities.find((city) => {
        return city.en === vm.selectedCity;
      });
      return theCityObj.zh;
    },
    // getMiddlePoint(){
    //   const aryLength = this.checkRoute.geojson.features[0].geometry.coordinates[0].length;
    //   return (aryLength / 2) - 1;
    // },
  },
  created() {
    this.getTDXdata();
  },
};
</script>
<style scoped>
.banner-sec {
  height: 600px;
  position: relative;
}
.banner-sec > li {
  list-style: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-position: center;
  background-size: cover;
}
.first-banner {
  background-image: url(https://images.unsplash.com/photo-1599637840048-00ee815f0c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80);
  animation-name: bannerAnimation;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.second-banner {
  background-image: url(https://images.unsplash.com/photo-1605235456285-1f8de0d1e097?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80);
}
.banner-func {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.banner-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-weight: 700;
  color: #ffffff;
  font-size: 3rem;
  line-height: 3.5rem;
  text-shadow: 10px 8px 12px rgba(0, 0, 0, 0.37);
}
.select-sec select {
  width: 190px;
  height: 50px;
  text-align: center;
  margin-right: 1.2rem;
}
.btn-confirm {
  background-image: url('~@/assets/bx-search.png');
  background-position: center;
  background-size: cover;
  height: 42px;
  width: 42px;
}
h2 {
  font-size: 1.875rem;
  color: #08a6bb;
  margin-top: 120px;
}
p {
  color: #aeaeae;
}
/* .clock {
  height: 1rem;
} */
.map-pin {
  height: 16px;
  display: inline-block;
  padding-bottom: 3px;
}
/* attract 通通改為 bike */
.bike-title {
  font-size: 1.2rem;
  margin-top: 1.8rem;
}
.bike-description {
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.bike-sec {
  max-width: 95%;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
}
.bike-item {
  background-color: #ffffff;
  margin-bottom: 90px;
  filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
}
.detail-btn {
  color: #08a6bb;
  border: 3px solid #08a6bb;
  font-weight: 700;
  font-size: 14px;
  line-height: 1rem;
}
.detail-btn:hover {
  background-color: #08a6bb;
  color: #ffffff;
}

@keyframes bannerAnimation {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  /* 變換背景時間縮短在 10% 內，50% - 90% 是第二張圖 */
  50% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
