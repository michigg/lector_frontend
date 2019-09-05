<template>
    <b-row class="justify-content-center">
        <b-col cols="12" v-if="isLoading">
            <loading-animation :text="'Vorlesungsergebnisse Loading...'"/>
        </b-col>
        <b-col cols="12" v-else-if="lecturesBefore.length > 0 || lecturesAfter.length > 0">
            <button class="btn btn-primary w-100 mb-2" v-on:click="active = !active">Vorlesungsergebnisse <span
                    class="float-right"><font-awesome-icon
                    icon="arrow-up" v-bind:class="{ 'fa-flip-vertical': !active  }"></font-awesome-icon></span></button>
            <b-row>
                <b-col cols="12">
                    <button class="btn btn-primary w-100 before-btn mb-2"
                            v-on:click="earlierActive = !earlierActive"
                            v-bind:class="{ active: active}"
                            v-if="lecturesBefore && lecturesBefore.length > 0"
                    >
                        Frühere Ergebnisse anzeigen <span class="float-right"><font-awesome-icon
                            icon="arrow-up"
                            v-bind:class="{ 'fa-flip-vertical': !earlierActive  }"></font-awesome-icon></span>
                    </button>
                    <lecture-item :active="active && earlierActive" :lectures="lecturesBefore"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" sm="12" md="12" lg="12" xl="12">
                    <h3 class="lecture-headline mb-3"
                        v-bind:class="{active: active}"
                        v-if="lecturesAfter && lecturesAfter.length > 0"
                    >Aktuell Kommende</h3>
                    <lecture-item :active="active" :lectures="lecturesAfter"/>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>
<script>
    import LectureItem from "./LectureItem";
    import LoadingAnimation from "../../utils/LoadingAnimation";

    export default {
        name: 'lecture-results',
        components: {LoadingAnimation, LectureItem},
        props: ["token"],
        data() {
            return {
                earlierActive: false,
                active: true,
            }
        },
        computed: {
            lecturesBefore() {
                return this.$store.getters.getLecturesBefore
            },
            lecturesAfter() {
                return this.$store.getters.getLecturesAfter

            },
            lecturesLoaded() {
                return this.$store.getters.areLecturesLoaded
            },
            isLoading() {
                return this.token && !this.lecturesLoaded;
            },
            selected() {
                return this.$store.getters.getDestinationRoomName
            }
        }, watch: {
            selected(){
                console.log("Active false");
                this.active = false;
                this.earlierActive = false;
            },
        }
    }
</script>
<style scoped>
    .lecture-content {
        -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
    }

    .before-btn, .lecture-headline {
        display: none;
    }

    .before-btn.active, .lecture-headline.active {
        display: block;
    }

</style>