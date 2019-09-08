<template>
    <b-row>
        <b-col v-for="(term, index) in lecture.terms" :key="index" class="mb-2">
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
