<template>
    <div>
        <b-navbar variant="faded" type="light">
            <b-navbar-brand tag="h1" class="mb-0" to="/">
                <span class="h3"><font-awesome-icon icon="route" flip="horizontal"></font-awesome-icon></span>ector
            </b-navbar-brand>
            <b-navbar-nav v-if="!routeBackLink">
                <b-nav-item to="/open-spaces">Freiflächen</b-nav-item>
                <b-nav-item to="/buildings">Gebäude</b-nav-item>
                <b-nav-item :href="this.ghRouterUrl">Routing Server</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item to="/routing">Route</b-nav-item>
                <b-nav-item to="/route/building">Gebäude</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>
<script>
    export default {
        name: 'navigation-bar',
        props: {
            routeBackLink: null,
        },
        computed: {
            ghRouterUrl() {
                return process.env.VUE_APP_GH_DOMAIN
            },
        },
    }
</script>