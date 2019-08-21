<template>
    <b-row class="justify-content-center">
        <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-center" v-if="isLoading">
            <loading-animation :text="'Vorlesungsergebnisse Loading...'"/>
        </b-col>
        <b-col xs="12" sm="12" md="8" xl="8" v-else-if="lecturesBefore.length > 0 || lecturesAfter.length > 0">
            <b-row>
                <b-col xs="12" class="mb-4">
                    <button class="btn btn-primary w-100" v-on:click="active = !active">Vorlesungsergebnisse</button>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" sm="12" md="12" lg="12" xl="12">
                    <b-row>
                        <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="mb-4 lecture"
                               v-bind:class="{ active: active}" v-if="lecturesBefore && lecturesBefore.length > 0">
                            <button class="btn btn-primary w-100" v-on:click="hideEarlier = !hideEarlier">
                                Frühere Ergebnisse anzeigen
                            </button>
                        </b-col>
                    </b-row>
                    <lecture-item :active="active && !hideEarlier" :lectures="lecturesBefore"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" sm="12" md="12" lg="12" xl="12">
                    <b-row>
                        <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="mb-4 text-center lecture"
                               v-bind:class="{ active: active}" v-if="lecturesAfter && lecturesAfter.length > 0">
                            <h3>Aktuell Kommende</h3>
                        </b-col>
                    </b-row>
                    <lecture-item :active="active" :lectures="lecturesAfter"/>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>
<script>
    import LectureItem from "./LectureItem";
    import LoadingAnimation from "./LoadingAnimation";

    export default {
        name: 'lecture-results',
        components: {LoadingAnimation, LectureItem},
        props: ["isToken"],
        data() {
            return {
                hideEarlier: true,
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
                // return this.isToken && this.lecturesBefore.length == 0 && this.lecturesAfter.length == 0
                return this.isToken && !this.lecturesLoaded;
            },
        },
    }
</script>
<style scoped>
    .lecture-content {
        -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
    }
</style>