<template>
    <div class="modal fade" id="editContrib">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" ref="editContrib">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Modify Contribution
                    </h5>
                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row justify-content-center align-content-center">
                            <div class="alert alert-primary">
                                <p>
                                    <strong>This is a delicate operation.</strong>
                                    Ensure you know what you are doing! <br>
                                </p>
                                <p class="mt-3">
                                    <strong>REF: </strong> #{{contribution.id}}
                                </p>
                            </div>
                            <div class="col-12">
                                <label>Expire At</label>
                                <input type="date" class="form-control" v-model="expireAt">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="container-fluid">
                        <div class="row align-content-center justify-content-around">
                            <button type="button" class="btn btn-warning" @click.prevent="save">Save</button>
                            <button type="button" class="btn btn-primary light" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Contribution from "../../models/contribution";
    import basicMethodMixins from "../../utils/mixins/basicMethodMixins";

    export default {
        name: "editContribution",
        data(){
            return {

            }
        },
        mixins: [basicMethodMixins],
        computed: {
            expireAt: {
                get(){
                    return this.getInputDateTime(this.contribution.data.expireAt)
                },
                set: function(newVal){
                    this.contribution.data.expireAt = new Date(newVal)
                }
            }
        },
        props: {
            contribution: {
                type: Object,
                default(){
                    return new Contribution({})
                }
            }
        },
        methods: {
            async save(){
                const loader = this.$loading.show({container: this.$refs.editContrib});
                const response = await this.$store.dispatch('contribution/edit', this.contribution);
                loader.hide();
                if(response.status){
                    $('#editContrib').modal('hide');
                    $('.modal-backdrop').remove()
                    return this.$toast.success("Operation successful", "Done")
                }
                return this.$toast.error(response.message, "Error")
            }
        }
    }
</script>

<style scoped>

</style>