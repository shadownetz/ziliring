<template>
    <div class="main">
        <!-- Pre-loader -->
        <div id="preloader">
            <img src="../../../assets/images/logo/ziliring_preloader.svg"
                 alt="ziliring preloader">
        </div>
        <!-- End Preloader-->

        <!--Navbar Start-->
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">
                <img src="../../../assets/images/logo/ziliring_light.png" alt="ziliring logo">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#home">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#roadmap">How it works</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#faq">FAQ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fa fa-whatsapp"></i> Support
                        </a>
                    </li>
<!--                    <li class="nav-item dropdown">-->
<!--                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
<!--                            Dropdown-->
<!--                        </a>-->
<!--                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">-->
<!--                            <a class="dropdown-item" href="#">Action</a>-->
<!--                            <a class="dropdown-item" href="#">Another action</a>-->
<!--                            <div class="dropdown-divider"></div>-->
<!--                            <a class="dropdown-item" href="#">Something else here</a>-->
<!--                        </div>-->
<!--                    </li>-->
                </ul>
                <a href="/dashboard" class="text-white my-sm-0" :to="{name: 'Dashboard'}" v-if="isSignedIn">
                    <i class="fa fa-user"></i> Dashboard
                </a>
                <a v-else href="javascript:void(0)" class="text-white my-sm-0" data-toggle="modal" data-target="#authModal">
                    <i class="fa fa-user"></i> Account
                </a>
            </div>
        </nav>
        <!-- Navbar End -->

        <auth-modal/>
    </div>
</template>

<script>
    import "../../../assets/css/customStyle.css"
    import authModal from "../../auth/authModal";
    import {mapGetters} from 'vuex'

    export default {
        name: "topNav",
        computed: {
            ...mapGetters('auth', [
                'isSignedIn'
            ])
        },
        methods: {

        },
        components: {
            authModal
        },
        mounted() {
            $('#status').fadeOut();

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