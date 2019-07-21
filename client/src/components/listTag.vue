<template>
    <div class="row">
        <p class="col-1 pointer" v-for="(tag, index) in tags" keys="index" @click="filteredByTag(index)" style="margin:2%; margin-top:0; margin-right:1%; background-color: gray; padding:2px; color: white;">{{ tag }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['tags'],
    data: function() {
        return {
            text: ""
        }
    },
    methods: {
        filteredByTag(index) {
            this.$emit('tag-clicked', `${index}`)
        }
    },
}
</script>

<style>

</style>