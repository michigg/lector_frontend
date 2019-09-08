<template>
    <div class="h-100">
        <TextualRoute/>
        <div class="map-wrapper h-100">
            <Map/>
        </div>
        <Options/>
    </div>
</template>

<script>
    import Map from '@/components/routing/Map.vue';
    import TextualRoute from '@/components/routing/TextualRoute.vue';
    import Options from '@/components/routing/Options.vue';

    export default {
        name: "routing",
        components: {
            Map,
            TextualRoute,
            Options
        },
        created() {
            this.$store
                .dispatch('loadRouting')
                .then();
        },

    }
</script>

<style scoped>
    .container-fluid {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
</style>