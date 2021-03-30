<template>
    <div class="animated slideInUp">
        <div class="form-head d-flex mb-4 mb-md-5 align-items-start">
            <div class="input-group search-area d-inline-flex">
                <!--                <div class="input-group-append">-->
                <!--                    <span class="input-group-text"><i class="flaticon-381-search-2"></i></span>-->
                <!--                </div>-->
                <!--                <input type="text" class="form-control" placeholder="Search here">-->
            </div>
            <router-link :to="{name: 'NewContribution'}" class="btn btn-primary ml-auto">
                + New Contribution
            </router-link>
        </div>
        <div class="row">
            <div class="col-xl-12 col-lg-12">
                <!--                <div class="alert alert-primary solid alert-right-icon alert-dismissible fade show">-->
                <!--                    <span><i class="mdi mdi-account-search"></i></span>-->
                <!--                    <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span>-->
                <!--                    </button> Success! Message has been sent.-->
                <!--                </div>-->
                <!--                <div class="alert alert-success solid alert-right-icon alert-dismissible fade show">-->
                <!--                    <span><i class="mdi mdi-check"></i></span>-->
                <!--                    <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span>-->
                <!--                    </button> Success! Message has been sent.-->
                <!--                </div>-->
                <!--                <div class="alert alert-warning solid alert-right-icon alert-dismissible fade show">-->
                <!--                    <span><i class="mdi mdi-alert"></i></span>-->
                <!--                    <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span>-->
                <!--                    </button>-->
                <!--                    <strong>Warning!</strong> Something went wrong. Please check.-->
                <!--                </div>-->
                <!--                <div class="alert alert-danger solid alert-right-icon alert-dismissible fade show">-->
                <!--                    <span><i class="mdi mdi-help"></i></span>-->
                <!--                    <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span>-->
                <!--                    </button>-->
                <!--                    <strong>Error!</strong> Message Sending failed.-->
                <!--                </div>-->
                <!--                <div class="alert alert-light solid alert-right-icon alert-dismissible fade show">-->
                <!--                    <span><i class="mdi mdi-cogs"></i></span>-->
                <!--                    <button type="button" class="close h-100" data-dismiss="alert" aria-label="Close"><span><i class="mdi mdi-close"></i></span>-->
                <!--                    </button>-->
                <!--                    <strong>Error!</strong> Message Sending failed.-->
                <!--                </div>-->
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-xxl-12 col-lg-12">
                <div class="card">
                    <div class="card-header d-block d-sm-flex border-0">
                        <div>
                            <h4 class="fs-20 text-black">Pay to</h4>
                            <p class="mb-0 fs-13">
                                Showing all result
                            </p>
                        </div>
                        <div class="card-action card-tabs mt-3 mt-sm-0">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <router-link :to="{name: 'PaymentTransactions'}" class="nav-link active" role="tab">
                                        Transactions
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body tab-content p-0">
                        <div class="tab-pane active show fade" id="monthly" role="tabpanel">
                            <div class="table-responsive">
                                <table class="table table-responsive-md shadow-hover card-table">
                                    <tbody>
                                    <template v-if="paymentAsDownliner.payment_loading">
                                        <tr>
                                            <td class="text-center" colspan="5">
                                                <h3><i class="flaticon-381-time"></i> Fetching Payments History.</h3>
                                                <p>Please wait...</p>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else-if="paymentAsDownliner.queried_payments.length > 0">
                                        <tr v-for="(payment, index) in paymentAsDownliner.queried_payments" :key="'payment_'+index">
                                            <td>
                                            <span class="p-3 d-inline-block">
                                                <img src="../../assets/images/svg/pay.svg" alt="pay to upliner" style="width: 30px;height:30px">
                                            </span>
                                            </td>
                                            <td>
                                                <div class="font-w600 wspace-no">
                                                <span class="mr-1">
                                                    <i class="flaticon-381-gift"></i>
                                                </span>
                                                    <template v-if="paymentAsDownliner.payment_packages[index]!== undefined">
                                                        <span v-if="paymentAsDownliner.payment_packages[index].data">{{paymentAsDownliner.payment_packages[index].data.name}}</span>
                                                        <span v-else>{{payment.data.packageId}}</span>
                                                    </template>
                                                </div>
                                            </td>
                                            <td class="font-w500">{{getReadableDatetime(payment.data.createdAt)}}</td>
                                            <td class="font-w600 text-center">₦{{payment.data.amount}}</td>
                                            <td>
                                                <h6>
                                                    <span class="pull-right">{{getPaymentProgress(payment)}}%</span>
                                                </h6>
                                                <div class="progress ">
                                                    <div class="progress-bar bg-danger progress-animated"
                                                         style="height:6px;"
                                                         :style="{'width': getPaymentProgress(payment)+'%'}"
                                                         role="progressbar">
                                                        <span class="sr-only">{{getPaymentProgress(payment)}}% Complete</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a
                                                        href="javascript:void(0)"
                                                        data-toggle="modal"
                                                        data-target="#paymentInfo"
                                                        v-if="payment.data.isValid"
                                                        @click.prevent="togglePaymentInfo(payment, paymentAsDownliner.payment_packages[index])"
                                                >
                                                    <i class="flaticon-381-file"></i> (details)
                                                </a>
                                                <a v-else href="javascript:void(0)"
                                                   data-toggle="tooltip"
                                                   data-placement="top"
                                                   title="This payment is no longer valid as you were purged while this payment was not completed"
                                                >
                                                    <i class="ti ti-info-alt"></i>
                                                </a>
                                                <a v-if="payment.data.confirmed" class="btn-link text-success float-right" href="javascript:void(0);">
                                                    <i>Completed</i>
                                                </a>
                                                <a v-else-if="payment.data.reported" class="btn-link text-danger float-right" href="javascript:void(0);">
                                                    <i>Reported</i>
                                                </a>
                                                <a v-else-if="!payment.data.isValid" class="btn-link text-danger float-right" href="javascript:void(0);">
                                                    <i>Invalid</i>
                                                </a>
                                                <a v-else class="btn-link text-warning float-right" href="javascript:void(0);">
                                                    <i>Pending</i>
                                                </a>
                                            </td>
                                            <td v-if="payment.data.isValid&&!payment.data.confirmed&&!payment.data.reported&&getHourDiffFromNow(payment.data.createdAt)>=3">
                                                <button class="btn btn-outline-danger" @click="reportPayment(payment.id)">
                                                    <i class="ti-flag"></i> Report
                                                </button>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td class="text-center" colspan="5">
                                                <h3><i class="flaticon-381-file-1"></i> You have no payment history</h3>
                                                <p>Recent payment transactions will be displayed here</p>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-xxl-12 col-lg-12">
                <div class="card">
                    <div class="card-header d-block d-sm-flex border-0">
                        <div>
                            <h4 class="fs-20 text-black">Receive From</h4>
                            <p class="mb-0 fs-13">
                                Showing all result
                            </p>
                        </div>
                        <div class="card-action card-tabs mt-3 mt-sm-0">
<!--                            <ul class="nav nav-tabs" role="tablist">-->
<!--                                <li class="nav-item">-->
<!--                                    <router-link :to="{name: 'PaymentTransactions'}" class="nav-link active" role="tab">-->
<!--                                        Transactions-->
<!--                                    </router-link>-->
<!--                                </li>-->
<!--                            </ul>-->
                        </div>
                    </div>
                    <div class="card-body tab-content p-0">
                        <div class="tab-pane active show fade" id="asUpliner" role="tabpanel">
                            <div class="table-responsive">
                                <table class="table table-responsive-md shadow-hover card-table">
                                    <tbody>
                                    <template v-if="paymentAsUpliner.payment_loading">
                                        <tr>
                                            <td class="text-center" colspan="5">
                                                <h3><i class="flaticon-381-time"></i> Fetching Payments History.</h3>
                                                <p>Please wait...</p>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else-if="paymentAsUpliner.queried_payments.length > 0">
                                        <tr v-for="(payment, index) in paymentAsUpliner.queried_payments" :key="'payment_upliner_'+index">
                                            <td>
                                            <span class="p-3 d-inline-block">
                                                <img src="../../assets/images/svg/pay.svg" alt="pay to upliner" style="width: 30px;height:30px">
                                            </span>
                                            </td>
                                            <td>
                                                <div class="font-w600 wspace-no">
                                                <span class="mr-1">
                                                    <i class="flaticon-381-gift"></i>
                                                </span>
                                                    <template v-if="paymentAsUpliner.payment_packages[index]!== undefined">
                                                        <span v-if="paymentAsUpliner.payment_packages[index].data">{{paymentAsUpliner.payment_packages[index].data.name}}</span>
                                                        <span v-else>{{payment.data.packageId}}</span>
                                                    </template>
                                                </div>
                                            </td>
                                            <td class="font-w500">{{getReadableDatetime(payment.data.createdAt)}}</td>
                                            <td class="font-w600 text-center">₦{{payment.data.amount}}</td>
                                            <td>
                                                <a
                                                        href="javascript:void(0)"
                                                        data-toggle="modal"
                                                        data-target="#paymentInfoUpliner"
                                                        v-if="payment.data.isValid"
                                                        @click.prevent="togglePaymentInfo(payment, paymentAsUpliner.payment_packages[index])"
                                                >
                                                    <i class="flaticon-381-file"></i> (details)
                                                </a>
                                                <a v-else href="javascript:void(0)"
                                                   data-toggle="tooltip"
                                                   data-placement="top"
                                                   title="This payment is no longer valid as you were purged while this payment was not completed"
                                                >
                                                    <i class="ti ti-info-alt"></i>
                                                </a>
                                                <a v-if="payment.data.confirmed" class="btn-link text-success float-right" href="javascript:void(0);">
                                                    <i>Completed</i>
                                                </a>
                                                <a v-else-if="payment.data.reported" class="btn-link text-danger float-right" href="javascript:void(0);">
                                                    <i>Reported</i>
                                                </a>
                                                <a v-else-if="!payment.data.isValid" class="btn-link text-danger float-right" href="javascript:void(0);">
                                                    <i>Invalid</i>
                                                </a>
                                                <a v-else class="btn-link text-warning float-right" href="javascript:void(0);">
                                                    <i>Pending</i>
                                                </a>
                                            </td>
                                            <td>
                                                <h6>
                                                    <span class="pull-right">{{getPaymentProgress(payment)}}%</span>
                                                </h6>
                                                <div class="progress ">
                                                    <div class="progress-bar bg-danger progress-animated"
                                                         style="height:6px;"
                                                         :style="{'width': getPaymentProgress(payment)+'%'}"
                                                         role="progressbar">
                                                        <span class="sr-only">{{getPaymentProgress(payment)}}% Complete</span>
                                                    </div>
                                                </div>
                                            </td>
<!--                                            <td v-if="payment.data.isValid&&!payment.data.confirmed&&!payment.data.reported&&getHourDiffFromNow(payment.data.createdAt)>=3">-->
<!--                                                <button class="btn btn-outline-danger" @click="reportPayment(payment.id)">-->
<!--                                                    <i class="ti-flag"></i> Report-->
<!--                                                </button>-->
<!--                                            </td>-->
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td class="text-center" colspan="5">
                                                <h3><i class="flaticon-381-file-1"></i> You are not attached to any payment</h3>
                                                <p>Recent payment transactions will be displayed here</p>
                                            </td>
                                        </tr>
                                    </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="user.data.isAdmin">
            <!-- Dashboard Statistics -->
<!--            <div class="col-xl-3 col-lg-6 col-sm-6">-->
<!--                <div class="widget-stat card">-->
<!--                    <div class="card-body p-4">-->
<!--                        <div class="media ai-icon">-->
<!--									<span class="mr-3 bgl-primary text-primary">-->
<!--										<i class="flaticon-381-gift"></i>-->
<!--									</span>-->
<!--                            <div class="media-body">-->
<!--                                <p class="mb-1">Contributions</p>-->
<!--                                <h4 class="mb-0">{{getUserContributions||0}}</h4>-->
<!--                                <span class="badge badge-primary">total</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-xl-3 col-lg-6 col-sm-6">-->
<!--                <div class="widget-stat card">-->
<!--                    <div class="card-body p-4">-->
<!--                        <div class="media ai-icon">-->
<!--									<span class="mr-3 bgl-warning text-warning">-->
<!--										<svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">-->
<!--											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>-->
<!--											<circle cx="12" cy="7" r="4"></circle>-->
<!--										</svg>-->
<!--									</span>-->
<!--                            <div class="media-body">-->
<!--                                <p class="mb-1">Pending Payments</p>-->
<!--                                <h4 class="mb-0">{{getUserPendingPayments||0}}</h4>-->
<!--                                <span class="badge badge-warning">total</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-xl-3 col-lg-6 col-sm-6">-->
<!--                <div class="widget-stat card">-->
<!--                    <div class="card-body p-4">-->
<!--                        <div class="media ai-icon">-->
<!--									<span class="mr-3 bgl-success text-success">-->
<!--										<svg id="icon-revenue" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign">-->
<!--											<line x1="12" y1="1" x2="12" y2="23"></line>-->
<!--											<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>-->
<!--										</svg>-->

<!--									</span>-->
<!--                            <div class="media-body">-->
<!--                                <p class="mb-1">Profits</p>-->
<!--                                <h4 class="mb-0">{{profile.data.profit||0}}</h4>-->
<!--                                <span class="badge badge-success">total</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-xl-3 col-lg-6 col-sm-6">-->
<!--                <div class="widget-stat card">-->
<!--                    <div class="card-body  p-4">-->
<!--                        <div class="media ai-icon">-->
<!--									<span class="mr-3 bgl-danger text-danger">-->
<!--										<i class="flaticon-381-error"></i>-->
<!--									</span>-->
<!--                            <div class="media-body">-->
<!--                                <p class="mb-1">Purged</p>-->
<!--                                <h4 class="mb-0">{{profile.data.purgeCount}}</h4>-->
<!--                                <span class="badge badge-danger">count</span>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <!-- End of Dashboard Statistics -->

            <!-- Admin Dashboard Statistics -->
            <div class="col-12">
                <h4 class="text-uppercase text-primary font-weight-bolder">
                    Platform Statistics
                    <small class="text-muted text-lowercase">
                        (only visible to you)
                    </small>
                </h4>
            </div>
            <div class="col-xl-6 col-lg-6 col-sm-6">
                <div class="widget-stat card bg-danger">
                    <div class="card-body  p-4">
                        <div class="media">
									<span class="mr-3">
										<i class="flaticon-381-user-7"></i>
									</span>
                            <div class="media-body text-white text-right">
                                <p class="mb-1">
                                    Users
                                    <small>
                                        (last updated: {{getReadableDate(getUsersCounter.updatedAt)}})
                                    </small>
                                </p>
                                <h3 class="text-white">{{getUsersCounter.count||0}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-sm-6">
                <div class="widget-stat card bg-success">
                    <div class="card-body p-4">
                        <div class="media">
									<span class="mr-3">
										<i class="flaticon-381-diamond"></i>
									</span>
                            <div class="media-body text-white text-right">
                                <p class="mb-1">
                                    Contributions
                                    <small>
                                        (last updated: {{getReadableDate(getContributionCounter.updatedAt)}})
                                    </small>
                                </p>
                                <h3 class="text-white">{{getContributionCounter.count||0}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-lg-6 col-sm-6"
                 v-for="(package_z, index) in getPackages"
                 :key="'package_'+index"
            >
                <div class="widget-stat card"
                     :class="[
                             index===0?'bg-info': '',
                             index===1?'bg-primary': '',
                             index===2?'bg-dark': '',
                             index > 2?'bg-primary': ''
                         ]"
                >
                    <div class="card-body p-4">
                        <div class="media">
									<span class="mr-3">
										<i class="flaticon-381-gift"></i>
									</span>
                            <div class="media-body text-white text-right">
                                <p class="mb-1">{{package_z.data.name}}</p>
                                <h3 class="text-white">{{package_z.data.totalContributors||0}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of Admin Dashboard Statistics -->
        </div>
        <div class="row">
            <div class="col-12">
                <h4 class="text-uppercase text-primary">
                    Useful Information
                    <small class="text-muted text-lowercase">
                        (Making &amp; Receiving Payments)
                    </small>
                </h4>
            </div>
            <div class="col-12">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_1.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_2.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_3.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_4.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_5.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_6.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_7.png" alt="navigation">
            </div>
            <div class="col-12 mt-5">
                <img class="img-fluid" src="../../assets/images/siteNavigation/Ziliring_Navigation_8.png" alt="navigation">
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";
    import Payment from "../../models/payment";
    import {mapGetters} from 'vuex'

    export default {
        name: "dashboard",
        data(){
            return {
                paymentAsDownliner: {
                    payment_loading: false,
                    queried_payments: [],
                    payments_contribs: [],
                    payment_packages: [],
                    payments_receiver_profiles: []
                },
                paymentAsUpliner: {
                    payment_loading: false,
                    queried_payments: [],
                    payments_contribs: [],
                    payment_packages: [],
                    payments_receiver_profiles: []
                },
            }
        },
        mixins: [basicMethodMixins],
        computed: {
            ...mapGetters({
                user: 'user/getUser',
                profile: 'profile/getProfile'
            }),
            ...mapGetters('counters', [
                'getPackages',
                'getContributionCounter',
                'getUsersCounter',
                'getUserContributions',
                'getUserPendingPayments'
            ])
        },
        methods: {
            async queryPayments(){
                this.paymentAsDownliner.payment_loading = true;
                this.paymentAsDownliner.queried_payments = (await this.$store.dispatch('payment/queryPendingAsDownliner')).data.result;
                const contribPromises = this.paymentAsDownliner.queried_payments.map(payment=>this.$store.dispatch('contribution/get', payment.data.contribId));
                const contribs = await Promise.all(contribPromises);
                if(contribs.length > 0){
                    this.paymentAsDownliner.payments_contribs = contribs.map(contrib=>contrib.data);
                    const tmp_packages_promises = this.paymentAsDownliner.payments_contribs.map(contrib=>{
                        let packageId = '';
                        if(contrib.data) packageId = contrib.data.packageId;
                        return this.$store.dispatch('package/get', packageId)
                    });
                    const tmp_packages = await Promise.all(tmp_packages_promises);
                    this.paymentAsDownliner.payment_packages = tmp_packages.map(package_z=>package_z.data)
                }
                this.paymentAsDownliner.payment_loading = false;
            },
            async queryPaymentsAsUpliner(){
                this.paymentAsUpliner.payment_loading = true;
                this.paymentAsUpliner.queried_payments = (await this.$store.dispatch('payment/queryPendingPaymentsAsUpliner')).data.result;
                const contribPromises = this.paymentAsUpliner.queried_payments.map(payment=>this.$store.dispatch('contribution/get', payment.data.contribId));
                const contribs = await Promise.all(contribPromises);
                if(contribs.length > 0){
                    this.paymentAsUpliner.payments_contribs = contribs.map(contrib=>contrib.data);
                    const tmp_packages_promises = this.paymentAsUpliner.payments_contribs.map(contrib=>{
                        let packageId = '';
                        if(contrib.data) packageId = contrib.data.packageId;
                        return this.$store.dispatch('package/get', packageId)
                    });
                    const tmp_packages = await Promise.all(tmp_packages_promises);
                    this.paymentAsUpliner.payment_packages = tmp_packages.map(package_z=>package_z.data)
                }
                this.paymentAsUpliner.payment_loading = false;
            },
            togglePaymentInfo(payment, package_z){
                this.$emit('togglePaymentInfo', {
                    payment,
                    package: package_z
                })
            },
            async reportPayment(id){
                const paymentInstance = new Payment(id);
                paymentInstance
                    .report()
                    .then(()=>{
                        this.$toast.success("Confirmed", "Done");
                        this.queryPayments()
                    }).catch(err=>this.$toast.error(err.message, "Error"))
            }
        },
        mounted(){
            if(this.$store.getters['user/getUser'].data.isAdmin){
                this.$store.dispatch('counters/fetch')
            }
            // this.$store.dispatch('counters/fetchUserStatistics')
            this.queryPayments().then(()=>{
                setTimeout(()=>{
                    $('[data-toggle="tooltip"]').tooltip()
                }, 2000)
            });
            this.queryPaymentsAsUpliner().then(()=>{
                setTimeout(()=>{
                    $('[data-toggle="tooltip"]').tooltip()
                }, 2000)
            })

        }
    }
</script>

<style scoped>

</style>