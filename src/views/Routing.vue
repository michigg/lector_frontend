<template>
    <div class="h-100">
        <TextualRoute/>
        <div class="map-wrapper">
            <Map/>
        </div>
        <Options/>
    </div>
</template>

<script>
    import Map from '@/components/Map.vue';
    import TextualRoute from '@/components/TextualRoute.vue';
    import Options from '@/components/Options.vue';

    export default {
        name: "routing",
        components: {
            Map,
            TextualRoute,
            Options
        },
        created() {
            const from = [8.676581, 49.418204];
            const to = [8.692803, 49.409465];
            const modus = "foot-walking";
            this.$store
                .dispatch('loadRouting', {from: from, to: to, modus: modus})
                .then();
        },

    }
</script>

<style scoped>
    .map-wrapper {
        height: calc(100% - 38px);
        top: 38px;
    }

</style>