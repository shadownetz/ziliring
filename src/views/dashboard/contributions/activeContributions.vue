<template>
    <div class="row animated slideInUp">
        <div class="col-lg-12 dataTables_wrapper">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Contributions</h4>
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
                                <th><strong>Status</strong></th>
                                <th><strong>Created</strong></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(contrib, index) in contributions" :key="'contrib_'+index">
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
                                <td>
                                    <span v-if="contrib.data.hasPaid" class="badge light badge-success">Completed</span>
                                    <span v-else class="badge light badge-info">in progress</span>
                                </td>
                                <td>
                                    {{getReadableDatetime(contrib.data.createdAt)}}
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
                                            <a href="javascript:void(0)" class="dropdown-item" @click="switchToManageComponent(contrib.id)">
                                                <i class="ti-menu-alt"></i> Manage
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </paginate>
                        <div class="col-12 text-center" v-else>
                            <h3><i class="flaticon-381-gift"></i> You have not made any contribution yet</h3>
                            <p>Initiate a contribution and it will show up here</p>
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
    import {mapGetters} from 'vuex'
    import basicMethodMixins from "../../../utils/mixins/basicMethodMixins";

    export default {
        name: "ManageContributions",
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
                contributions: 'getPersonalContrib'
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
                    this.packageInfo = results.map(result=>result.status?result.data:undefined)
                }else{
                    this.checkInterval = setInterval(()=>{
                        this.fetchMetaInfo()
                    }, 2000)
                }
            }
        },
        components: {

        },
        mounted() {
            this.$store.dispatch('contribution/queryPersonal')
                .then(()=>{
                    this.fetchMetaInfo()
                })
        }
    }
</script>

<style scoped>

</style>