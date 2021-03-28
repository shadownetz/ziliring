<template>
    <footer>
        <div class="container-fluid" style="padding-top: 20px">
            <div class="row">
                <div class="col-12 col-md-6 pt-5">
                    <img src="../../../assets/images/logo/ziliring.png"
                         alt="ziliring logo"
                    >.com
                    <div>
                        <ul class="social-links">
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="fa fa-twitter text-info"></i> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="fa fa-facebook text-primary"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">
                                    <i class="fa fa-whatsapp text-success"></i> Whatsapp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-md-6 pt-5">
                    <h4>Resources</h4>
                    <p><a href="javascript:void(0)">Support</a></p>
                    <p><a href="javascript:void(0)">Terms</a></p>
                    <p><a href="javascript:void(0)">Privacy</a></p>
                </div>
                <div class="col-12 text-center pt-4">
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