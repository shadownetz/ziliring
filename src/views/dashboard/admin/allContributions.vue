<template>
    <div class="row animated slideInUp">
        <div class="col-lg-12 dataTables_wrapper">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">All Contributions</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <paginate
                                name="contributions"
                                :list="contributions"
                                :per="50"
                                v-if="contributions.length > 0"
                                tag="table"
                                class="table table-responsive-md"
                        >
                            <thead>
                            <tr>
                                <th class="width80"><strong>#</strong></th>
                                <th>Reference</th>
                                <th><strong>Package</strong></th>
                                <th><strong>Amount</strong></th>
                                <th><strong>Payment</strong></th>
                                <th><strong>Progress</strong></th>
                                <th><strong>Created</strong></th>
                                <th><strong>Expire</strong></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(contrib, index) in paginated('contributions')" :key="'contrib_'+index">
                                <td>
                                    <span v-if="currentPage === 0"> {{ index + 1 }}</span>
                                    <span v-else> {{ 100 * currentPage + index + 1 }}</span>
                                    <!--                                    <strong>01</strong>-->
                                </td>
                                <td>{{contrib.id}}</td>
                                <td>
                                    <span v-if="packageInfo[index]!==undefined">{{packageInfo[index].data.name}}</span>
                                    <span v-else>{{contrib.data.packageId}}</span>
                                </td>
                                <td>₦{{contrib.data.amountToBePaid}}</td>
                                <td>
                                    <span v-if="contrib.data.hasPaid" class="badge light badge-success">Confirmed</span>
                                    <span v-else class="badge light badge-warning">awaiting</span>
                                </td>
                                <td v-if="contrib.data.hasPaid">
                                        <h6>
                                            <span class="pull-right">{{getProgress(contrib)}}%</span>
                                        </h6>
                                        <div class="progress ">
                                            <div class="progress-bar bg-danger progress-animated"
                                                 style="height:6px;"
                                                 :style="{'width': getProgress(contrib)+'%'}"
                                                 role="progressbar">
                                                <span class="sr-only">{{getProgress(contrib)}}% Complete</span>
                                            </div>
                                        </div>
                                </td>
                                <td v-else>
                                    <span class="badge light badge-outline-primary">awaiting payment</span>
                                </td>
                                <td>
                                    {{getReadableDate(contrib.data.createdAt)}}
                                </td>
                                <td>
                                    {{getReadableDate(contrib.data.expireAt)}}
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item"
                                               href="javascript:void(0)"
                                               data-toggle="modal"
                                               data-target="#personalContrib"
                                               @click="$emit('toggleVContrib', contrib)">
                                                <i class="ti-eye"></i> View
                                            </a>
                                            <a href="javascript:void(0)" class="dropdown-item"
                                               data-toggle="modal"
                                               data-target="#editContrib"
                                               @click="$emit('toggle', contrib)">
                                                <i class="ti-pencil"></i> Modify
                                            </a>
                                            <a href="javascript:void(0)" class="dropdown-item"
                                               data-toggle="tooltip"
                                               data-placement="top"
                                               title="Manually complete a payment due to platform edge case (only applies to the 5k package)"
                                               v-if="contrib.data.amountToBePaid===5000&contrib.data.hasPaid"
                                               @click="completePackagePayment(contrib, 2500)">
                                                <i class="ti-money"></i> Complete Payment
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </paginate>
                        <div class="col-12 text-center" v-else>
                            <h3><i class="flaticon-381-gift"></i> No contribution have been made yet.</h3>
                            <p>When a contributor initiates a contribution, it will show up here</p>
                        </div>
                        <paginate-links
                                for="contributions"
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
    import {mapGetters} from "vuex";
    import Payment from "../../../models/payment";

    export default {
        name: "allContributions",
        data(){
            return {
                currentPage: 0,
                paginate: ["contributions"],
                packageInfo: [],
                checkInterval: 0
            }
        },
        mixins: [basicMethodMixins],
        computed: {
            ...mapGetters('contribution', {
                contributions: 'getContributions'
            })
        },
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            switchToManageComponent(id){
                this.$emit('toggleContribComponent', {
                    payload: {id},
                    component: 'manageContributions'
                })
            },
            async fetchMetaInfo(){
                if(this.contributions.length > 0){
                    clearInterval(this.checkInterval);
                    const packagePromises = this.contributions.map(contrib=>this.$store.dispatch('package/get', contrib.data.packageId));
                    const results = await Promise.all(packagePromises);
                    this.packageInfo = results.map(result=>result.status?result.data:undefined);
                    setTimeout(()=>{
                        $('[data-toggle="tooltip"]').tooltip()
                    }, 2000)
                }else{
                    this.checkInterval = setInterval(()=>{
                        this.fetchMetaInfo()
                    }, 2000)
                }
            },
            getProgress(contrib){
                return Math.floor(
                    contrib.data.isComplete?100:(this.getDaysDiffFromNow(contrib.data.beginAt)/7)*100
                )
            },
            completePackagePayment(contrib, amount){
                this.affirm(async()=>{
                    let response = await this.$store.dispatch('payment/get', contrib.data.paymentId)
                    if(response.status){
                        const _payment = new Payment(response.data.id, response.data.data);
                        response = await _payment.completePayment(amount);
                        if(response.status){
                            this.$toast.success("Operation successful")
                        }else{
                            this.$toast.error(response.message, "Error")
                        }
                    }else{
                        this.$toast.error(response.message, "Error")
                    }

                }, `This contribution is at ${this.getProgress(contrib)}%. Do you still wish to continue?`)
            }
        },
        mounted() {
            this.$store.dispatch('contribution/fetch')
                .then(()=>{
                    this.fetchMetaInfo()
                })
        }
    }
</script>

<style scoped>

</style>