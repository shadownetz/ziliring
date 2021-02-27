<template>
    <div class="animated slideInUp">
        <div class="form-head d-flex mb-4 mb-md-5 align-items-start">
            <div class="input-group search-area d-inline-flex">
                <div class="input-group-append">
                    <span class="input-group-text"><i class="flaticon-381-search-2"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Search here">
            </div>
            <a href="javascript:void(0);" class="btn btn-primary ml-auto">+ New Contribution</a>
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
                            <h4 class="fs-20 text-black">Recent Contributions</h4>
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
                                    <tr>
                                        <td>
														<span class="bgl-success p-3 d-inline-block">
															<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M23.6186 15.7207L23.6186 15.7207L23.6353 22.6289C23.6354 22.6328 23.6354 22.6363 23.6353 22.6396M23.6186 15.7207L23.1353 22.6341L23.6353 22.635C23.6353 22.6481 23.6347 22.6583 23.6345 22.6627L23.6344 22.6642C23.6346 22.6609 23.6351 22.652 23.6353 22.6407C23.6353 22.6403 23.6353 22.64 23.6353 22.6396M23.6186 15.7207C23.6167 14.9268 22.9717 14.2847 22.1777 14.2866C21.3838 14.2885 20.7417 14.9336 20.7436 15.7275L20.7436 15.7275L20.7519 19.1563M23.6186 15.7207L20.7519 19.1563M23.6353 22.6396C23.6329 23.4282 22.9931 24.0705 22.2017 24.0726C22.2 24.0726 22.1983 24.0727 22.1965 24.0727L22.1944 24.0727L22.1773 24.0726L15.2834 24.056L15.2846 23.556L15.2834 24.056C14.4897 24.054 13.8474 23.4091 13.8494 22.615C13.8513 21.8211 14.4964 21.179 15.2903 21.1809L15.2903 21.1809L18.719 21.1892L5.53639 8.0066C4.975 7.44521 4.975 6.53505 5.53639 5.97367C6.09778 5.41228 7.00793 5.41228 7.56932 5.97367L20.7519 19.1563M23.6353 22.6396C23.6353 22.6376 23.6353 22.6356 23.6353 22.6336L20.7519 19.1563M22.1964 24.0726C22.1957 24.0726 22.1951 24.0726 22.1944 24.0726L22.1964 24.0726Z" fill="#2BC155" stroke="#2BC155"/>
															</svg>
														</span>
                                        </td>
                                        <td>
                                            <div class="font-w600 wspace-no">
															<span class="mr-1">
																<i class="flaticon-381-gift"></i>
															</span>
                                                Steel
                                            </div>
                                        </td>
                                        <td class="font-w500">06:24:45 AM</td>
                                        <td class="font-w600 text-center">₦5,553</td>
                                        <td><a class="btn-link text-success float-right" href="javascript:void(0);">Completed</a></td>
                                    </tr>
                                    <tr>
                                        <td>
														<span class="bgl-danger p-3 d-inline-block">
														<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z" fill="#FF2E2E" stroke="#FF2E2E"/>
														</svg>
														</span>
                                        </td>
                                        <td>
                                            <div class="font-w600  wspace-no">
															<span class="mr-1">
																<i class="flaticon-381-gift"></i>
															</span>
                                                Bronze
                                            </div>
                                        </td>
                                        <td class="font-w500">06:24:45 AM</td>
                                        <td class="font-w600 text-center">₦542</td>
                                        <td>
                                            <a class="btn-link text-dark float-right" href="javascript:void(0);">Pending</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
														<span class="bgl-danger p-3 d-inline-block ">
															<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M5.13185 13.9043L5.13185 13.9043L5.11515 6.99607C5.11511 6.99224 5.11513 6.98868 5.11517 6.98542M5.13185 13.9043L5.61517 6.99089L5.11517 6.99005C5.11519 6.97692 5.11575 6.96665 5.116 6.96234L5.11608 6.96082C5.11588 6.96411 5.11535 6.97298 5.11519 6.98431C5.11518 6.98468 5.11517 6.98505 5.11517 6.98542M5.13185 13.9043C5.13378 14.6982 5.77881 15.3403 6.57281 15.3384C7.36672 15.3365 8.00877 14.6914 8.00689 13.8975L8.00689 13.8975L7.99856 10.4687M5.13185 13.9043L7.99856 10.4687M5.11517 6.98542C5.11755 6.19684 5.75739 5.55451 6.54875 5.55238C6.55044 5.55236 6.5522 5.55235 6.554 5.55234L6.55606 5.55234L6.57321 5.55239L13.4671 5.56905L13.4658 6.06905L13.4671 5.56905C14.2608 5.57098 14.903 6.21593 14.9011 7.01004C14.8992 7.80394 14.2541 8.44597 13.4602 8.44409L13.4602 8.4441L10.0315 8.43582L23.2141 21.6184C23.7755 22.1798 23.7755 23.0899 23.2141 23.6513C22.6527 24.2127 21.7426 24.2127 21.1812 23.6513L7.99856 10.4687M5.11517 6.98542C5.11516 6.98743 5.11517 6.98943 5.11517 6.99144L7.99856 10.4687M6.5541 5.55237C6.55474 5.55237 6.5554 5.55237 6.55606 5.55238L6.5541 5.55237Z" fill="#FF2E2E" stroke="#FF2E2E"/>
															</svg>
														</span>
                                        </td>
                                        <td>
                                            <div class="font-w600  wspace-no">
															<span class="mr-1">
																<i class="flaticon-381-gift"></i>
															</span>
                                                Gold
                                            </div>
                                        </td>
                                        <td class="font-w500">06:24:45 AM</td>
                                        <td class="font-w600 text-center">₦912</td>
                                        <td>
                                            <a class="btn-link text-danger float-right" href="javascript:void(0);">Canceled</a>
                                        </td>
                                    </tr>
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
    export default {
        name: "dashboard"
    }
</script>

<style scoped>

</style>