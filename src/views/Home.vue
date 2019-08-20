<template>
    <div>
        <navigation-bar/>
        <b-row class="justify-content-center">
            <!--            Heading-->
            <b-col sm="12">
                <h1>Lector</h1>
                <h2>Konfiguration</h2>
            </b-col>
        </b-row>
        <LectureSelector/>
        <b-row class="justify-content-center">
            <!--            Locomotion-->
            <!--            <b-col sm="12" class="mb-4">-->
            <!--                <h2>Fortbewegung</h2>-->
            <!--                <b-button-group class="locomotion-btn-group">-->
            <!--                    <b-button-->
            <!--                            squared-->
            <!--                            variant="primary"-->
            <!--                            v-on:click="locomotion = 'foot'"-->
            <!--                            class="locomotion-btn"-->
            <!--                    >Zu Fuß-->
            <!--                    </b-button>-->
            <!--                    <b-button-->
            <!--                            squared-->
            <!--                            variant="info"-->
            <!--                            v-on:click="locomotion = 'bike2'"-->
            <!--                            class="locomotion-btn"-->
            <!--                    >Fahrrad-->
            <!--                    </b-button>-->
            <!--                </b-button-group>-->
            <!--            </b-col>-->
        </b-row>
        <b-row class="justify-content-center">
            <b-col sm="12">
                <h2>Auswahl</h2>
                <p v-if="selected">Raum: {{selected}}</p>
                <p v-else>Veranstaltung: Nothing selected</p>
                <p v-if="locomotion">Fortbewegungsart: {{locomotion}}</p>
                <p v-else>Fortbewegungsart: Nothing selected</p>
                <p v-if="to_coord">Zielpunkt: {{to_coord}}</p>
                <p v-else>Zielpunkt: Nothing selected</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col v-if="selected" sm="12">
                <router-link to="/routing" class="btn btn-success">Navigation starten</router-link>
            </b-col>
            <b-col v-else sm="12">
                <button class="btn btn-secondary isDisabled" disabled>Navigation starten</button>
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
