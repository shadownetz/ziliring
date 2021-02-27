<template>
    <div id="main-wrapper">
        <top-nav/>
        <side-nav/>

        <div class="content-body">
            <div class="container-fluid">
                <router-view/>
            </div>
        </div>

        <foot-nav/>
    </div>
</template>

<script>
    import topNav from "../../components/navigation/dashboard/topNav";
    import footNav from "../../components/navigation/dashboard/footNav";
    import sideNav from "../../components/navigation/dashboard/sideNav";

    export default {
        name: "dashboard",
        components: {
            topNav,
            footNav,
            sideNav
        },
        created() {
            this.$toast.success('Ziliring welcomes you back to the ring!', 'Hurray!')
        },
        mounted() {
            $('head').append(
                "<link class='dash_custom_imports' rel='stylesheet' href='assets/dashboard/css/style.css'/>"
            );
            $('body').append(
                [
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/global/global.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/bootstrap-select/dist/js/bootstrap-select.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/chart.js/Chart.bundle.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/js/custom.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/js/deznav-init.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/owl-carousel/owl.carousel.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/peity/jquery.peity.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/js/dashboard/dashboard-1.js'/>",
                ]
            )
        },
        beforeRouteLeave(to, from, next){
            $('.dash_custom_imports').remove();
            next()
        }
    }

</script>
<style scoped>

</style>