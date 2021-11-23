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
                <img class="top-logo" src="./assets/top-logo.png" alt="Logo on header" />
                <h2 class="title-header">Travel Taiwan</h2>
            </div>
            <div class="col-12 col-md-4 row d-flex align-items-center text-center">
                <div class="col-4">
                    <a href="#" class="nav-item text-decoration-none">首頁</a>
                </div>
                <div class="col-4">
                    <a href="#" class="nav-item text-decoration-none">景點導覽</a>
                </div>
                <div class="col-4">
                    <a href="#" class="nav-item text-decoration-none">觀光活動</a>
                </div>
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
#app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
}
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
}
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
/* #app {
    font-family: 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
