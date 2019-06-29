<template>
    <div id="app" style="height: 100%;">
        <b-nav id="nav">
            <b-nav-item active>
                <router-link to="/">Home</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link to="/routing">Routing</router-link>
            </b-nav-item>
            <b-nav-item>
                <router-link to="/about">About</router-link>
            </b-nav-item>
        </b-nav>
        <b-container-fluid class="home">
            <router-view/>
        </b-container-fluid>
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

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    html, body, #app, .home{
        height: 100%;
        margin: 0;
    }

</style>
