<template>
    <div id="main-wrapper">
        <div class="content-body" style="margin-left: auto;padding-top: 2em">
            <div class="authincation h-100">
                <div class="container-fluid h-100">
                    <div class="row justify-content-center h-100 align-items-center">
                        <div class="col-md-5">
                            <div v-if="purged" class="form-input-content text-center error-page">
                                <img src="../../assets/images/logo/ziliring.png" alt="ziliring logo" style="width: 220px;height:80px">
                                <h1 class="error-text  font-weight-bold">
                                    Purged
                                </h1>
                                <h4 class="mt-5">
                                    <i class="fa fa-times-circle text-danger"></i>
                                    You have been purged!
                                </h4>
                                <p>
                                    Please check back on
                                    <i class="fa fa-clock-o"></i> {{getDaysDiffFromTimestamp(userProfile.data.purgedAt)}}
                                </p>
                                <div>
                                    <a class="btn btn-primary" href="javascript:void(0)" @click="toHome">Back to Home</a>
                                </div>
                            </div>
                            <div v-else-if="deactivated" class="form-input-content text-center error-page">
                                <img src="../../assets/images/logo/ziliring.png" alt="ziliring logo" style="width: 220px;height:80px">
                                <h1 class="error-text  font-weight-bold" style="font-size: 3em!important;">
                                    Deactivated
                                </h1>
                                <h4 class="mt-5">
                                    <i class="fa fa-times-circle text-danger"></i>
                                    You are no longer a valid contributor as you have been purged more than 3 times!
                                </h4>
                                <p>
                                    If you think this was a mistake please contact <br>
                                    <a class="text-primary" href="mailto:support@ziliring.com"><i class="fa fa-support"></i> support@ziliring.com</a>
                                </p>
                                <div>
                                    <a class="btn btn-primary" href="javascript:void(0)" @click="toHome">Back to Home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";
    import {mapGetters} from 'vuex'
    import firebase from "../../firebase/firebase";

    export default {
        name: "purgedAccount",
        data(){
            return {
                purged: false,
                deactivated: false,
                userProfile: {id: '', data: {}}
            }
        },
        mixins: [basicMethodMixins],
        computed: {
            ...mapGetters('auth', [
                'isSignedIn'
            ])
        },
        watch: {
            $route(){
                this.validate()
            }
        },
        methods: {
            async validate(){
                const userId = this.$route.params.userId;
                if(userId){
                    const response = await this.$store.dispatch('profile/get', userId);
                    if(response.status){
                        this.userProfile = response.data;
                        if(!this.userProfile.data.isActive && this.userProfile.data.purgeCount <= 3){
                            // eslint-disable-next-line no-empty
                            try{await firebase.auth().signOut()}catch (e) {}
                            return this.purged = true
                        }else
                        if(!this.userProfile.data.isActive && this.userProfile.data.purgeCount > 3){
                            // eslint-disable-next-line no-empty
                            try{await firebase.auth().signOut()}catch (e) {}
                            return this.deactivated = true
                        }
                    }
                }
                return this.toHome()
            }
        },
        mounted() {
            $('#main-wrapper').css('opacity', 1);
            setTimeout(()=>{
                $('#preloader').fadeOut('slow');
            }, 1000)
            $('head').append([
                "<link class='dash_custom_imports' rel='stylesheet' href='assets/dashboard/css/style.css'/>"
            ]);
            $('body').append(
                [
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/global/global.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/vendor/bootstrap-select/dist/js/bootstrap-select.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/js/custom.min.js'/>",
                    "<script class='dash_custom_imports' src='assets/dashboard/js/deznav-init.js'/>",
                ]
            )
        },
        beforeRouteEnter(to, from, next){
            next(vm=>{
                if(vm.$store.getters['auth/isSignedIn']){
                    if(vm.$store.getters['profile/getProfile'].data.isActive){
                        return vm.$router.replace({name: 'Dashboard'})
                    }
                }
                return vm.validate()
            })
        },
        beforeRouteLeave(to, from, next){
            $('.dash_custom_imports').remove();
            next()
        }
    }
</script>

<style scoped>
    .error-text{
        line-height: .7;
    }
</style>