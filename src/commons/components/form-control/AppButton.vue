<template>
    <button class="btn" :class="type ? type : ''" type="button">
        <span v-if="icon" :class="icon" class="btn__icon"></span>
        {{ title }}
    </button>
</template>
<script>
export default {
    props:['title', 'icon', 'type'],    
}
</script>
