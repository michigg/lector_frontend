<template>
    <b-row class="align-content-center">
        <b-col sm="12">
            <h1>Einstellungen</h1>
        </b-col>
        <b-col sm="12" class="mb-3 mt-0 pt-0">
            <h2 class="mb-1">Veranstaltung</h2>
            <multiselect
                    v-model="selected"
                    :options="options"
                    placeholder="Select one"
                    label="label"
                    track-by="label"
                    :loading="isLoading"
                    @search-change="get_lectures_by_token"
            ></multiselect>
        </b-col>
        <b-col sm="12" class="mb-4">
            <b-row>
                <b-col v-for="lecture in options" :key="lecture.univis_key" sm="12" class="mb-4">
                    <h3>{{lecture.name}}</h3>
                    <b-row>
                        <b-col v-for="(term, index) in lecture.terms" :key="index" sm="3" class="mb-4">
                            <button class="btn btn-primary" @click="selected = term.room">
                                <h4>Ab {{term.starttime | format_time}}</h4>
                                <p>{{term.room.building_key | do_room_number(term.room.level, term.room.number)}}</p>
                            </button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-col>
        <b-col sm="12" class="mb-4">
            <h2>Fortbewegung</h2>
            <b-button-group class="locomotion-btn-group">
                <b-button
                        squared
                        variant="primary"
                        v-on:click="locomotion = 'foot'"
                        class="locomotion-btn"
                >Zu Fuß
                </b-button>
                <b-button
                        squared
                        variant="info"
                        v-on:click="locomotion = 'bike'"
                        class="locomotion-btn"
                >Fahrrad
                </b-button>
            </b-button-group>
        </b-col>
        <b-col sm="12">
            <h2>Auswahl</h2>
            <p v-if="selected">Raum: {{selected.building_key | do_room_number(selected.level, selected.number)}}</p>
            <p v-else>Veranstaltung: Nothing selected</p>
            <p v-if="locomotion">Fortbewegung: {{locomotion}}</p>
            <p v-else>Fortbewegung: Nothing selected</p>
            <p v-if="to_coord">Fortbewegung: {{to_coord}}</p>
            <p v-else>Fortbewegung: Nothing selected</p>
        </b-col>
        <b-col sm="12">
            <router-link to="/routing" class="btn btn-success">Navigation starten</router-link>
        </b-col>
    </b-row>
</template>

<script>
    // @ is an alias to /src
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'home',
        components: {
            Multiselect
        },
        data() {
            return {
                selected: null,
                locomotion: null,
                isLoading: false,
                currentTimeout: null,
            }
        },
        computed: {
            options() {
                return this.$store.getters.getLectures
            },
            to_coord() {
                return this.$store.getters.getToCoord
            },
        },
        methods: {
            get_lectures_by_token(query) {
                this.isLoading = true;
                clearTimeout(this.currentTimeout);
                this.currentTimeout = setTimeout(() => this.load_lectures(query), 500);
            },
            load_lectures(query) {
                this.$store
                    .dispatch('loadLectures', {token: query})
                    .then(this.stop_loading);
            },
            stop_loading() {
                this.isLoading = false;
            },
            abbort_lecture_load() {
                clearTimeout(this.currentTimeout);
                this.stop_loading();
            },
            get_room_display_name(building_key, level, number) {
                switch (number.toString().length) {
                    case 1:
                        number = '00' + number;
                        break;
                    case 2:
                        number = '0' + number;
                        break;
                    default:
                        break;
                }
                switch (level.toString().length) {
                    case 1:
                        level = '0' + level;
                        break;
                    default:
                        break;
                }
                return building_key + "/" + level + "." + number;
            },
        },
        watch: {
            selected: function () {
                setTimeout(() => this.abbort_lecture_load(), 200);
                this.selected['display'] = this.get_room_display_name(this.selected.building_key, this.selected.level, this.selected.number);
                this.$store
                    .dispatch('loadRoomStaircaseCoord', {'room': this.selected})
                    .then();
            },
            locomotion: function () {
                this.$store
                    .dispatch('setModus', {'modus': this.locomotion})
                    .then();
            }
        },
        filters: {
            do_room_number: function (building_key, level, number) {
                switch (number.toString().length) {
                    case 1:
                        number = '00' + number;
                        break;
                    case 2:
                        number = '0' + number;
                        break;
                    default:
                        break;
                }
                switch (level.toString().length) {
                    case 1:
                        level = '0' + level;
                        break;
                    default:
                        break;
                }
                return building_key + "/" + level + "." + number;
            },
            format_time: function (value) {
                let time = value.toString().split('T')[1].split(':');
                return time[0] + ':' + time[1];
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
