<template>
    <b-row class="align-content-center">
        <b-col>
            <h1>Einstellungen</h1>
        </b-col>
        <b-col class="mb-3 mt-0 pt-0">
            <h2 class="mb-1">Veranstaltung</h2>
            <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
        </b-col>
        <b-col>
            <h2>Fortbewegung</h2>
            <b-button-group>
                <b-button>Zu Fuß</b-button>
                <b-button>Fahrrad</b-button>
            </b-button-group>
        </b-col>
    </b-row>
</template>

<script>
    // @ is an alias to /src
    //import HelloWorld from '@/components/HelloWorld.vue'
    export default {
        name: 'home',
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'a', text: 'This is First option' },
                    { value: 'b', text: 'Selected Option' },
                    { value: { C: '3PO' }, text: 'This is an option with object value' },
                    { value: 'd', text: 'This one is disabled', disabled: true }
                ]
            }
        }
    }
</script>
