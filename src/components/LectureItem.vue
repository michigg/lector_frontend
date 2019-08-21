<template>
    <b-row class="justify-content-center">
        <b-col v-for="lecture in lectures" :key="lecture.univis_key" xs="12" sm="6" md="6" lg="6"
               xl="4"
               v-bind:class="{ active: active}"
               class="mb-4 lecture">
            <div class="lecture-content p-1 h-100 w-100">
                <h5>{{lecture.name}}</h5>
                <lecture-terms :lecture="lecture"/>
            </div>
        </b-col>
    </b-row>
</template>
<script>
    import LectureTerms from "./LectureTerms"

    export default {
        name: 'lecture-item',
        components: {LectureTerms},
        props: ["active", "lectures",],
    }
</script>
<style scoped>
    .lecture {
        display: none;
    }
    .lecture.active {
        display: flex;
    }
    .lecture-content {
        -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
        box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
    }
</style>