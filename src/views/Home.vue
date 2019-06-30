<template>
    <b-row class="align-content-center">
        <b-col>
            <h1>Einstellungen</h1>
        </b-col>
        <b-col class="mb-3 mt-0 pt-0">
            <h2 class="mb-1">Veranstaltung</h2>
            <multiselect
                    v-model="selected"
                    :options="options"
                    placeholder="Select one"
                    label="label"
                    track-by="label"
            ></multiselect>
        </b-col>
        <b-col class="mb-4">
            <h2>Fortbewegung</h2>
            <b-button-group class="locomotion-btn-group">
                <b-button
                        squared
                        variant="primary"
                        v-on:click="locomotion = 'ped'"
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
            <p v-if="selected">Veranstaltung: {{selected.label}}</p>
            <p v-else>Veranstaltung: Nothing selected</p>
            <p v-if="locomotion">Fortbewegung: {{locomotion}}</p>
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
                options: [
                    {value: null, label: 'Please select an option'},
                    {value: 'mobas', label: 'Geoinformationsysteme'},
                    {value: 'b', label: 'Digitale Bibliotheken'},
                    {value: {C: '3PO'}, label: 'Einführung in die Angewandet Informatik'},
                    {value: 'd', label: 'This one is disabled', disabled: true}
                ],
                locomotion: null
            }
        },
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
