<template>
    <footer>
        <div class="container-fluid" style="padding-top: 20px">
            <div class="row">
                <div class="col-12 col-md-4">
                    <img src="../../../assets/images/logo/ziliring.png"
                         alt="ziliring logo"
                    >.com
                </div>
                <div class="col-12 col-md-4">
                    <div class="row pt-md-3">
                        <div class="col-12 col-md-4">
                            <a href="javascript:void(0)">
                                <i class="fa fa-twitter text-info"></i> Twitter
                            </a>
                        </div>
                        <div class="col-12 col-md-4">
                            <a href="javascript:void(0)">
                                <i class="fa fa-facebook text-primary"></i> Facebook
                            </a>
                        </div>
                        <div class="col-12 col-md-4">
                            <a href="javascript:void(0)">
                                <i class="fa fa-whatsapp text-success"></i> Whatsapp
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <p class="pt-md-3">
                        <a href="javascript:void(0)">Support</a>
                    </p>
<!--                    <p><a href="javascript:void(0)">Terms</a></p>-->
<!--                    <p><a href="javascript:void(0)">Privacy</a></p>-->
                </div>
                <div class="col-12 text-center pt-2">
                    <p>&copy;{{(()=>new Date().getFullYear())()}} Ziliring. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "footNav",
        mounted(){
            // require("../../../assets/js/particles.app.js");
            $('#preloader').delay(350).fadeOut('slow');
        }
    }
</script>

<style scoped>

</style>