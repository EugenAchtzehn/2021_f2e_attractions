<template>
    <div id="app" class="container-fluid">
        <header class="row mt-4 text-center">
            <img class="top-logo" src="./assets/top-logo.png" alt="Logo on header" />
            <div class="col-sm-6 mr-auto">Travel Taiwan</div>
            <div class="col-sm-6 row">
                <div class="col-4">首頁</div>
                <div class="col-4">景點導覽</div>
                <div class="col-4">觀光活動</div>
            </div>
        </header>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Vue CLI" /> -->
        <MainContent msg="Welcome to Vue CLI" />
        <footer>
            <div class="quote-sec d-flex justify-content-center align-items-center">
                <h3 class="font-weight-bold text-white text-center">
                    “To travel is to live” <br />– Hans Christian Anderson
                </h3>
            </div>
            <div class="copy-sec pt-5 pb-5 font-weight-bold text-center text-white">
                <span class="mr-4">CopyRight: Travel Taiwan</span>
                <span>DesignBy: Tracy</span>
            </div>
        </footer>
    </div>
</template>

<script>
import MainContent from "./components/MainContent.vue";

export default {
    name: "App",
    components: {
        MainContent,
    },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
.quote-sec {
    height: 330px;
    background-image: url(https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80);
    background-position: center;
    background-size: cover;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 32px;
    line-height: 38px;
}
.copy-sec {
    font-size: 1.2rem;
    background-color: #08a6bb;
    font-family: Roboto, Helvetica, Arial, sans-serif;
}
header {
    height: 80px;
}
.top-logo {
    height: 40px;
    width: 40px;
}
/* #app {
    font-family: 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
