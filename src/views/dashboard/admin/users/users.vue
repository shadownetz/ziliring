<template>
    <div class="row animated slideInUp">
        <div class="col-lg-12 dataTables_wrapper">
            <div class="card">
                <div class="card-header">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-md-4">
                                <h4 class="card-title">Users</h4>
                            </div>
                            <div class="col-12 col-md-4">
                                <input type="search"
                                       placeholder="search by contributors name"
                                       class="form-control"
                                       v-model="searchQuery"
                                >
                            </div>
                            <div class="col-12 col-md-4">
                                <button @click.prevent="$emit('switchComponent', {component: 'purgedUsers'})" class="btn btn-sm btn-outline-primary">
                                    <i class="ti-user"></i> Purged
                                </button>
                                <button @click.prevent="$emit('switchComponent', {component: 'reportedUsers'})" class="btn btn-sm btn-outline-danger ml-2">
                                    <i class="fa fa-users"></i> Reported
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="col-12 text-center" v-if="loading">
                            <h3><i class="flaticon-381-user-4"></i> Fetching All Users</h3>
                            <p>Please wait...</p>
                        </div>
                        <paginate
                                name="users"
                                :list="users"
                                :per="50"
                                v-else-if="users.length > 0"
                                tag="table"
                                class="table table-responsive-md"
                        >
                            <thead>
                            <tr>
                                <th class="width80"><strong>#</strong></th>
                                <th>Name</th>
                                <th><strong>Email</strong></th>
                                <th><strong>Phone</strong></th>
                                <th><strong>Position</strong></th>
                                <th><strong>Date Joined</strong></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(user, index) in paginated('users')" :key="'users_'+index">
                                <td>
                                    <span v-if="currentPage === 0"> {{ index + 1 }}</span>
                                    <span v-else> {{ 100 * currentPage + index + 1 }}</span>
                                </td>
                                <td>{{user.data.lastName}} {{user.data.firstName}}</td>
                                <td>{{user.data.email}}</td>
                                <td>{{user.data.phone}}</td>
                                <td>
                                    <span v-if="user.data.isAdmin" class="badge light badge-success">Admin</span>
                                    <span v-else class="badge light badge-info">Contributor</span>
                                </td>
                                <td>
                                    {{getReadableDate(user.data.createdAt)}}
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
                                               data-target="#userInfo"
                                               @click="$emit('toggle', user)">
                                                <i class="ti-eye"></i> View
                                            </a>
                                            <a href="javascript:void(0)" class="dropdown-item text-danger" @click="purgeUser(user)">
                                                <i class="fa fa-ban"></i> Purge
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </paginate>
                        <div class="col-12 text-center" v-else>
                            <h3><i class="flaticon-381-gift"></i> There are no users on the platform yet</h3>
                            <p>When a user join they will show up here.</p>
                        </div>
                        <paginate-links
                                for="users"
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
    import basicMethodMixins from "../../../../utils/mixins/basicMethodMixins";
    import {mapGetters} from "vuex";
    import Profile from "../../../../models/profile";

    export default {
        name: "users",
        data(){
            return {
                currentPage: 0,
                paginate: ["users"],
                checkInterval: 0,
                searchQuery: ''
            }
        },
        mixins: [basicMethodMixins],
        computed: {
            ...mapGetters({
                loading: 'user/getLoading'
            }),
            users(){
                return this.$store.getters['user/getUsers'].filter(user=>{
                    return (user.data.lastName+' '+user.data.firstName).toLowerCase().match(this.searchQuery.toLowerCase())
                })
            },
        },
        methods: {
            onPageChange: function (toPage) {
                this.currentPage = toPage - 1;
            },
            purgeUser(user){
                return this.affirm(async ()=>{
                    const profile = new Profile({id: user.id});
                    const response = await profile.purge();
                    if(response.status){
                        return this.$toast.warning('This user was purged successfully', "Done")
                    }
                    return this.$toast.error(response.message, "Error")
                })
            }
        },
        mounted() {
            this.$store.dispatch('user/fetch')
        }
    }
</script>

<style scoped>

</style>