<template>
    <div>
        <component :is="activeComponent"/>
    </div>
</template>

<script>
    import selectPackage from "./selectPackage";

    export default {
        name: "contribution",
        data(){
            return {
                activeComponent: 'selectPackage'
            }
        },
        methods: {

        },
        components: {
            selectPackage
        }
    }
</script>

<style scoped>

</style>