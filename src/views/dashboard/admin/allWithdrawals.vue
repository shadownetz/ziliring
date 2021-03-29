<template>
    <div class="col-xl-12 col-xxl-12 col-lg-12">
        <div class="card">
            <div class="card-header d-block d-sm-flex border-0">
                <div>
                    <h4 class="fs-20 text-black">All Profit Withdrawals</h4>
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
                                        <img src="../../../assets/images/svg/withdraw.png" alt="withdrawal" style="width: 30px;height:30px">
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

                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item"
                                               href="javascript:void(0)"
                                               data-toggle="modal"
                                               data-target="#requestInfo"
                                               @click="$emit('toggle', request)">
                                                <i class="ti-eye"></i> View
                                            </a>
                                            <a href="javascript:void(0)" class="dropdown-item text-warning"
                                               v-if="request.data.status !== 'pending'"
                                               @click="editStatus(request, 'pending')">
                                                Mark as Pending
                                            </a>
                                            <a href="javascript:void(0)" class="dropdown-item text-success"
                                               v-if="request.data.status !== 'approved'"
                                               @click="editStatus(request, 'approved')">
                                                Mark as Approved
                                            </a>
                                            <a href="javascript:void(0)" class="dropdown-item text-danger"
                                               v-if="request.data.status !== 'invalid'"
                                               @click="editStatus(request, 'invalid')">
                                                Mark as Invalid
                                            </a>
                                        </div>
                                    </div>
                                </td>
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
    import basicMethodMixins from "../../../utils/mixins/basicMethodMixins";
    import {mapGetters} from 'vuex'

    export default {
        name: "allWithdrawals",
        data(){
            return {
                currentPage: 0,
                paginate: ["requests"],
            }
        },
        mixins: [basicMethodMixins],
        computed: {
            ...mapGetters({
                loading: 'request/isLoading',
                requests: 'request/getRequests'
            })
        },
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            editStatus(request, status){
                this.affirm(async ()=>{
                    request.data.status = status
                    const response = await this.$store.dispatch('request/edit', request);
                    if(response.status){
                        this.$toast.success("Operation successful", "Done")
                    }else{
                        this.$toast.error(response.message, "Error")
                    }
                })
            }
        },
        mounted(){
            this.$store.dispatch('request/fetch')
        }
    }
</script>

<style scoped>

</style>