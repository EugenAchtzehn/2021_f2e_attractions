<template>
    <div>
        <div class="banner-sec">
            <div class="banner-func">
                <h1 class="banner-title">Welcome to Travel Taiwan</h1>
                <div class="select-sec d-sm-flex justify-content-center align-items-center">
                    <select
                        name="selectType"
                        id="selectType"
                        class="rounded"
                        v-model="selectedType"
                    >
                        <option value="" disabled>類別</option>
                        <option :value="type" v-for="type in types" :key="type">
                            {{ type }}
                        </option>
                    </select>
                    <select
                        class="rounded"
                        name="selectCity"
                        id="selectCity"
                        v-model="selectedCity"
                    >
                        <option value="" disabled>請選擇縣市</option>
                        <option :value="city.en" v-for="city in cities" :key="city.zh">
                            {{ city.zh }}
                        </option>
                    </select>
                    <button class="btn-confirm btn rounded" @click="getTDXdata"></button>
                </div>
            </div>
        </div>
        <div class="act-description">
            <h2 class="pl-4 font-weight-bold">{{ currentCounty }}活動</h2>
            <p class="pl-4 font-weight-bold">
                台灣的各個美景，都美不勝收。<br />等你一同來發現這座寶島的奧妙！
            </p>
        </div>
        <div class="act-sec row">
            <div class="col-12 col-sm-3" v-for="(act, index) in acts" :key="act.ActivityID">
                <div class="act-item rounded pb-3">
                    <div
                        class="act-img rounded-top"
                        v-if="act.Picture.PictureUrl1"
                        :style="{ backgroundImage: `url(${act.Picture.PictureUrl1})` }"
                    ></div>
                    <!-- 沒有圖片則載入預設圖片 -->
                    <div
                        v-else
                        class="act-img rounded-top"
                        :style="{ backgroundImage: `url(${defaultImageUrl})` }"
                    ></div>
                    <h3 class="act-title font-weight-bold pl-3">{{ act.ActivityName }}</h3>
                    <p class="pl-3">
                        <img class="clock pr-2" src="@/assets/clock.png" alt="clock" />
                        <span v-if="act.StartTime">開始：{{ formatTime(act.StartTime) }}</span>
                        <br />
                        <img class="clock pr-2" src="@/assets/clock.png" alt="clock" />
                        <span v-if="act.EndTime">結束：{{ formatTime(act.EndTime) }}</span>
                    </p>

                    <p class="pl-3" v-if="act.Address">
                        <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                        {{ act.Address }}
                    </p>
                    <p class="pl-3" v-else>
                        <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                        {{ act.Location }}
                    </p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button
                            type="button"
                            class="detail-btn btn w-50 text-center py-1"
                            @click="
                                getActDetails(index);
                                getMapSize();
                            "
                            data-toggle="modal"
                            data-target="#actModal"
                        >
                            了解更多
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- the Modal component made by Bootstrap 4 -->
        <div class="modal fade" id="actModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header px-5">
                        <h5 class="modal-title" id="modalLabel">
                            {{ checkAct.ActivityName }}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <img src="@/assets/dismiss.png" alt="dismiss-button" />
                        </button>
                    </div>
                    <div class="modal-body px-5">
                        <p class="modal-address" v-if="checkAct.Address">
                            <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                            {{ checkAct.Address }}
                        </p>
                        <p class="modal-address" v-else>
                            <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                            {{ checkAct.Location }}
                        </p>
                        <p class="modal-text">
                            {{ checkAct.Description }}
                        </p>
                        <img
                            v-if="checkAct.Picture.PictureUrl1"
                            class="modal-img"
                            :src="checkAct.Picture.PictureUrl1"
                            :alt="checkAct.Picture.PictureDescription1"
                        />
                        <img
                            v-else
                            class="modal-img"
                            src="https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="image not available"
                            style="height"
                        />
                        <l-map
                            :zoom="maps.zoom"
                            :center="[checkAct.Position.PositionLat, checkAct.Position.PositionLon]"
                            ref="actMap"
                            class="mb-5"
                            style="height: 300px"
                        >
                            <l-tile-layer
                                :url="maps.url"
                                :attribution="maps.attribution"
                            ></l-tile-layer>
                            <l-marker
                                :lat-lng="[
                                    checkAct.Position.PositionLat,
                                    checkAct.Position.PositionLon,
                                ]"
                            ></l-marker>
                        </l-map>
                        <div class="row pb-4 modal-btm-info">
                            <!-- 因資料內容可能不完整，四欄資訊都加上 v-if，確保有資料才顯示 -->
                            <div class="col" v-if="checkAct.StartTime">
                                <img src="@/assets/open-time.png" alt="start-time" />
                                活動開始： <br />
                                {{ formatTime(checkAct.StartTime) }}
                            </div>
                            <div class="col" v-if="checkAct.EndTime">
                                <img src="@/assets/open-time.png" alt="end-time" />
                                活動結束：<br />
                                {{ formatTime(checkAct.EndTime) }}
                            </div>
                            <div class="col" v-if="checkAct.Phone">
                                <img src="@/assets/phone.png" alt="phone" />
                                <!-- 消除電話都是 886- 國際碼起頭的狀況 -->
                                {{ "0" + checkAct.Phone.substring(4) }}
                            </div>
                            <div class="col" v-if="checkAct.Class1">
                                <img src="@/assets/category.png" alt="category" />
                                {{ checkAct.Class1 }}
                                <br />
                                <span class="other-class">
                                    {{ checkAct.Class2 }}
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
import jsSHA from "jssha";

// import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
// 處理 webpack 造成 marker 圖示遺失的問題
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
    name: "Activities",
    // register leaflet component locally
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
    data() {
        return {
            selectedType: "所有類別",
            selectedCity: "all",
            types: [
                "所有類別",
                "年度活動",
                "節慶活動",
                "藝文活動",
                "遊憩活動",
                "自行車活動",
                "產業文化活動",
                "活動快報",
                "其他",
            ],
            cities: [
                { zh: "所有縣市", en: "all" },
                { zh: "臺北市", en: "Taipei" },
                { zh: "新北市", en: "NewTaipei" },
                { zh: "桃園市", en: "Taoyuan" },
                { zh: "臺中市", en: "Taichung" },
                { zh: "臺南市", en: "Tainan" },
                { zh: "高雄市", en: "Kaohsiung" },
                { zh: "基隆市", en: "Keelung" },
                { zh: "新竹市", en: "Hsinchu" },
                { zh: "新竹縣", en: "HsinchuCounty" },
                { zh: "苗栗縣", en: "MiaoliCounty" },
                { zh: "彰化縣", en: "ChanghuaCounty" },
                { zh: "南投縣", en: "NantouCounty" },
                { zh: "雲林縣", en: "YunlinCounty" },
                { zh: "嘉義縣", en: "ChiayiCounty" },
                { zh: "嘉義市", en: "Chiayi" },
                { zh: "屏東縣", en: "PingtungCounty" },
                { zh: "宜蘭縣", en: "YilanCounty" },
                { zh: "花蓮縣", en: "HualienCounty" },
                { zh: "臺東縣", en: "TaitungCounty" },
                { zh: "金門縣", en: "KinmenCounty" },
                { zh: "澎湖縣", en: "PenghuCounty" },
                { zh: "連江縣", en: "LienchiangCounty" },
            ],
            acts: [],
            defaultImageUrl: `https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80`,
            checkAct: {
                Picture: {
                    PictureUrl1: "",
                    PictureDescription: "",
                },
                Position: {
                    PositionLat: "",
                    PositionLon: "",
                },
            },
            maps: {
                url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
                attribution: `&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
                zoom: 15,
            },
        };
    },
    methods: {
        getAuthorizationHeader() {
            const AppID = "e966312d4abd46fbbe1d4748dd4d71d5";
            const AppKey = "46Va5HzlLVj6YLoZOXWCGzfBts8";
            // HMAC 加密演算
            let GMTString = new Date().toGMTString();
            let ShaObj = new jsSHA("SHA-1", "TEXT");
            ShaObj.setHMACKey(AppKey, "TEXT");
            ShaObj.update("x-date: " + GMTString);
            let HMAC = ShaObj.getHMAC("B64");
            let Auth = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
            // let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
            return { Authorization: Auth, "X-Date": GMTString };
        },
        getTDXdata() {
            const vm = this;
            let city = vm.selectedCity;
            if (city === "all") {
                // 若選擇所有縣市，則為空白字串
                city = ``;
            } else {
                city = `/${city}`;
            }
            let activityType = vm.selectedType;
            if (activityType === "所有類別") {
                activityType = ``;
            } else {
                activityType = `$filter=Class1 eq '${activityType}' or Class2 eq '${activityType}'&`;
            }
            const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity${city}?${activityType}$top=12&$format=JSON`;
            console.log("請求URL：", url);
            vm.axios
                .get(url, { headers: this.getAuthorizationHeader() })
                .then((response) => {
                    // console.log(response);
                    vm.acts = response.data;
                })
                .catch(() => {
                    console.log("failed");
                });
        },
        formatTime(inputTime) {
            const d = new Date(inputTime);
            // console.log("Date物件", d);
            function addDigit(time) {
                if (time < 10) {
                    return `0${time}`;
                } else {
                    return time;
                }
            }
            const monthNum = d.getMonth() + 1;
            const dateNum = d.getDate();
            const hourNum = d.getHours();
            const minuteNum = d.getMinutes();
            return (
                `${d.getFullYear()}/${addDigit(monthNum)}/${addDigit(dateNum)} ` +
                `${addDigit(hourNum)}:${addDigit(minuteNum)}`
            );
        },
        getActDetails(index) {
            this.checkAct = this.acts[index];
        },
        getMapSize() {
            setTimeout(() => {
                this.$refs.actMap.mapObject.invalidateSize();
            }, 200);
        },
    },
    computed: {
        currentCounty() {
            const vm = this;
            if (vm.selectedCity === "all") {
                return "熱門";
            } else {
                let theCityObj = vm.cities.find((city) => {
                    return city.en === vm.selectedCity;
                    // 找出被選擇的城市物件
                });
                return theCityObj.zh;
            }
        },
    },
    created() {
        this.getTDXdata();
    },
};
</script>

<style scoped>
.banner-sec {
    height: 600px;
    background-image: url(https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80);
    background-position: center;
    background-size: cover;
    position: relative;
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
    background-image: url("~@/assets/bx-search.png");
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
.clock {
    height: 1rem;
}
.map-pin {
    height: 16px;
    display: inline-block;
    padding-bottom: 3px;
}
.act-title {
    font-size: 1.2rem;
    margin-top: 1.8rem;
}
.act-description {
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
}
.act-sec {
    max-width: 95%;
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
}
.act-item {
    background-color: #ffffff;
    margin-bottom: 90px;
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
}
.act-img {
    height: 185px;
    background-size: cover;
    background-position: center;
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
.modal-address {
    color: #6f7789;
    font-size: 14px;
    line-height: 16px;
}
.modal-text {
    color: #6f7789;
    line-height: 1.5rem;
}
.modal-img {
    object-fit: cover;
    object-position: center;
    max-width: 100%;
    display: block;
    margin: 1.5rem auto 3rem auto;
}
.modal-btm-info {
    line-height: 1.5rem;
    vertical-align: middle;
    font-weight: 700;
    color: #08a6bb;
}
.other-class {
    padding: 1.5rem;
}
</style>
