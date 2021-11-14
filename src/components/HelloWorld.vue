<template>
    <div class="main">
        <!-- <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,<br />
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a
            >.
        </p> -->
        <select name="#" id="#">
            <option value="#"></option>
            <option value="#"></option>
            <option value="#"></option>
        </select>
        <select name="#" id="#">
            <option value="#"></option>
            <option value="#"></option>
            <option value="#"></option>
        </select>
        <button>確認</button>
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
            <div class="activity-item col-12 col-sm-3">年度活動</div>
            <div class="activity-item col-12 col-sm-3">藝文活動</div>
            <div class="activity-item col-12 col-sm-3">節慶活動</div>
            <div class="activity-item col-12 col-sm-3">其他</div>
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
            test: "test",
            attractions: [],
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
h2 {
    font-size: 1.875rem;
    color: #08a6bb;
}
p {
    color: #aeaeae;
}
.main {
    background-color: #e5e5e5;
}
.attract-title {
    font-size: 1.2rem;
}
.attract-item {
    background-color: #ffffff;
}
.attract-item img {
    height: 300px;
}
</style>
