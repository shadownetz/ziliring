<template>
    <div class="col-xl-12 col-xxl-12 col-lg-12">
        <div class="card">
            <div class="card-header d-block d-sm-flex border-0">
                <h4 class="fs-20 text-black">All Time Payments</h4>
                <p class="mb-0 fs-13">
                    Results are paginated
                </p>
                <div class="pull-right">
                    <input type="search"
                           placeholder="search by reference number"
                           class="form-control"
                           v-model="searchQuery"
                           v-if="payments.length > 0"
                    >
                </div>
                <!--                <div class="card-action card-tabs mt-3 mt-sm-0">-->
                <!--                    <ul class="nav nav-tabs" role="tablist">-->
                <!--                        <li class="nav-item">-->
                <!--                            <a class="nav-link active" data-toggle="tab" href="javascript:void(0)" role="tab">-->
                <!--                                All-->
                <!--                            </a>-->
                <!--                        </li>-->
                <!--                    </ul>-->
                <!--                </div>-->
            </div>
            <div class="card-body tab-content p-0">
                <div class="tab-pane active show fade" id="monthly" role="tabpanel">
                    <div class="table-responsive">
                        <template v-if="payment_loading">
                            <div class="col-12 text-center">
                                <h3><i class="flaticon-381-time"></i> Fetching Payments History.</h3>
                                <p>Please wait...</p>
                            </div>
                        </template>
                        <paginate
                                name="payments"
                                :list="payments"
                                :per="20"
                                v-else-if="payments.length > 0"
                                tag="table"
                                class="table table-responsive-md shadow-hover card-table"
                        >
                            <tbody>
                            <tr v-for="(payment, index) in paginated('payments')" :key="'payment_'+index">
                                <td>
                                            <span class="p-3 d-inline-block">
                                                <img src="../../../assets/images/svg/pay.svg" alt="pay to upliner" style="width: 30px;height:30px">
                                            </span>
                                </td>
                                <td>{{payment.id.substr(0,10)}}...</td>
                                <td>
                                    <div class="font-w600 wspace-no">
                                                <span class="mr-1">
                                                    <i class="flaticon-381-gift"></i>
                                                </span>
                                        <template v-if="payment_packages[index]!== undefined">
                                            <span v-if="payment_packages[index].data">{{payment_packages[index].data.name}}</span>
                                            <span v-else>{{payment.data.packageId}}</span>
                                        </template>
                                    </div>
                                </td>
                                <td class="font-w500">{{getReadableDatetime(payment.data.createdAt)}}</td>
                                <td class="font-w600 text-center">₦{{payment.data.amount}}</td>
                                <td colspan="2" class="text-left">
                                    <a
                                            href="javascript:void(0)"
                                            data-toggle="modal"
                                            data-target="#paymentInfo"
                                            @click.prevent="togglePaymentInfo(payment, payment_packages[index])"
                                    >
                                        <i class="flaticon-381-file"></i>
                                    </a>
                                    <a href="javascript:void(0)"
                                       class="ml-2"
                                       data-toggle="tooltip"
                                       data-placement="top"
                                       v-if="!payment.data.isValid"
                                       title="This payment is no longer valid as this user purged while this payment was not completed"
                                    >
                                        <i class="ti ti-info-alt"></i>
                                    </a>
                                </td>
                                <td>
                                    <a v-if="payment.data.reported" class="btn-link text-danger" href="javascript:void(0);">
                                        <i>Reported</i>
                                    </a>
                                    <a v-else-if="payment.data.confirmed" class="btn-link text-success" href="javascript:void(0);">
                                        <i>Completed</i>
                                    </a>
                                    <a v-else-if="!payment.data.isValid" class="btn-link text-danger" href="javascript:void(0);">
                                        <i>Invalid</i>
                                    </a>
                                    <a v-else class="btn-link text-warning" href="javascript:void(0);">
                                        <i>Pending</i>
                                    </a>
                                </td>
                                <td v-if="payment.data.isValid&&!payment.data.confirmed&&getHourDiffFromNow(payment.data.createdAt)>=3">
                                    <button class="btn btn-sm btn-outline-warning" @click="overrideConfirmPayment(payment.id, payment.data)">
                                        <i class="ti-flag"></i> Confirm (Override)
                                    </button>
                                </td>
                                <td v-if="payment.data.confirmedByAdmin&&!payment.data.reassigned&&payment.data.amount!==2500">
                                    <button class="btn btn-sm btn-outline-primary"
                                            @click="reassignPaymentReceiver(payment)"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Renable the receiver to be automatched to a new downliner when due. Note:: This option is only enabled if the payment confirmation was overriden by an admin"
                                    >
                                        <i class="flaticon-381-switch-3"></i> Reassign
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </paginate>
                        <template v-else>
                            <div class="col-12 text-center">
                                <h3><i class="flaticon-381-file-1"></i> There are no payments history</h3>
                                <p>Recent payment transactions will be displayed here</p>
                            </div>
                        </template>
                        <paginate-links
                                for="payments"
                                :async="true"
                                :limit="2"
                                :show-step-links="true"
                                @change="onPageChange"
                                :hide-single-page="true"
                                :classes="{
                                    'ul': ['dataTables_paginate', 'paging_simple_numbers', 'w-100'],
                                    'li': 'd-inline',
                                    'a': ['paginate_button'],
                                    'li.active > a': 'current',
                                    'ul.paginate-links > li.disabled > a': 'disabled'
                                }"
                        >
                        </paginate-links>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../../utils/mixins/basicMethodMixins";
    import Payment from "../../../models/payment";
    import {mapGetters} from 'vuex'

    export default {
        name: "payments",
        data(){
            return {
                payments_contribs: [],
                payment_packages: [],
                currentPage: 0,
                paginate: ["payments"],
                interval: 0,
                searchQuery: ''
            }
        },
        mixins: [basicMethodMixins],
        computed: {
            ...mapGetters({
                payment_loading: 'payment/isLoading',
            }),
            payments(){
                return this.$store.getters['payment/getPayments']
                    .filter(payment=>{
                        return payment.id.match(this.searchQuery)
                    })
            }
        },
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            async queryPayments(){
                if(this.payments.length > 0){
                    clearInterval(this.interval);
                    const contribPromises = this.payments.map(payment=>this.$store.dispatch('contribution/get', payment.data.contribId));
                    const contribs = await Promise.all(contribPromises);
                    if(contribs.length > 0){
                        this.payments_contribs = contribs.map(contrib=>contrib.data);
                        const tmp_packages_promises = this.payments_contribs.map(contrib=>{
                            let packageId = '';
                            if(contrib.data) packageId = contrib.data.packageId;
                            return this.$store.dispatch('package/get', packageId)
                        });
                        const tmp_packages = await Promise.all(tmp_packages_promises);
                        this.payment_packages = tmp_packages.map(package_z=>package_z.data)
                    }
                    setTimeout(()=>{
                        $('[data-toggle="tooltip"]').tooltip()
                    }, 2000)
                }else{
                    this.interval = setInterval(()=>{
                        this.queryPayments()
                    }, 2000)
                }
            },
            togglePaymentInfo(payment, package_z){
                this.$emit('togglePaymentInfo', {
                    payment,
                    package: package_z
                })
            },
            overrideConfirmPayment(id, data){
                this.affirm(async ()=>{
                    const paymentInstance = new Payment(id, data);
                    let response = await paymentInstance.confirm(true);
                    if(response.status){
                        this.$toast.success("Confirmed", "Done");
                    }else{
                        this.$toast.error(response.message, "Error")
                    }
                })
            },
            async reassignPaymentReceiver(payment){
                this.affirm(async ()=>{
                    const paymentIns = new Payment(payment.id, payment.data);
                    const response = await paymentIns.reassignReceiver();
                    if(response.status){
                        this.$toast.success('The receiver will be auto matched to a new downliner when due', 'Success');
                    }else{
                        this.$toast.error(response.message, "Unable to reassign receiver")
                    }
                }, "This is an expensive operation! Ensure you know what you are doing.")
            }
        },
        mounted(){
            this.$store.dispatch('payment/fetch').then(()=>{
                this.queryPayments()
            });

        }
    }
</script>

<style scoped>

</style>