<template>
    <div>
        <!-- <h1>{{ msg }}</h1> -->
        <div class="banner-sec">
            <div class="banner-func">
                <h1 class="banner-title">Welcome to Travel Taiwan</h1>
                <div class="select-sec d-sm-flex justify-content-center align-items-center">
                    <select
                        name="selectActivity"
                        id="selectActivity"
                        class="rounded"
                        v-model="selectedActivity"
                    >
                        <option value="" disabled>類別</option>
                        <option :value="activity" v-for="activity in activities" :key="activity">
                            {{ activity }}
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
        <div class="attract-description">
            <h2 class="pl-4 font-weight-bold">熱門景點</h2>
            <p class="pl-4 font-weight-bold">
                台灣的各個美景，都美不勝收。<br />等你一同來發現這座寶島的奧妙！
            </p>
        </div>
        <div class="attract-sec row">
            <div class="col-12 col-sm-3" v-for="item in attractions" :key="item.ID">
                <div class="attract-item rounded pb-3">
                    <div
                        class="attract-img rounded-top"
                        v-if="item.Picture.PictureUrl1"
                        :style="{ backgroundImage: `url(${item.Picture.PictureUrl1})` }"
                    ></div>
                    <!-- 沒有圖片則載入預設圖片 -->
                    <div
                        v-else
                        class="attract-img rounded-top"
                        :style="{ backgroundImage: `url(${defaultImageUrl})` }"
                    ></div>
                    <h3 class="attract-title font-weight-bold pl-3">{{ item.Name }}</h3>
                    <p class="pl-3" v-if="item.OpenTime">
                        <img class="clock" src="@/assets/clock.png" alt="clock" />
                        {{ item.OpenTime }}
                    </p>
                    <p class="pl-3" v-if="item.Address">
                        <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                        {{ item.Address }}
                    </p>
                    <p class="pl-3" v-else>
                        <img class="map-pin" src="@/assets/map-pin.png" alt="map pin" />
                        {{ item.City }}
                    </p>
                    <div class="d-flex justify-content-center align-items-center">
                        <button class="detail-btn btn w-50 text-center py-1">了解更多</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="activity-description">
            <h2 class="pl-4 font-weight-bold">活動類別</h2>
            <p class="pl-4 font-weight-bold h2-caption">
                各種不同的活動內容<br />邀請您一銅來共襄盛舉！
            </p>
        </div>
        <div class="activity-sec row text-center">
            <div class="activity-item col-12 col-md-3">
                <div class="image rounded annual-act"></div>
                <h3 class="activity-title font-weight-bold">年度活動</h3>
            </div>
            <div class="activity-item col-12 col-md-3">
                <div class="image rounded art-act"></div>
                <h3 class="activity-title font-weight-bold">藝文活動</h3>
            </div>
            <div class="activity-item col-12 col-md-3">
                <div class="image rounded festival"></div>
                <h3 class="activity-title font-weight-bold">節慶活動</h3>
            </div>
            <div class="activity-item col-12 col-md-3">
                <div class="image rounded others"></div>
                <h3 class="activity-title font-weight-bold">其他</h3>
            </div>
        </div>
    </div>
</template>

<script>
import jsSHA from "jssha";

export default {
    name: "Home",
    // props: {
    //     msg: String,
    // },
    data() {
        return {
            selectedActivity: "所有類別",
            selectedCity: "all",
            activities: [
                "所有類別",
                "遊憩類",
                "自然風景類",
                "生態類",
                "國家風景區類",
                "國家公園類",
                "都會公園類",
                "森林遊樂區類",
                "林場類",
                "體育健身類",
                "古蹟類",
                "廟宇類",
                "溫泉類",
                "觀光工廠類",
                "休閒農業類",
                "小吃/特產類",
                "文化類",
                "藝術類",
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
            attractions: [],
            defaultImageUrl: `https://images.unsplash.com/photo-1553531889-3836a7ee6d3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80`,
            searchImageUrl: ``,
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
            let activityType = vm.selectedActivity;
            if (activityType === "所有類別") {
                // 選擇所有類別
                activityType = ``;
            } else {
                // 對Class1, Class2, Class3做活動類別篩選，結尾須帶&串接其他Odata條件
                activityType = `$filter=Class1 eq '${activityType}' or Class2 eq '${activityType}' or Class3 eq '${activityType}'&`;
            }
            // ?做為所有Odata條件的起頭，$為單一Odata條件的起頭
            const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot${city}?${activityType}$top=8&$format=JSON`;
            console.log("請求URL：", url);
            vm.axios
                .get(url, { headers: this.getAuthorizationHeader() })
                .then((response) => {
                    console.log(response);
                    vm.attractions = response.data;
                })
                .catch(() => {
                    console.log("failed");
                });
        },
        getUniqueTypes() {
            const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=Class1,Class2,Class3&$format=JSON`;
            const vm = this;
            vm.axios
                .get(url, { headers: this.getAuthorizationHeader() })
                .then((res) => {
                    const resAry = res.data;
                    const hasClass1Ary = resAry.filter((el) => {
                        return el.Class1;
                    });
                    // 填有 Class1 資料的成為新陣列 hasClass1Ary
                    const classTypes = hasClass1Ary.map((el) => {
                        return el.Class1;
                    });
                    // 抽出 Class1，形成新陣列 classTypes
                    const uniqueTypes = classTypes.filter(
                        (element, index) => classTypes.indexOf(element) === index
                    );
                    console.log(`Class1有這${uniqueTypes.length}種: `, uniqueTypes);
                })
                .catch(() => console.log("failed"));
        },
    },
    created() {
        this.getTDXdata();
        this.getUniqueTypes();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner-sec {
    height: 600px;
    background-image: url(https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80);
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
.attract-title,
.activity-title {
    font-size: 1.2rem;
    margin-top: 1.8rem;
}
.attract-description,
.activity-description {
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
}
.activity-description h2 {
    margin-top: 2rem;
}
.attract-sec {
    max-width: 95%;
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
}
.attract-item {
    background-color: #ffffff;
    margin-bottom: 90px;
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
}
.attract-img {
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
.activity-sec {
    max-width: 95%;
    margin-top: 4.5rem;
    margin-bottom: 6rem;
    margin-left: auto;
    margin-right: auto;
}
.activity-item {
    height: 400px;
}
.image {
    height: 325px;
    background-size: cover;
    background-position: center;
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
}
.annual-act {
    background-image: url(https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80);
}
.art-act {
    background-image: url(https://images.unsplash.com/photo-1540809799-78dbc7a3746d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=359&q=80);
}
.festival {
    background-image: url(https://images.unsplash.com/photo-1527286607633-84a4b8297928?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80);
}
.others {
    background-image: url(https://images.unsplash.com/photo-1526666923127-b2970f64b422?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80);
}
</style>
