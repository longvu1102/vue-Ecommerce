<template>
    <div class="container-fluid">
        <h3 class="mb-5">Featured</h3>
        <div class="row">
            <div class="col-4">
                <div class="images">
                    <img src="@/assets/images/nike-just-do-it-1.jpg" alt="">
                </div>
                <div class="content">
                    <h4>Nike Air Max Dn Comming Soon </h4>
                </div>
            </div>
            <div class="col-4">
                <div class="images">
                    <img src="@/assets/images/nike-just-do-it-2.jpg" alt="">
                </div>
                <div class="content">
                    <h4>Retro Running Shoes</h4>
                </div>
            </div>
            <div class="col-4">
                <div class="images">
                    <img src="@/assets/images/nike-just-do-it-3.jpg" alt="">
                </div>
                <div class="content">
                    <h4>From the J's Up</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: "Featured-Two"
}
</script>
<style scope>
.container-fluid {
    margin-top: -100px;
}

.row {
    display: flex;
    justify-content: space-between; /* Căn các cột ra xa nhau */
}

.col-4 {
    flex-basis: calc(33.33% - 10px); /* Đặt kích thước cố định cho mỗi cột và trừ đi khoảng cách giữa chúng */
    margin-bottom: 20px; /* Khoảng cách giữa các hàng */
}

.images {
    text-align: center; /* Căn hình ảnh vào giữa cột */
}

.images img {
    max-width: 100%;
}

.content {
    text-align: center; /* Căn nội dung vào giữa cột */
}

.content a {
    text-decoration: none;
    color: black;
}


</style>