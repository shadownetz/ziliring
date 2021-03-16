<template>
    <div class="animated slideInUp">
        <div class="form-head d-flex mb-4 mb-md-5 align-items-start">
            <div class="input-group search-area d-inline-flex">
                <div class="input-group-append">
                    <span class="input-group-text"><i class="flaticon-381-search-2"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Search here">
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
            <!-- Dashboard Statistics -->
            <div class="col-xl-3 col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body p-4">
                        <div class="media ai-icon">
									<span class="mr-3 bgl-primary text-primary">
										<i class="flaticon-381-gift"></i>
									</span>
                            <div class="media-body">
                                <p class="mb-1">Subscriptions</p>
                                <h4 class="mb-0">0</h4>
                                <span class="badge badge-primary">total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body p-4">
                        <div class="media ai-icon">
									<span class="mr-3 bgl-warning text-warning">
										<svg id="icon-customers" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
											<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
											<circle cx="12" cy="7" r="4"></circle>
										</svg>
									</span>
                            <div class="media-body">
                                <p class="mb-1">Pending Payments</p>
                                <h4 class="mb-0">0</h4>
                                <span class="badge badge-warning">total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body p-4">
                        <div class="media ai-icon">
									<span class="mr-3 bgl-success text-success">
										<svg id="icon-revenue" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign">
											<line x1="12" y1="1" x2="12" y2="23"></line>
											<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
										</svg>

									</span>
                            <div class="media-body">
                                <p class="mb-1">Profits</p>
                                <h4 class="mb-0">0</h4>
                                <span class="badge badge-success">total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-6 col-sm-6">
                <div class="widget-stat card">
                    <div class="card-body  p-4">
                        <div class="media ai-icon">
									<span class="mr-3 bgl-danger text-danger">
										<i class="flaticon-381-error"></i>
									</span>
                            <div class="media-body">
                                <p class="mb-1">Purged</p>
                                <h4 class="mb-0">0</h4>
                                <span class="badge badge-danger">count</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of Dashboard Statistics -->

            <div class="col-xl-12 col-xxl-12 col-lg-12">
                <div class="card">
                    <div class="card-header d-block d-sm-flex border-0">
                        <div>
                            <h4 class="fs-20 text-black">Pending payments</h4>
                            <p class="mb-0 fs-13">
                                Latest 10 results are displayed
                            </p>
                        </div>
                        <div class="card-action card-tabs mt-3 mt-sm-0">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="javascript:void(0)" role="tab">
                                        All
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body tab-content p-0">
                        <div class="tab-pane active show fade" id="monthly" role="tabpanel">
                            <div class="table-responsive">
                                <table class="table shadow-hover card-table">
                                    <tbody>
                                    <template v-if="payment_loading">
                                        <tr>
                                            <td class="text-center" colspan="5">
                                                <h3><i class="flaticon-381-time"></i> Fetching Payments History.</h3>
                                                <p>Please wait...</p>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else-if="queried_payments.length > 0">
                                        <tr v-for="(payment, index) in queried_payments" :key="'payment_'+index">
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
                                                    <span v-if="payments_contribs[index]!== undefined">
                                                    {{payments_contribs[index].data.packageId}}
                                                </span>
                                                </div>
                                            </td>
                                            <td class="font-w500">{{getReadableDatetime(payment.data.createdAt)}}</td>
                                            <td class="font-w600 text-center">₦{{payment.data.amount}}</td>
                                            <td>
                                                <a href="javascript:void(0)"><i class="flaticon-381-file"></i> (details)</a>
                                                <a v-if="payment.data.reported" class="btn-link text-danger float-right" href="javascript:void(0);">
                                                    <i>Reported</i>
                                                </a>
                                                <a v-else-if="payment.data.confirmed" class="btn-link text-success float-right" href="javascript:void(0);">
                                                    <i>Completed</i>
                                                </a>
                                                <a v-else class="btn-link text-warning float-right" href="javascript:void(0);">
                                                    <i>Pending</i>
                                                </a>
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
    </div>
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";

    export default {
        name: "dashboard",
        data(){
            return {
                payment_loading: false,
                queried_payments: [],
                payments_contribs: [],
                payment_packages: [],
                payments_receiver_profiles: []
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            async queryPayments(){
                this.queried_payments = (await this.$store.dispatch('payment/queryPending')).data.result;
                const contribPromises = this.queried_payments.map(payment=>this.$store.dispatch('contribution/get', payment.data.contribId));
                const contribs = await Promise.all(contribPromises);
                if(contribs.length > 0){
                    this.payments_contribs = contribs.map(contrib=>contrib.data);
                    const tmp_packages_promises = this.payments_contribs.map(contrib=>this.$store.dispatch('package/get', contrib.data.packageId));
                    const tmp_packages = await Promise.all(tmp_packages_promises);
                    tmp_packages.forEach((package_z, index)=>{
                        console.log(package_z)
                        this.payments_contribs[index].data.packageId = package_z.data.data.name
                    })

                    // const tmp_profile_promises = this.queried_payments.map(payment=>this.$store.dispatch('profile/get', payment.data.receiverId));
                    // const tmp_profiles = await Promise.all(tmp_profile_promises);
                    // if(tmp_profiles.length > 0){
                    //     this.payments_receiver_profiles = tmp_profiles.map(profile=>profile.data)
                    // }
                }
            }
        },
        mounted(){
            this.queryPayments()
        }
    }
</script>

<style scoped>

</style>