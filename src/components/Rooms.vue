<template>
    <b-row class="justify-content-center">
        <b-col v-for="(room, index) in rooms" :key="index" cols="6" sm="6" md="4" lg="3" xl="3" class="mb-4 room" v-bind:class="{ active: active }">
            <button class="btn btn-primary w-100" @click="selected = room">
                {{room.building_key | do_room_number(room.level, room.number)}}
            </button>
        </b-col>
    </b-row>
</template>
<script>
    export default {
        name: 'rooms',
        props: ["active", "rooms"],
        data() {
            return {
                selected: null
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

<style scoped>
    .room {
        display: none;
    }

    .room.active {
        display: flex;
    }
</style>