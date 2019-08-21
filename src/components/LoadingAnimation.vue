<template>
    <div>
        <p v-if="text">{{text}}</p>
        <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner" class="card-link"></b-spinner>
    </div>
</template>
<script>
    export default {
        name: 'loading-animation',
        props: {text: null},
    }
</script>
