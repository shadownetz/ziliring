<template>
    <div>
        <component
                @toggleContribComponent="toggleComponent($event)"
                @togglePaymentProof="$emit('togglePaymentProof', $event)"
                @toggleVContrib="$emit('toggleVContrib', $event)"
                :is="activeComponent"
                :payload="payload"
        />
    </div>
</template>

<script>
    import activeContributions from "./activeContributions";
    import manageContributions from "./manageContributions";

    export default {
        name: "contribution",
        data(){
          return {
              activeComponent: 'activeContributions',
              payload: {}
          }
        },
        methods: {
          toggleComponent(event){
              this.activeComponent = event.component;
              this.payload = event.payload
          }
        },
        components: {
            activeContributions,
            manageContributions
        }
    }
</script>

<style scoped>

</style>