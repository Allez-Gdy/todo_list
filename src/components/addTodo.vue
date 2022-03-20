<script>
export default {
    setup() {
        const move = ()=> {
            console.log('move');
        }

        return {
            move
        }
    }
}
</script>
<template>
    <div class="add" @mousedown="move">
        add
    </div>
</template>
<style>
    .add {
        position: absolute;
        bottom: 100px;
        right: 30px;
        z-index: 100;
    }
</style>