<template>
    <b-row class="justify-content-center">
        <b-col sm="12">
            <h1>Lector</h1>
            <h2>Konfiguration</h2>
        </b-col>
        <b-col xs="12" sm="8" md="5" xl="3" class="mb-3 mt-0 pt-0">
            <h3 class="mb-1">Veranstaltungsraumsuche</h3>
            <b-form-input v-model="lectureToken" placeholder="Veranstaltung"></b-form-input>
        </b-col>
        <b-col sm="12" class="mb-4">
            <b-row>
                <b-col v-if="options" sm="12" class="mb-4">
                    <button class="btn btn-primary w-100" v-on:click="lectureIsActive = !lectureIsActive">Ergebnisse
                    </button>
                </b-col>
                <b-col v-for="lecture in options" :key="lecture.univis_key" xs="12" sm=6 md="6" lg="4" xl="3"
                       v-bind:class="{ active: lectureIsActive }"
                       class="mb-4 lecture">
                    <div class="lecture-content p-1 h-100">
                        <h5>{{lecture.name}}</h5>
                        <b-row>
                            <b-col v-for="(term, index) in lecture.terms" :key="index" xs="4" class="mb-4">
                                <button class="btn btn-primary" @click="selected = term.room">
                                    <h5 class="pb-0 mb-0">Ab {{term.starttime | format_time}}</h5>
                                    <p>{{term.room.building_key | do_room_number(term.room.level,
                                        term.room.number)}}</p>
                                </button>
                            </b-col>
                        </b-row>
                    </div>
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
                        v-on:click="locomotion = 'bike2'"
                        class="locomotion-btn"
                >Fahrrad
                </b-button>
            </b-button-group>
        </b-col>
        <b-col sm="12">
            <h2>Auswahl</h2>
            <p v-if="selected">Raum: {{selected.building_key | do_room_number(selected.level, selected.number)}}</p>
            <p v-else>Veranstaltung: Nothing selected</p>
            <p v-if="locomotion">Fortbewegungsart: {{locomotion}}</p>
            <p v-else>Fortbewegungsart: Nothing selected</p>
            <p v-if="to_coord">Zielpunkt: {{to_coord}}</p>
            <p v-else>Zielpunkt: Nothing selected</p>
        </b-col>
        <b-col sm="12">
            <router-link to="/routing" class="btn btn-success">Navigation starten</router-link>
        </b-col>
    </b-row>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                lectureToken: null,
                selected: null,
                locomotion: null,
                isLoading: false,
                currentTimeout: null,
                lectureIsActive: true,
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
            lectureToken: function () {
                this.get_lectures_by_token(this.lectureToken);
            },
            selected: function () {
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

    .lecture.active {
        display: block;
    }

    .lecture {
        display: none;
    }

    .lecture-content {
        -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
    }


</style>
