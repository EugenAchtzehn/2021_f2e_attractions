import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";

import App from "@/App";
import router from "@/router";

// // 依自己需求，載入 vue2-leaflet 的元件 > 全域載入
// import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
// 載入 leaflet 的相關樣式
import "leaflet/dist/leaflet.css";

// 啟用載入的元件 > 全域啟用套件
// Vue.component("l-map", LMap);
// Vue.component("l-tile-layer", LTileLayer);
// Vue.component("l-marker", LMarker);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
