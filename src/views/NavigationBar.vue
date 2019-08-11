<template>
    <div>
        <b-nav>
            <b-nav-item active>
                <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link to="/graph">Graph</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link to="/open-spaces">Open Spaces</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link to="/infos">Infos</router-link>
            </b-nav-item>
        </b-nav>
    </div>
</template>
<script>
    export default {
        name: 'navigation-bar',
    }
</script>
