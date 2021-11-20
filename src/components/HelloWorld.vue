<template>
    <div class="main container-fluid">
        <!-- <h1>{{ msg }}</h1> -->
        <div class="banner-sec d-flex justify-content-center align-items-center">
            <div class="select-sec">
                <select
                    name="selectActivity"
                    id="selectActivity"
                    class="rounded"
                    @change="getActivity"
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
                    @change="getCity"
                    v-model="selectedCity"
                >
                    <option value="" disabled>請選擇縣市</option>
                    <option :value="city.en" v-for="city in cities" :key="city.zh">
                        {{ city.zh }}
                    </option>
                </select>
                <button class="rounded">確認</button>
            </div>
        </div>
        <h2 class="pl-4 font-weight-bold">熱門景點</h2>
        <p class="pl-4 font-weight-bold">
            台灣的各個美景，都美不勝收。<br />等你一同來發現這座寶島的奧妙！
        </p>
        <div class="attract-sec row">
            <div
                class="attract-item col-12 col-sm-3 rounded"
                v-for="item in attractions"
                :key="item.ID"
            >
                <img :src="item.Picture.PictureUrl1" :alt="item.Picture.PictureDescription1" />
                <h3 class="attract-title font-weight-bold pl-3">{{ item.Name }}</h3>
                <p class="pl-3">{{ item.City }}</p>
            </div>
        </div>
        <h2 class="pl-4 font-weight-bold">活動類別</h2>
        <p class="pl-4 font-weight-bold">各種不同的活動內容<br />邀請您一銅來共襄盛舉！</p>
        <div class="activities-sec row text-center">
            <div class="activity-item col-12 col-sm-3">
                <div class="image rounded annual-act"></div>
                <h3 class="activity-title font-weight-bold">年度活動</h3>
            </div>
            <div class="activity-item col-12 col-sm-3">
                <div class="image rounded art-act"></div>
                <h3 class="activity-title font-weight-bold">藝文活動</h3>
            </div>
            <div class="activity-item col-12 col-sm-3">
                <div class="image rounded festival"></div>
                <h3 class="activity-title font-weight-bold">節慶活動</h3>
            </div>
            <div class="activity-item col-12 col-sm-3">
                <div class="image rounded others"></div>
                <h3 class="activity-title font-weight-bold">其他</h3>
            </div>
        </div>
    </div>
</template>

<script>
import jsSHA from "jssha";

export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    data() {
        return {
            selectedActivity: "",
            selectedCity: "",
            activities: ["所有類別", "遊憩類", "自然風景類", "體育健身類", "古蹟類"],
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
        };
    },
    methods: {
        getActivity() {},
        getCity() {},
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
            const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=8&$format=JSON`;
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
    },
    created() {
        this.getTDXdata();
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
}
.select-sec select {
    width: 190px;
    height: 50px;
    text-align: center;
    margin-right: 1.2rem;
}
/* .select-sec button {
    height: 42px;
    width: 42px;
} */
h2 {
    font-size: 1.875rem;
    color: #08a6bb;
    margin-top: 120px;
}
p {
    color: #aeaeae;
}
.main {
    /* background-color: #e5e5e5; */
}
.attract-title,
.activity-title {
    font-size: 1.2rem;
    margin-top: 1.8rem;
}
.activities-sec {
    margin-top: 4.5rem;
    margin-bottom: 6rem;
}
.attract-item {
    background-color: #ffffff;
    /* max-width: 100%; */
}
.attract-item img {
    filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.2));
    height: 200px;
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

/* height: 325px; */
/* .activity-item img {
    max-width: 100%;
} */
</style>
