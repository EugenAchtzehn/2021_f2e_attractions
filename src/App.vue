<template>
    <div id="app" class="container-fluid">
        <header class="row mt-4 text-center">
            <div class="col-sm-6 mr-auto">Travel Taiwan</div>
            <div class="col-sm-6 row">
                <div class="col-4">首頁</div>
                <div class="col-4">景點導覽</div>
                <div class="col-4">觀光活動</div>
            </div>
        </header>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <HelloWorld msg="Welcome to Vue CLI" />
        <footer>
            <div class="copy-sec pt-5 pb-5 font-weight-bold text-center text-white">
                <span class="mr-4">CopyRight: Travel Taiwan</span>
                <span>DesignBy: Tracy</span>
            </div>
        </footer>
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
    name: "App",
    components: {
        HelloWorld,
    },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

.copy-sec {
    font-size: 1.2rem;
    background-color: #08a6bb;
    font-family: Roboto, Helvetica, Arial, sans-serif;
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
