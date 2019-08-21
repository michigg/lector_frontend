<template>
    <div class="options-wrapper bg-white">
        <b-button id="popover-options" v-on:click="isActive = !isActive" squared variant="outline-secondary"
                  class="options-btn bg-light">Options
        </b-button>
        <div v-bind:class="{ active: isActive }" class="options-popover bg-light">
            <button class="btn btn-link" v-on:click="openVGN">VGN Verbindungen</button>
            <p>
                <router-link :to="{ name: 'StaircaseConfig', params: {staircase: staircase}}">
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
                return this.$store.getters.getToStaircase;
            },
        },
        methods: {
            openVGN() {
                let newWindow = window.open("/wait");
                const user_position = this.$store.getters.getUserPosition;
                const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/vgn/?from_lon="
                    .concat(user_position[1])
                    .concat("&from_lat=").concat(user_position[0])
                    .concat("&building_key=").concat(this.$store.getters.getRoom.building_key);
                window.axios.get(url)
                    .then(response => {
                        newWindow.location = response.data.url;
                        newWindow.focus()
                        // this.vgnLink = response.data.url
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