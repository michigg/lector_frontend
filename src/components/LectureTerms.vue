<template>
    <b-row>
        <b-col v-for="(term, index) in lecture.terms" :key="index" xs="4" class="mb-4">
            <button class="btn btn-primary" @click="selected = term.room">
                <h5 class="pb-0 mb-0">Ab {{term.starttime | format_time}}</h5>
                <p>{{term.room.building_key | do_room_number(term.room.level,
                    term.room.number)}}</p>
            </button>
        </b-col>
    </b-row>
</template>
<script>
    export default {
        name: 'lecture-items',
        props: {
            lecture: {},
        },
        data() {
            return {
                selected: null,
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
            selected: function () {
                this.selected['display'] = this.get_room_display_name(this.selected.building_key, this.selected.level, this.selected.number);
                this.$store
                    .dispatch('loadRoomStaircaseCoord', {'room': this.selected})
                    .then();
            },
        },
    }
</script>
