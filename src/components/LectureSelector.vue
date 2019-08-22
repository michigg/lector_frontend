<template>
    <div>
        <b-row class="justify-content-center">
            <b-col cols="12" sm="11" md="10" lg="9" xl="8">
                <b-row>
                    <b-col cols="12" md="6" xl="6" class="mb-3 mt-0 pt-0 text-center">
                        <h3 class="mb-1">Veranstaltungsraumsuche</h3>
                        <b-form-input v-model="token" placeholder="Veranstaltung oder Raum"></b-form-input>
                    </b-col>
                    <b-col cols="12" md=6 xl="6" class="mb-3 mt-0 pt-0 text-center">
                        <h3 class="mb-1">Raum Direkt setzen</h3>
                        <b-form-input v-model="roomOverride"
                                      placeholder="Raum Nummer (Bsp.: WE5/00.022)"></b-form-input>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col cols="12" sm="11" md="10" lg="9" xl="8">
                <lecture-results :token="token"/>
                <room-results :token="token"/>
            </b-col>
        </b-row>
        <b-row class="justify-content-center" v-if="hasNoResults">
            <b-col xs="12" sm="12" md="12" lg="12" xl="12">
                <div class="alert alert-danger">Keine Ergebnisse gefunden.</div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    import LectureResults from "./LectureResults";
    import RoomResults from "./RoomResults";

    export default {
        name: 'LectureSelector',
        components: {RoomResults, LectureResults},
        data() {
            return {
                selected: null,
                token: null,
                currentTimeout: null,
                roomOverride: null,
                waiting: false,
            }
        },
        computed: {
            lectures() {
                return this.$store.getters.getLectures
            },
            to_coord() {
                return this.$store.getters.getToCoord
            },
            hasNoResults() {
                const noLectures = this.$store.getters.getLecturesBefore.length === 0 && this.$store.getters.getLecturesAfter.length === 0;
                const noRooms = this.$store.getters.getRooms.length === 0;
                const noContents = noLectures && noRooms;
                const notLoading = this.$store.getters.areRoomsLoaded && this.$store.getters.areLecturesLoaded;
                return this.token && noContents && notLoading && !this.waiting;
            }
        },
        methods: {
            get_lectures_by_token(query) {
                clearTimeout(this.currentTimeout);
                this.currentTimeout = setTimeout(() => this.load_lectures_and_rooms(query), 500);
                this.waiting = true
            },
            load_lectures_and_rooms(query) {
                this.$store
                    .dispatch('loadLecturesAndRooms', {token: query})
                    .then();
                // this.$store
                //     .dispatch('loadRooms', {token: query})
                //     .then();
                this.waiting = false
            },
        },
        watch: {
            token: function () {
                this.get_lectures_by_token(this.token);
            },
            roomOverride: function () {
                let regex = /([a-zA-Z]*[0-9]*)\/([0-9]{2})\.([0-9]{2,3})/;
                if (this.roomOverride.match(regex)) {
                    let match = regex.exec(this.roomOverride);
                    let room = {'building_key': match[1], 'level': parseInt(match[2]), 'number': parseInt(match[3])};
                    room['display'] = this.get_room_display_name(match[1].toString().toUpperCase(), match[2], match[3]);
                    this.$store
                        .dispatch('loadRoomStaircaseCoord', {'room': room})
                        .then();
                } else {
                    this.$store
                        .dispatch('reset')
                        .then();
                }
            }
        },
    }
</script>
<style scoped>
</style>