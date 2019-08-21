<template>
    <div id="app" style="height: 100%;">
        <b-container fluid class="home">
            <router-view/>
        </b-container>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    html, body, #app, .home {
        height: 100%;
        margin: 0;
    }


    .building-key {
        text-transform: uppercase;
    }

    .openspace-name {
        text-transform: capitalize;
    }

</style>
