<template>
    <div>
        <!-- Pre-loader -->
        <div id="preloader">
            <div id="status">
                <div class="spinner">Loading...</div>
            </div>
        </div>
        <!-- End Preloader-->

        <!--Navbar Start-->
        <nav class="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark">
            <div class="container">
                <!-- LOGO -->
                <router-link :to="{name:'Home'}" class="logo">
                    <img id="main-logo" src="../../../assets/images/logo/ziliring_light.png" alt="ziliring logo" style="width: 150px;height: 50px">
                    <img id="logo-alt" src="../../../assets/images/logo/ziliring.png" alt="ziliring logo" style="width: 150px;height: 50px; display: none">
                </router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="mdi mdi-menu"></i>
                </button>
                <!-- Start Navbar -->
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav ml-auto navbar-center" id="mySidenav">
                        <li class="nav-item font-weight-600 active">
                            <a href="javascript:void(0)" to="#home" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" to="#about" class="nav-link">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" to="#services" class="nav-link">Plans</a>
                        </li>
<!--                        <li class="nav-item">-->
<!--                            <a href="javascript:void(0)" to="#token" class="nav-link">Token Sale</a>-->
<!--                        </li>-->
                        <li class="nav-item">
                            <a href="javascript:void(0)" to="#roadmap" class="nav-link">How it works</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" to="#team" class="nav-link">Team</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" to="#faq" class="nav-link">FAQ</a>
                        </li>
                        <li class="nav-item">
                            <a href="javascript:void(0)" to="#contact" class="nav-link">Contact</a>
                        </li>
                    </ul>
                    <button class="btn btn-sm navbar-btn btn-round">Account</button>

                </div>
            </div>
        </nav>
        <!-- Navbar End -->
        
    </div>
</template>

<script>
    // import "../../assets/css/bootstrap.min.css"
    // import "../../assets/css/materialdesignicons.min.css"
    // import "../../assets/css/owl.carousel.css"
    // import "../../assets/css/owl.theme.css"
    // import "../../assets/css/owl.transitions.css"
    // import "../../assets/css/pe-icon-7.css"
    // import "../../assets/css/magnific-popup.css"
    import "../../../assets/css/style.css"


    export default {
        name: "homeNav",
        methods: {

        },
        mounted() {
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');


            let navLinks = $('#mySidenav .nav-link');
            // eslint-disable-next-line no-unused-vars
            navLinks.on('click', function(event){
                // event.preventDefault();
                // event.stopPropagation();
                $('.navbar-custom .navbar-nav li').removeClass('active');
                $(this).parent('li').addClass('active');
                $('html, body').animate({
                    scrollTop: $($(this).attr('to')).offset().top
                }, 1000)
            })
        }
    }
</script>

<style scoped>

</style>