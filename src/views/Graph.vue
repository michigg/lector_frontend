<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col sm="12">
                <h1>Graph</h1>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    import NavigationBar from "./NavigationBar";
    export default {
        name: 'home',
        components: {NavigationBar},
        data() {
            return {}
        },
        computed: {},
        methods: {},
        watch: {},
    }
</script>

<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
