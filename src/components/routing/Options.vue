<template>
    <div class="options-wrapper bg-white">
        <b-button id="popover-options" v-on:click="isActive = !isActive" squared variant="outline-primary"
                  class="options-btn bg-white">Options
        </b-button>
        <div v-bind:class="{ active: isActive }" class="options-popover bg-white">
            <button class="btn btn-link" v-on:click="openVGN">VGN Verbindungen</button>
            <p>
                <router-link :to="{ name: 'StaircaseConfig', params: {staircase: staircase, standalone: true}}">
                    Ziel Informationen
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Options",
        data() {
            return {
                isActive: false,
            }
        },
        computed: {
            center() {
                return this.$store.getters.getUserPosition;
            },
            staircase() {
                return this.$store.getters.getDestinationStaircase;
            },
        },
        methods: {
            openVGN() {
                let newWindow = window.open("/wait");
                const user_position = this.$store.getters.getUserPosition;
                const toCoord = this.$store.getters.getDestinationCoord;
                const url = "" + process.env.VUE_APP_LECTOR_VGN_API_ENDPOINT + "?from_lon="
                    .concat(user_position[1])
                    .concat("&from_lat=").concat(user_position[0])
                    .concat("&to_lon=").concat(toCoord[1])
                    .concat("&to_lat=").concat(toCoord[0]);
                window.axios.get(url)
                    .then(response => {
                        newWindow.location = response.data.url;
                        newWindow.focus()
                    })
                    .catch();
            }
        },
    }
</script>

<style>
    .options-wrapper {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        z-index: 500;
    }

    .options-btn {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 80%;
        height: 40px;
        z-index: 2000;
    }

    .options-btn:hover, .options-btn:focus {
        color: var(--secondary) !important;
    }

    .options-wrapper .options-popover {
        height: 100px;
        bottom: -100px;
        width: 80%;
        right: 0;
        position: fixed;
        padding: 5px;
        overflow: scroll;
        transition: bottom 0.5s;

    }

    .options-wrapper .options-popover.active {
        bottom: 40px;
        transition: bottom 0.5s;
    }


</style>