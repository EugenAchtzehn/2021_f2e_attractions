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
            <div class="col-12 col-sm-3" v-for="act in acts" :key="act.ActivityID">
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
                    <h3 class="act-title font-weight-bold pl-3">{{ act.Name }}</h3>
                    <!-- <p class="pl-3" v-if="act.StartTime">
                        <img class="clock" src="@/assets/clock.png" alt="clock" />
                        {{ act.StartTime }}
                    </p> -->

                    <p class="pl-3" v-if="act.Address">
                        <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                        {{ act.Address }}
                    </p>
                    <p class="pl-3" v-else>
                        <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                        {{ act.Location }}
                    </p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="detail-btn btn w-50 text-center py-1">了解更多</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jsSHA from "jssha";

export default {
    name: "Activities",
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
            theCityObj: {},
            acts: [],
            defaultImageUrl: `https://images.unsplash.com/photo-1523606772308-64a28db0ef2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80`,
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
            const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity${city}?${activityType}$top=8&$format=JSON`;
            console.log("請求URL：", url);
            vm.axios
                .get(url, { headers: this.getAuthorizationHeader() })
                .then((response) => {
                    console.log(response);
                    vm.acts = response.data;
                })
                .catch(() => {
                    console.log("failed");
                });
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
    background-image: url(https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80);
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
</style>
