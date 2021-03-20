<template>
    <div id="main-wrapper">
        <top-nav/>
        <side-nav/>

        <div class="content-body">
            <div class="container-fluid">
                <router-view
                        @togglePaymentInfo="paymentInfoPayload=$event"
                        @toggleVContrib="personalContrib=$event"
                        @togglePaymentProof="paymentProofs=$event"
                />
            </div>
        </div>

        <foot-nav/>
        <payment-info
                :package_z="paymentInfoPayload.package"
                :payment="paymentInfoPayload.payment"
        />
        <view-personal-contribution :contribution="personalContrib"/>
        <payment-proofs :urls="paymentProofs"/>
        <update-account-details v-if="!profile.data.bankName"/>
    </div>
</template>

<script>
    import topNav from "../../components/navigation/dashboard/topNav";
    import footNav from "../../components/navigation/dashboard/footNav";
    import sideNav from "../../components/navigation/dashboard/sideNav";
    import paymentInfo from "../../components/modals/paymentInfo";
    import viewPersonalContribution from "../../components/modals/viewPersonalContribution";
    import paymentProofs from "../../components/modals/paymentProofs";
    import updateAccountDetails from "../../components/modals/updateAccountDetails";
    import {mapGetters} from "vuex";

    export default {
        name: "dashboard",
        data(){
            return {
                paymentInfoPayload: {},
                personalContrib: {id: '', data: {}},
                paymentProofs: []
            }
        },
        computed: {
            ...mapGetters({
                profile: 'profile/getProfile'
            })
        },
        components: {
            topNav,
            footNav,
            sideNav,
            paymentInfo,
            viewPersonalContribution,
            paymentProofs,
            updateAccountDetails
        },
        created() {
            this.$toast.success('Welcome back', 'Invite');
            setTimeout(()=>{
                if(!this.profile.data.bankName){
                    const elem = $('#accountDetails');
                    elem.modal({
                        backdrop: 'static',
                        show: false,
                        focus: true
                    });
                    elem.modal('show')
                }
            }, 2500)
        },
        mounted() {
            $('#main-wrapper').css('opacity', 1);
            setTimeout(()=>{
                $('#preloader').fadeOut('slow');
            }, 1000)
            $('head').append([
                "<link class='dash_custom_imports' href='assets/dashboard/vendor/datatables/css/jquery.dataTables.min.css' rel='stylesheet'>",
                "<link class='dash_custom_imports' rel='stylesheet' href='assets/dashboard/css/style.css'/>"
            ]);
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
        beforeRouteEnter(to, from, next){
            if(window.location.href[window.location.href.length-1] === '/'){
                let curr_location = window.location.href.split('/');
                curr_location.pop();
                window.location.href = curr_location.join('/');
            }
            next()
        },
        beforeRouteLeave(to, from, next){
            $('.dash_custom_imports').remove();
            next()
        }
    }

</script>
<style scoped>

</style>