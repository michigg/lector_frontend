<template>
    <div>
        <b-row class="justify-content-center mt-5">
            <!--            Heading-->
            <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-center">
              <h1>Daten werden geholt</h1>
            </b-col>
        </b-row>
        <b-row class="justify-content-center mt-5">
            <!--            Heading-->
            <b-col xs="12" sm="12" md="12" lg="12" xl="12" class="text-center">
                <p>Lade...</p>
                <b-spinner  style="width: 5rem; height: 5rem;" label="Large Spinner" class="card-link"></b-spinner>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style scoped>
    .locomotion-btn-group {
        width: 300px;
        height: 150px;
    }


</style>
