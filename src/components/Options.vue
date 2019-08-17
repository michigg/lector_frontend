<template>
    <div class="options-wrapper bg-light">
        <button  class="btn btn-link" v-on:click="openVGN">VGN Verbindungen</button>
        <!--        <p v-else>Hier könnte Ihre Busverbindung stehen!</p>-->
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
            userPosition() {
                return this.$store.getters.getUserPosition
            },
        },
        methods: {
            openVGN() {
                var newWindow = window.open("/wait");
                const user_position = this.$store.getters.getUserPosition;
                const url = "" + process.env.VUE_APP_LECTOR_DOMAIN + "/api/v1/vgn/?from_lon="
                    .concat(user_position[1])
                    .concat("&from_lat=").concat(user_position[0])
                    .concat("&building_key=").concat(this.$store.getters.getRoom.building_key);
                window.axios.get(url)
                    .then(response => {
                        console.log(response);
                        newWindow.location = response.data.url;
                        newWindow.focus()
                        // this.vgnLink = response.data.url
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        },
    }
</script>

<style>
    .options-wrapper {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 80%;
        z-index: 500;
        height: 40px;
    }

    .options-wrapper a, .options-wrapper p {
        position: relative;
        top: 8px;
    }

</style>