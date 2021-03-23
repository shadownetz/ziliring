<template>
    <div class="col-xl-12 col-xxl-12 col-lg-12">
        <div class="card">
            <div class="card-header d-block d-sm-flex border-0">
                <div>
                    <h4 class="fs-20 text-black">Transaction History</h4>
                    <p class="mb-0 fs-13">
                        Results are paginated
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
                        <table class="table table-responsive-md shadow-hover card-table">
                            <tbody>
                            <template v-if="payment_loading">
                                <tr>
                                    <td class="text-center" colspan="5">
                                        <h3><i class="flaticon-381-time"></i> Fetching Payments History.</h3>
                                        <p>Please wait...</p>
                                    </td>
                                </tr>
                            </template>
                            <template v-else-if="payments.length > 0">
                                <tr v-for="(payment, index) in payments" :key="'payment_'+index">
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
                                            <template v-if="payment_packages[index]!== undefined">
                                                <span v-if="payment_packages[index].data">{{payment_packages[index].data.name}}</span>
                                                <span v-else>{{payment.data.packageId}}</span>
                                            </template>
                                        </div>
                                    </td>
                                    <td class="font-w500">{{getReadableDatetime(payment.data.createdAt)}}</td>
                                    <td class="font-w600 text-center">₦{{payment.data.amount}}</td>
                                    <td class="text-center">
                                        <a
                                                href="javascript:void(0)"
                                                data-toggle="modal"
                                                data-target="#paymentInfo"
                                                v-if="payment.data.isValid"
                                                @click.prevent="togglePaymentInfo(payment, payment_packages[index])"
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
</template>

<script>
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";
    import Payment from "../../models/payment";

    export default {
        name: "paymentsHistory",
        data(){
            return {
                payment_loading: false,
                payments: [],
                payments_contribs: [],
                payment_packages: [],
            }
        },
        mixins: [basicMethodMixins],
        methods: {
            async queryPayments(){
                this.payment_loading = true;
                this.payments = (await this.$store.dispatch('payment/queryAll')).data.result;
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
                this.payment_loading = false
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
            this.queryPayments().then(()=>{
                setTimeout(()=>{
                    $('[data-toggle="tooltip"]').tooltip()
                }, 2000)
            });

        }
    }
</script>

<style scoped>

</style>