<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col sm="12">
                <h1 class="h2">Konfiguration</h1>
                <p>Finde deine Veranstaltung an der Universität Bamberg</p>
            </b-col>
        </b-row>
        <LectureSelector/>
        <b-row class="justify-content-center">
            <b-col cols="12" sm="11" md="10" lg="9" xl="8" class="text-center">
                <h2>Auswahl</h2>
                <table class="table">
                    <tr>
                        <td>Raum</td>
                        <td v-if="selected" class="bg-success">{{selected}}</td>
                        <td v-else class="bg-warning">Noch ausstehend</td>
                    </tr>
                    <tr>
                        <td>Fortbewegungsart</td>
                        <td v-if="locomotion" class="bg-success">{{locomotion}}</td>
                        <td v-else class="bg-warning">Fehlt</td>
                    </tr>
                    <tr>
                        <td>Zielpunkt</td>
                        <td v-if="to_coord" class="bg-success"> <span>{{to_coord[0]}}, {{to_coord[1]}}</span></td>
                        <td v-else class="bg-warning">Noch ausstehend</td>
                    </tr>
                </table>
            </b-col>
        </b-row>
        <b-row class="justify-content-center mb-5">
            <b-col cols="12" sm="11" md="10" lg="9" xl="8">
                <router-link v-if="to_coord" to="/routing" class="btn btn-success w-100">Navigation starten
                </router-link>
                <button v-else class="btn btn-secondary isDisabled w-100" disabled>Navigation starten</button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";
    import LectureSelector from "../components/LectureSelector";

    export default {
        name: 'home',
        components: {NavigationBar, LectureSelector},
        data() {
            return {
                locomotion: "foot",
            }
        },
        computed: {
            lectures() {
                return this.$store.getters.getLectures
            },
            to_coord() {
                return this.$store.getters.getToCoord
            },
            selected() {
                return this.$store.getters.getRouteTo
            }
        },
        methods: {
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
            locomotion: function () {
                this.$store
                    .dispatch('setModus', {'modus': this.locomotion})
                    .then();
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }

</style>
