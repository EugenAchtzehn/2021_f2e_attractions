<template>
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
</template>
<script>
export default {
    name: "Header",
};
</script>
<style scoped>
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
</style>
