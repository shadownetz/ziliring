<template>
    <div>
        <!-- Start Footer -->
        <footer class="footer bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 mt-3">
                        <img src="../../../assets/images/logo/ziliring.png" alt="ziliring logo" style="width: 150px;height:50px">
                        <div class="text-muted mt-4">
                            <ul class="list-unstyled footer-list">
                                <li><a href="javascript:void(0)" to="#home">Home</a></li>
                                <li><a href="javascript:void(0)" to="#about">About us</a></li>
<!--                                <li><a href="javascript:void(0)">Careers</a></li>-->
                                <li><a href="javascript:void(0)" to="#contact">Contact us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 mt-3">
                        <h5 class="">Information</h5>
                        <div class="text-muted">
                            <ul class="list-unstyled footer-list">
                                <li><a href="javascript:void(0)">Terms & Condition</a></li>
                                <li><a href="javascript:void(0)" to="#about">About us</a></li>
<!--                                <li><a href="javascript:void(0)">News</a></li>-->
<!--                                <li><a href="javascript:void(0)">Technology Privacy</a></li>-->
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 mt-3">
                        <h5 class="">Support</h5>
                        <div class="text-muted">
                            <ul class="list-unstyled footer-list">
                                <li>
                                    <a href="javascript:void(0)"><i class="mdi mdi-whatsapp"></i></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><i class="mdi mdi-telegram"></i></a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><i class="mdi mdi-facebook"></i></a>
                                </li>
<!--                                <li><a href="javascript:void(0)">Contact</a></li>-->
<!--                                <li><a href="javascript:void(0)">Disscusion</a></li>-->
<!--                                <li><a href="javascript:void(0)">Typography</a></li>-->
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 mt-3">
                        <h5 class="">Subscribe</h5>
                        <div class="text-muted">
                            <p>
                                Subscribe to our newsletter to be informed about our new plans and
                                critical changes that might arise.
                            </p>
                        </div>
                        <form class="form subscribe">
                            <input placeholder="Email" class="form-control" required>
                            <a href="javascript:void(0)" class="submit"><i class="pe-7s-paper-plane"></i></a>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
        <!--END FOOTER-->

        <!--START FOOTER ALTER-->
        <div class="footer-alt">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="float-left pull-none ">
                            <p class="copy-rights text-muted mb-0">{{(()=>new Date().getFullYear())()}} © Ziliring</p>
                        </div>

                        <div class="float-right pull-none">
                            <ul class="social-icon list-unstyled list-inline mb-0">
                                <li class="list-inline-item">
                                    <a href="javascript:void(0)"><i class="mdi mdi-google icon icon--xs"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript:void(0)"><i class="mdi mdi-twitter icon icon--xs"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript:void(0)"><i class="mdi mdi-facebook icon icon--xs"></i></a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="javascript:void(0)"><i class="mdi mdi-instagram icon icon--xs"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--START FOOTER ALTER-->
    </div>
</template>

<script>
    export default {
        name: "footNav",
        mounted(){
            // require("../../assets/js/jquery.min.js");
            // require("../../assets/js/bootstrap.bundle.min.js");
            // require("../../assets/js/jquery.countdown.min.js");
            // require("../../assets/js/jquery.easing.min.js");
            // require("../../assets/js/owl.carousel.min.js");
            // require("../../assets/js/scrollspy.min.js");
            // require("../../assets/js/jquery.magnific-popup.min.js");
            // require("../../assets/js/particles.js");
            require("../../../assets/js/particles.app.js");
            // require("../../../assets/js/contact.init.js");
            require("../../../assets/js/jquery.app.js");

            let navLinks = $('.footer .footer-list li a');
            navLinks.on('click', function(event){
                event.preventDefault();
                event.stopPropagation();
                $('html, body').animate({
                    scrollTop: $($(this).attr('to')).offset().top
                }, 1000)
            })
        }
    }
</script>

<style scoped>

</style>