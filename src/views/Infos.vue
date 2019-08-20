<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col sm="12">
                <h1>Informationen</h1>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";

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

