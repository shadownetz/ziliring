<template>
    <div class="row animated slideInUp">
        <div class="col-lg-12 dataTables_wrapper">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">
                        <span class="badge badge-rounded badge-outline-dark" @click="$emit('toggleContribComponent', {component: 'activeContributions'})">
                            <i class="ti-arrow-left"></i>
                        </span>
                        Contribution Earnings
                    </h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <template v-if="loading">
                            <div class="col-12 text-center">
                                <h3><i class="flaticon-381-time"></i> Fetching Payments History.</h3>
                                <p>Please wait...</p>
                            </div>
                        </template>
                        <paginate
                                name="payments"
                                :list="payments"
                                :per="100"
                                v-else-if="payments.length > 0"
                                tag="table"
                                class="table table-responsive-md"
                        >
                            <thead>
                            <tr>
                                <th class="width80"><strong>#</strong></th>
                                <th><strong>Reference</strong></th>
                                <th><strong>Amount</strong></th>
                                <th><strong>Status</strong></th>
                                <th><strong>Payment Proofs</strong></th>
                                <th><strong>Created</strong></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(payment, index) in payments" :key="'contrib_'+index">
                                <template v-if="payment.data">
                                    <td>
                                        <span v-if="currentPage === 0"> {{ index + 1 }}</span>
                                        <span v-else> {{ 100 * currentPage + index + 1 }}</span>
                                        <!--                                    <strong>01</strong>-->
                                    </td>
                                    <td>{{payment.id}}</td>
                                    <td>₦{{payment.data.amount}}</td>
                                    <td>
                                        <span v-if="payment.data.reported" class="badge light badge-danger">reported</span>
                                        <span v-else-if="payment.data.confirmed" class="badge light badge-success">confirmed</span>
                                        <span v-else class="badge light badge-warning">awaiting</span>
                                    </td>
                                    <td class="text-center">
                                        <a href="javascript:void(0)"
                                           data-toggle="modal"
                                           data-target="#paymentProofs"
                                           v-if="payment.data.proof.length > 0"
                                           @click="$emit('togglePaymentProof', payment.data.proof)"
                                        >
                                            <i class="flaticon-381-view"></i>
                                        </a>
                                        <p v-else>none</p>
                                    </td>
                                    <td>
                                        {{getReadableDate(payment.data.createdAt)}}
                                    </td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                            </button>
                                            <div class="dropdown-menu text-muted text-center">
                                                <a
                                                        class="dropdown-item text-success"
                                                        href="javascript:void(0)"
                                                        v-if="!payment.data.confirmed"
                                                        @click="confirmPayment(payment.id)"
                                                >
                                                    <i class="ti-check"></i> Confirm
                                                </a>
                                                <small v-else>no further action is needed</small>
                                            </div>
                                        </div>
                                    </td>
                                </template>
                            </tr>
                            </tbody>
                        </paginate>
                        <div class="col-12 text-center" v-else>
                            <h3><i class="flaticon-381-gift"></i> You do not have any active payment yet</h3>
                            <p>Active payments will show up here once you start earning</p>
                        </div>
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
                        <!--                        <div class="dataTables_paginate paging_simple_numbers">-->
                        <!--                            <a class="paginate_button previous disabled" aria-controls="example5" data-dt-idx="0" tabindex="0" id="example5_previous">Previous</a>-->
                        <!--                            <span><a class="paginate_button current" aria-controls="example5" data-dt-idx="1" tabindex="0">1</a><a class="paginate_button" aria-controls="example5" data-dt-idx="2" tabindex="0">2</a></span>-->
                        <!--                            <a class="paginate_button next" aria-controls="example5" data-dt-idx="3" tabindex="0" id="example5_next">Next</a>-->
                        <!--                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import basicMethodMixins from "../../../utils/mixins/basicMethodMixins";
    import Payment from "../../../models/payment";

    export default {
        name: "manageContributions",
        data(){
            return {
                currentPage: 0,
                paginate: ["payments"],
                contributionInfo: {id: '', data: {}},
                payments: [],
                loading: false
            }
        },
        mixins: [basicMethodMixins],
        props: ['payload'],
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            async fetchMetaInfo(){
                this.loading = true;
                let response = await this.$store.dispatch('contribution/get', this.payload.id);
                if(response.status){
                    this.contributionInfo = response.data;
                    const paymentPromises = this.contributionInfo.data.paymentIds.map(id=>this.$store.dispatch('payment/get', id));
                    response = await Promise.all(paymentPromises);
                    if(response.length > 0){
                        this.payments = response.map(response=>response.data)
                    }
                }
                this.loading = false;
            },
            async confirmPayment(id){
                const paymentInstance = new Payment(id);
                paymentInstance
                    .confirm()
                    .then(()=>{
                        this.$toast.success("Confirmed", "Done");
                        this.$emit('toggleContribComponent', {component: 'activeContributions'})
                    }).catch(err=>this.$toast.error(err.message, "Error"))
            }
        },
        mounted() {
            this.fetchMetaInfo();
        }
    }
</script>

<style scoped>

</style>