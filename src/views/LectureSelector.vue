<template>
    <div>
        <b-row class="justify-content-center">
            <b-col xs="12" sm="8" md="5" xl="4" class="mb-3 mt-0 pt-0 text-center">
                <h3 class="mb-1">Veranstaltungsraumsuche</h3>
                <b-form-input v-model="lectureToken" placeholder="Veranstaltung"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col xs="12" sm="8" md="5" xl="4" class="text-center" v-if="lectures.length == 0 && lectureToken">
                <p>Loading...</p>
                <font-awesome-icon icon="spinner" spin pulse size="6x"/>
            </b-col>
            <b-col xs="12" sm="12" md="8" xl="8" v-else>
                <b-row>
                    <b-col xs="12" class="mb-4">
                        <button class="btn btn-primary w-100" v-on:click="lectureIsActive = !lectureIsActive">Ergebnisse
                        </button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col v-for="lecture in lectures" :key="lecture.univis_key" xs="12" sm=6 md="6" lg="6" xl="4"
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
        </b-row>
    </div>
</template>
<script>
    export default {
        name: 'LectureSelector',
        data() {
            return {
                selected: null,
                lectureToken: null,
                currentTimeout: null,
                lectureIsActive: true,
            }
        },
        computed: {
            lectures() {
                return this.$store.getters.getLectures
            },
            to_coord() {
                return this.$store.getters.getToCoord
            },
        },
        methods: {
            get_lectures_by_token(query) {
                clearTimeout(this.currentTimeout);
                this.currentTimeout = setTimeout(() => this.load_lectures(query), 500);
            },
            load_lectures(query) {
                this.$store
                    .dispatch('loadLectures', {token: query})
                    .then(this.stop_loading);
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
        },
    }
</script>
<style scoped>
    .lecture {
        display: none;
    }

    .lecture.active {
        display: block;
    }

    .lecture-content {
        -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
    }


</style>