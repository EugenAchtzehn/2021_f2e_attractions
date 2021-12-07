<template>
    <div id="app" class="container-fluid">
        <Header></Header>
        <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Vue CLI" /> -->
        <MainContent msg="Welcome to Vue CLI" />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import MainContent from "@/components/MainContent.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "App",
    components: {
        Header,
        MainContent,
        Footer,
    },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#app {
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
