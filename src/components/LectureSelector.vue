<template>
    <div>
        <b-row class="justify-content-center">
            <b-col xs="12" sm="8" md="5" xl="4" class="mb-3 mt-0 pt-0 text-center">
                <h3 class="mb-1">Veranstaltungsraumsuche</h3>
                <b-form-input v-model="token" placeholder="Veranstaltung oder Raum"></b-form-input>
            </b-col>
            <b-col xs="11" sm="8" md="5" xl="4" class="mb-3 mt-0 pt-0 text-center">
                <h3 class="mb-1">Raum Direkt setzen</h3>
                <b-form-input v-model="roomOverride" placeholder="Raum Nummer (Bsp.: WE5/00.022)"></b-form-input>
            </b-col>
        </b-row>
        <lecture-results :is-token="token"/>
        <b-row class="justify-content-center">
            <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-center"
                   v-if="token && searched_rooms.length == 0 && !roomsLoaded">
                <loading-animation :text="'Raumergebnisse Loading...'"></loading-animation>
            </b-col>
            <b-col xs="12" sm="12" md="8" xl="8" v-else-if="searched_rooms.length != 0">
                <b-row>
                    <b-col xs="12" class="mb-4">
                        <button class="btn btn-primary w-100" v-on:click="roomIsActive = !roomIsActive">
                            Raumergebnisse
                        </button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col v-for="(room, index) in searched_rooms" :key="index" xs="4" class="mb-4 room"
                           v-bind:class="{ active: roomIsActive }">
                        <button class="btn btn-primary" @click="selected = room">
                            <h5>{{room.building_key | do_room_number(room.level,
                                room.number)}}</h5>
                        </button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import LectureResults from "./LectureResults";
    import LoadingAnimation from "./LoadingAnimation";

    export default {
        name: 'LectureSelector',
        components: {LoadingAnimation, LectureResults},
        data() {
            return {
                selected: null,
                token: null,
                currentTimeout: null,
                active: true,
                roomIsActive: true,
                hideEarlier: true,
                roomOverride: null,
            }
        },
        computed: {
            lectures() {
                return this.$store.getters.getLectures
            },
            to_coord() {
                return this.$store.getters.getToCoord
            },
            searched_rooms() {
                return this.$store.getters.getRooms
            },
            roomsLoaded() {
                return this.$store.getters.areRoomsLoaded
            },
        },
        methods: {
            get_lectures_by_token(query) {
                clearTimeout(this.currentTimeout);
                this.currentTimeout = setTimeout(() => this.load_lectures_and_rooms(query), 500);
            },
            load_lectures_and_rooms(query) {
                this.$store
                    .dispatch('loadLectures', {token: query})
                    .then(console.log('Finished'));
                this.$store
                    .dispatch('loadRooms', {token: query})
                    .then();
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
            token: function () {
                this.get_lectures_by_token(this.token);
            },
            selected: function () {
                this.selected['display'] = this.get_room_display_name(this.selected.building_key, this.selected.level, this.selected.number);
                this.$store
                    .dispatch('loadRoomStaircaseCoord', {'room': this.selected})
                    .then();
            },
            roomOverride: function () {
                let regex = /([a-zA-Z]*[0-9]*)\/([0-9]{2})\.([0-9]{2,3})$/;
                if (this.roomOverride.match(regex)) {
                    let match = regex.exec(this.roomOverride);
                    let room = {'building_key': match[1], 'level': parseInt(match[2]), 'number': parseInt(match[3])};
                    room['display'] = this.get_room_display_name(match[1].toString().toUpperCase(), match[2], match[3]);
                    this.$store
                        .dispatch('loadRoomStaircaseCoord', {'room': room})
                        .then();
                }
            }
        },
    }
</script>
<style scoped>

    .hiddenearlier {
        display: none !important;
    }


</style>