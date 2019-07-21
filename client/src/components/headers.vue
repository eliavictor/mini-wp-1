<template>
    <div>
        <h2 style="margin-top: 3%; text-align: center;" class="default">{{title}}</h2>
        <hr style="width: 100%;">
    </div>
</template>

<script>
export default {
    props: ['title'],
    data: function() {
        return {
            text: ""
        }
    },
}
</script>

<style>
</style>
