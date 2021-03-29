<template>
    <div>
        <top-nav/>

        <!-- Banner Section -->
        <section id="home">
            <div class="container-fluid">
                <div class="row banner">
                    <div class="col-12 banner-2">
                        <div class="container">
                            <div class="col-12 txt-block text-white text-center">
                                <h1 class="text-capitalize text-white">
                                    We earn your future <br>let us earn your trust
                                </h1>
                                <p>
                                    Trusted by 70K+ Nigerians - with Over 100K+ Contributors on standby - Since 2013
                                </p>
                                <a v-if="isSignedIn" href="/dashboard" class="btn btn-lg btn-pink mt-3">Go to Dashboard</a>
                                <button v-else data-toggle="modal" data-target="#authModal" class="btn btn-lg btn-pink mt-5">Get Started</button>
                            </div>
                        </div>
                    </div>
                    <img class="banner-trans-under" src="../assets/images/bg/hero-gradient.svg" alt="banner bg">
                </div>
            </div>
        </section>

        <!-- About us Section -->
        <section id="about">
            <div class="container-fluid">
                <div class="row aboutus">
                    <div class="col-12 col-md-5 pl-3 pl-md-5">
                        <div class="tag-info">
                            <i class="ti ti-cloud"></i>
                            <span class="badge light badge-info ml-3">about us</span>
                        </div>
                        <h1 class="pt-3">
                            Fully Decentralized System
                        </h1>
                        <a v-if="isSignedIn" href="/dashboard" class="btn btn-lg btn-primary">Go to Dashboard</a>
                        <button v-else data-toggle="modal" data-target="#authModal" class="btn btn-lg btn-primary">Join in</button>
                        <ul class="options">
                            <li :class="about_options[0]?'active':''" @click="toggleOptions(0)">
                                <h3>Swift Earning</h3>
                                <p class="animated fadeIn">
                                    Make your contribution and earn within the next 7 days.
                                </p>
                            </li>
                            <li :class="about_options[1]?'active':''" @click="toggleOptions(1)">
                                <h3>Reliable Contributors</h3>
                                <p class="animated fadeIn">
                                    Contributors undergo various authentication and verification so do not fret when
                                    a contributor faults. You will be reassigned ASAP
                                </p>
                            </li>
                            <li :class="about_options[2]?'active':''" @click="toggleOptions(2)">
                                <h3>Automated Payouts</h3>
                                <p class="animated fadeIn">
                                    Request for a withdrawal and get notified of your funds transfer
                                    to your local bank within minutes
                                </p>
                            </li>
                            <li :class="about_options[3]?'active':''" @click="toggleOptions(3)">
                                <h3>Prompt Customer Support</h3>
                                <p class="animated fadeIn">
                                    You have a problem or suggestions, feel free to hit us up.
                                    We will get back to you within the seconds
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 col-md-7 text-right options-img">
                        <img class="img-fluid" :src="active_option_bg" alt="" style="width: 600px;height: 500px">
                    </div>
                    <div class="col-12 pt-5 options-slide">
                        <div class="options-carousel">
                            <div>
                                <h3>Swift Earning</h3>
                                <p class="animated fadeIn">
                                    Make your contribution and earn within the next 7 days.
                                </p>
                                <div class="col-12 text-center">
                                    <img class="img-fluid"  :src="about_options_bg[0]" alt="" style="">
                                </div>
                            </div>
                            <div>
                                <h3>Reliable Contributors</h3>
                                <p class="animated fadeIn">
                                    Contributors undergo various authentication and verification so do not fret when
                                    a contributor faults. You will be reassigned ASAP
                                </p>
                                <div class="col-12 text-center">
                                    <img class="img-fluid" :src="about_options_bg[1]" alt="" style="">
                                </div>
                            </div>
                            <div>
                                <h3>Automated Payouts</h3>
                                <p class="animated fadeIn">
                                    Request for a withdrawal and get notified of your funds transfer
                                    to your local bank within minutes
                                </p>
                                <div class="col-12 text-center">
                                    <img class="img-fluid"  :src="about_options_bg[2]" alt="" style="">
                                </div>
                            </div>
                            <div>
                                <h3>Prompt Customer Support</h3>
                                <p class="animated fadeIn">
                                    You have a problem or suggestions, feel free to hit us up.
                                    We will get back to you within the seconds
                                </p>
                                <div class="col-12 text-center">
                                    <img class="img-fluid" :src="about_options_bg[3]" alt="" style="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="roadmap">
            <div class="container-fluid">
                <div class="row banner">
                    <div class="col-12 banner-2">
                        <div class="container">
                            <div class="col-12 txt-block text-white text-center">
                                <h1 class="text-capitalize text-white">
                                    How it works
                                </h1>
                                <p>Here is a brief RoadMap you will need to go through</p>
                                <div class="row text-left">
                                    <div class="col-12 col-md-4 step">
                                        <div class="item">
                                            <div class="text-pink"><i class="fa fa-2x fa-sign-in"></i></div>
                                            <h3>Register</h3>
                                            <p>
                                                Quickly signup with the relevant details to begin your contributions
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 step">
                                        <div class="item">
                                            <div class="text-pink"><i class="fa-2x flaticon-381-phone-call"></i></div>
                                            <h3>Verify Phone</h3>
                                            <p>
                                                To prevent spamming we require you verify your phone number.
                                                Do not worry it takes less than a second.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 step">
                                        <div class="item">
                                            <div class="text-pink"><i class="fa fa-2x fa-bank"></i></div>
                                            <h3>Make Payment</h3>
                                            <p>
                                               Low on cash? make payment and see the magin that happens thereon
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3 text-left">
                                    <div class="col-12 col-md-4 step">
                                        <div class="item">
                                            <div class="text-pink"><i class="fa fa-2x fa-file"></i></div>
                                            <h3>Upload Proof of Payment</h3>
                                            <p>
                                                You need to show the contributor you are assigned to proof
                                                that you have completed your part in order to begin your earning
                                                process
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 step">
                                        <div class="item">
                                            <div class="text-pink"><i class="fa fa-2x fa-money"></i></div>
                                            <h3>Begin Earning</h3>
                                            <p>
                                                At Ziliring, you get 50% plus your initial contribution within the next 7 days
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-4 step">
                                        <div class="item">
                                            <div class="text-pink"><i class="ti fa-2x ti-export"></i></div>
                                            <h3>Make Withdrawal</h3>
                                            <p>
                                                When you feel you have enough on your portfolio, send us a withdrawal request.
                                                We will review your transaction history and transfer your funds to your local
                                                bank
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img class="banner-trans-under" src="../assets/images/bg/how_it_works.jpg" alt="banner bg">
                </div>
            </div>
        </section>
        <!-- FAQ Section -->
        <section id="faq">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 py-5">
                        <h3 class="text-center">Frequently Asked Questions</h3>
                        <div class="container">
                            <div class="accordion" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                What currencies can i use to start earning?
                                            </button>
                                        </h2>
                                    </div>

                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div class="card-body">
                                            Currently we only support Nigerian Currency (₦). We hope to support more
                                            as time goes
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                How long will it take to earn a profit?
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div class="card-body">
                                            As soon as you upload your payment proof and it is confirmed by the contributor
                                            you are attached to, you begin making profit within the next 7 days
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                What do you mean by Re-subscription?
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div class="card-body">
                                            It gets to a time your contribution will expire, you can make another contribution if you
                                            need to earn more obviously, not withstanding you can run multiple contributions as long as
                                            you upload your payments proof within the next 3 hours
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Ad banner -->
        <section id="showoff">
            <div class="container-fluid">
                <div class="row banner">
                    <div class="col-12 banner-2">
                        <div class="container">
                            <div class="col-12 txt-block text-white text-center">
                                <h1 class="text-capitalize text-white">
                                    From Zero to Naira in Minutes.
                                </h1>
                                <a v-if="isSignedIn" href="/dashboard" class="btn btn-lg btn-pink mt-3">Go to Dashboard</a>
                                <button v-else data-toggle="modal" data-target="#authModal" class="btn btn-lg btn-pink mt-3">Get Started</button>
                                <img class="img-fluid" src="../assets/images/bg/explorer-dashboard-mobile.png" alt="">
                            </div>
                        </div>
                    </div>
                    <img class="banner-trans-under" src="../assets/images/bg/hero-gradient.svg" alt="banner bg">
                </div>
            </div>
        </section>
        <foot-nav/>
    </div>
</template>

<script>
    import topNav from "../components/navigation/home/topNav";
    import footNav from "../components/navigation/home/footNav";
    import option1BG from "../assets/images/bg/explorer-dashboard.png"
    import option2BG from "../assets/images/bg/explorer-contributions.png"
    import option3BG from "../assets/images/bg/explorer-payouts.png"
    import option4BG from "../assets/images/bg/explorer-dashboard-mobile.png"

    import {mapGetters} from "vuex";

    export default {
        name: 'Home',
        data(){
            return {
                about_options: [true, false, false, false],
                about_options_bg: [
                    option1BG,
                    option2BG,
                    option3BG,
                    option2BG, // replace with whatsapp web image
                    option4BG
                ],
                active_option_bg: option1BG
            }
        },
        computed: {
            ...mapGetters('auth', [
                'isSignedIn'
            ])
        },
        watch: {
            about_options: function (){
                this.about_options.forEach((option, index)=>{
                    if(option) this.active_option_bg = this.about_options_bg[index]
                })
            }
        },
        methods: {
            toggleOptions(idx){
                this.about_options = this.about_options.map((option, index)=>idx === index);
            }
        },
        components: {
            topNav,
            footNav
        },
        mounted() {
            // this.$store.dispatch('auth/logout', {reset: false})

            $(".options-carousel").owlCarousel({
                autoPlay: true,
                slideSpeed: 2000,
                pagination: false,
                navigation: true,
                items: 1,
                /* transitionStyle : "fade", */
                /* [This code for animation ] */
                navigationText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                // itemsDesktop: [1199, 4],
                // itemsDesktopSmall: [980, 2],
                // itemsTablet: [768, 1],
                // itemsMobile: [479, 1],
            });
            // smooth scrolling
            $(document).ready(function(){
                // Add smooth scrolling to all links
                $("a").on('click', function(event) {

                    // Make sure this.hash has a value before overriding default behavior
                    if (this.hash !== "") {
                        // Prevent default anchor click behavior
                        event.preventDefault();

                        // Store hash
                        var hash = this.hash;

                        // Using jQuery's animate() method to add smooth page scroll
                        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top
                        }, 1000, function(){

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            // window.location.hash = hash;
                        });
                    } // End if
                });
            });
        }
    }
</script>
