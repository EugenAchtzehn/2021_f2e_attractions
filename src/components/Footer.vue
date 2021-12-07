<template>
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
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
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
</style>
