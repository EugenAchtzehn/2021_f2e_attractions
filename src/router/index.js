// 路由設定檔
import Vue from 'vue';
import VueRouter from 'vue-router';

// 首頁元件
import Home from '@/components/pages/home';
import Bikes from '@/components/pages/bikes';
import Activities from '@/components/pages/activities';

Vue.use(VueRouter);

// const routes = [
//     {
//         path: "/",
//         name: "Home",
//         component: Home,
//     },
// ];

// const router = new VueRouter({
//     mode: "history",
//     base: process.env.BASE_URL,
//     routes,
// });

export default new VueRouter({
  routes: [
    { name: 'Home', path: '/', component: Home },
    { name: 'Bikes', path: '/bikes', component: Bikes },
    {
      name: 'Activities',
      path: '/activities',
      component: Activities,
    },
  ],
});
