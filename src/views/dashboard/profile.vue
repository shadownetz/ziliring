<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="profile card card-body px-3 pt-3 pb-0">
                    <div class="profile-head">
                        <div class="photo-content">
                            <div class="cover-photo"></div>
                        </div>
                        <div class="profile-info">
                            <div class="profile-photo">
                                <img src="../../assets/images/logo/user.png" class="img-fluid rounded-circle" alt="">
                            </div>
                            <div class="profile-details">
                                <div class="profile-name px-3 pt-2">
                                    <h4 class="text-primary mb-0">
                                        {{user.data.firstName}} {{user.data.lastName}}
                                    </h4>
                                    <p>{{user.data.isAdmin?'Admin':'Contributor'}}</p>
                                </div>
                                <div class="profile-email px-2 pt-2">
                                    <h4 class="text-muted mb-0">{{user.data.email}}</h4>
                                    <p>Email</p>
                                </div>
                                <div class="profile-email px-2 pt-2">
                                    <h4 class="text-muted mb-0">{{user.data.phone}}</h4>
                                    <p>Phone</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-body">
                        <div class="profile-statistics mb-5">
                            <div class="text-center">
                                <div class="row">
                                    <div class="col">
                                        <h3 class="m-b-0">₦{{profile.data.balance||0}}</h3><span>Balance</span>
                                    </div>
                                    <div class="col">
                                        <h3 class="m-b-0">₦{{profile.data.profit||0}}</h3><span>Profit</span>
                                    </div>
                                    <div class="col">
                                        <h3 class="m-b-0">{{profile.data.purgeCount||0}}</h3><span>Purged</span>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <a href="javascript:void(0)" class="btn btn-primary mb-1 mr-1">Withdraw Balance</a>
                                    <a href="javascript:void(0)" class="btn btn-primary mb-1">Withdraw Profit</a>
                                </div>
                            </div>
                        </div>
                        <div class="profile-blog mb-5">
                            <h5 class="text-primary d-inline">Financial Information</h5>
<!--                            <a href="javascript:void(0)" class="pull-right f-s-16">Information</a>-->
                            <h5 class="mt-3">Account Name</h5>
                            <p class="mb-0">
                                {{profile.data.bankAccountName||'No Account Name'}}
                            </p>
                            <h5 class="mt-2">Account Number</h5>
                            <p class="mb-0">
                                {{profile.data.bankAccountNumber||'No Account Number'}}
                            </p>
                            <h5 class="mt-2">Bank Name</h5>
                            <p class="mb-0">
                                {{profile.data.bankName||'No Bank Name'}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="card">
                    <div class="card-body">
                        <h4>Statistics</h4>
                        <div class="col-12 text-center" style="margin-top: 40px">
                            <h5><i>Buffering...</i></h5>
                            <p>please check back later</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "profile",
        data(){
            return {

            }
        },
        computed: {
            ...mapGetters({
                user: 'user/getUser',
                profile: 'profile/getProfile'
            })
        }
    }
</script>

<style scoped>

</style>