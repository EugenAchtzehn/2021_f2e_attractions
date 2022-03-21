<template>
  <div id="app" class="container-fluid">
    <header class="row">
      <div
        class="
          col-12 col-md-8
          d-flex
          align-items-center
          justify-content-center justify-content-md-start
        "
      >
        <img class="top-logo" src="@/assets/top-logo.png" alt="Logo on header" />
        <h2 class="title-header">Travel Taiwan</h2>
      </div>
      <div class="col-12 col-md-4 row d-flex align-items-center text-center">
        <div class="col-4">
          <router-link to="/" class="nav-item text-decoration-none">景點導覽</router-link>
        </div>
        <div class="col-4">
          <router-link to="/bikes" class="nav-item text-decoration-none">鐵馬漫遊</router-link>
        </div>
        <div class="col-4">
          <router-link to="/activities" class="nav-item text-decoration-none">
            觀光活動
          </router-link>
        </div>
      </div>
    </header>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- 渲染 route 的位置 -->
    <router-view></router-view>
    <!-- <MainContent msg="Welcome to Vue CLI" /> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Footer,
  },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}

// Beginning of Header Style
header {
  height: 80px;
}
.top-logo {
  height: 40px;
  margin-right: 20px;
  margin-left: 76px;
}
.title-header {
  font-style: italic;
  font-weight: 900;
  font-size: 30px;
  line-height: 35px;
  color: #08a6bb;
}
.nav-item {
  color: #525151;
  font-size: 20px;
  line-height: 23px;
}
.nav-item:hover {
  color: #08a6bb;
}
// Ending of Header Style

/* #app {
    font-family: 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
