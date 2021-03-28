<template>
    <div class="col-xl-12 col-xxl-12 col-lg-12">
        <div class="card">
            <div class="card-header d-block d-sm-flex border-0">
                <div>
                    <h4 class="fs-20 text-black">Withdrawals</h4>
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
                        <template v-if="loading">
                            <div class="col-12 text-center">
                                <h3><i class="flaticon-381-time"></i> Fetching Withdrawal History.</h3>
                                <p>Please wait...</p>
                            </div>
                        </template>
                        <paginate
                                name="requests"
                                :list="requests"
                                :per="50"
                                v-else-if="requests.length > 0"
                                tag="table"
                                class="table table-responsive-md shadow-hover card-table"
                        >
                            <tbody>
                            <tr v-for="(request, index) in paginated('requests')" :key="'request_'+index">
                                <td>
                                    <span class="p-3 d-inline-block">
                                        <img src="../../assets/images/svg/withdraw.png" alt="withdrawal" style="width: 30px;height:30px">
                                    </span>
                                </td>
                                <td>{{request.data.context}}</td>
                                <td>
                                    ₦{{request.data.amount}}
                                </td>
                                <td>
                                    <span v-if="request.data.status==='invalid'" class="badge badge-outline-danger">Invalid</span>
                                    <span v-else-if="request.data.status==='approved'" class="badge badge-outline-success">approved</span>
                                    <span v-else class="badge badge-outline-warning">pending</span>
                                </td>
                                <td class="font-w500">{{getReadableDatetime(request.data.createdAt)}}</td>

<!--                                <td class="font-w600 text-center">₦{{request.data.amount}}</td>-->
<!--                                <td colspan="2" class="text-left">-->
<!--                                    <a-->
<!--                                            href="javascript:void(0)"-->
<!--                                            data-toggle="modal"-->
<!--                                            data-target="#paymentInfo"-->
<!--                                            @click.prevent="togglePaymentInfo(request, payment_packages[index])"-->
<!--                                    >-->
<!--                                        <i class="flaticon-381-file"></i>-->
<!--                                    </a>-->
<!--                                    <a href="javascript:void(0)"-->
<!--                                       class="ml-2"-->
<!--                                       data-toggle="tooltip"-->
<!--                                       data-placement="top"-->
<!--                                       v-if="!request.data.isValid"-->
<!--                                       title="This payment is no longer valid as this user purged while this payment was not completed"-->
<!--                                    >-->
<!--                                        <i class="ti ti-info-alt"></i>-->
<!--                                    </a>-->
<!--                                </td>-->
<!--                                <td>-->
<!--                                    <a v-if="request.data.reported" class="btn-link text-danger" href="javascript:void(0);">-->
<!--                                        <i>Reported</i>-->
<!--                                    </a>-->
<!--                                    <a v-else-if="request.data.confirmed" class="btn-link text-success" href="javascript:void(0);">-->
<!--                                        <i>Completed</i>-->
<!--                                    </a>-->
<!--                                    <a v-else-if="!request.data.isValid" class="btn-link text-danger" href="javascript:void(0);">-->
<!--                                        <i>Invalid</i>-->
<!--                                    </a>-->
<!--                                    <a v-else class="btn-link text-warning" href="javascript:void(0);">-->
<!--                                        <i>Pending</i>-->
<!--                                    </a>-->
<!--                                </td>-->
<!--                                <td v-if="request.data.isValid&&!request.data.confirmed&&getHourDiffFromNow(request.data.createdAt)>=3">-->
<!--                                    <button class="btn btn-sm btn-outline-warning" @click="overrideConfirmPayment(request.id)">-->
<!--                                        <i class="ti-flag"></i> Confirm (Override)-->
<!--                                    </button>-->
<!--                                </td>-->
<!--                                <td>-->
<!--                                    <button class="btn btn-sm btn-outline-primary"-->
<!--                                            v-if="request.data.confirmedByAdmin"-->
<!--                                            @click="reassignPaymentReceiver(request)"-->
<!--                                            data-toggle="tooltip"-->
<!--                                            data-placement="top"-->
<!--                                            title="Renable the receiver to be automatched to a new downliner when due. Note:: This option is only enabled if the payment confirmation was overriden by an admin"-->
<!--                                    >-->
<!--                                        <i class="flaticon-381-switch-3"></i> Reassign-->
<!--                                    </button>-->
<!--                                </td>-->
                            </tr>
                            </tbody>
                        </paginate>
                        <template v-else>
                            <div class="col-12 text-center">
                                <h3><i class="flaticon-381-file-1"></i> No withdrawal history</h3>
                                <p>Recent withdrawals will be displayed here</p>
                            </div>
                        </template>
                        <paginate-links
                                for="requests"
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
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";

    export default {
        name: "withdrawals",
        data(){
            return {
                requests: [],
                usersInfo: [],
                profilesInfo: [],
                currentPage: 0,
                paginate: ["requests"],
                loading: false
            }
        },
        mixins: [basicMethodMixins],
        computed: {},
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            async fetchRequests(){
                this.loading = true;
                const response = await this.$store.dispatch('request/queryPersonal');
                if(response.status){
                    this.requests = response.data;
                }
                this.loading = false;
            },
        },
        mounted(){
            this.fetchRequests()
        }
    }
</script>

<style scoped>

</style>