<template>
    <b-row class="justify-content-center">
        <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-center" v-if="isLoading">
            <loading-animation :text="'Raumergebnisse Loading...'"></loading-animation>
        </b-col>
        <b-col cols="12" v-else-if="rooms.length != 0">
            <b-row>
                <b-col cols="12" class="mb-4">
                    <button class="btn btn-primary w-100" v-on:click="active = !active">Raumergebnisse <span
                            class="float-right"><font-awesome-icon
                            icon="arrow-up" v-bind:class="{ 'fa-flip-vertical': !active  }"></font-awesome-icon></span>
                    </button>
                </b-col>
            </b-row>
            <rooms :active="active" :rooms="rooms"/>
        </b-col>
    </b-row>
</template>
<script>
    import LoadingAnimation from "./LoadingAnimation"
    import Rooms from "./Rooms";

    export default {
        name: 'room-results',
        components: {Rooms, LoadingAnimation},
        props: ["token"],
        data() {
            return {
                active: true,
            }
        },
        computed: {
            roomsLoaded() {
                return this.$store.getters.areRoomsLoaded
            },
            isLoading() {
                return this.token && !this.roomsLoaded;
            },
            rooms() {
                return this.$store.getters.getRooms
            }, selected() {
                return this.$store.getters.getRouteTo
            }
        }, watch: {
            selected() {
                console.log("Active false");
                this.active = false;
            },
        },
    }
</script>
