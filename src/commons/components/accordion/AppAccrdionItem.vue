<template>
    <span class="accordion__icon"></span>
    <span v-if="item.title">{{item.title}}</span>
    <template v-if="item.circle">
        <div v-if="item.circle.length > 0" class="list__circle">
            <span 
                v-for="i in item.circle" 
                :key="i" 
                :class="`circle-${i}`">
            </span>
            </div>
    </template>
    <p v-if="item.text" class="list__title">
        <span>{{ item.text }}</span>
    </p>
    <div v-if="listBtn" class="content__btn">
        <app-button 
            v-for="n in listBtn" 
            :key="n.id"
            :icon="n.icon"
            :type="n.type"
        >
        </app-button>
    </div>               
</template>
<script>
import AppButton from '../form-control/AppButton.vue'
export default {
    props:['item', 'listBtn'],
    components:{AppButton}
}
</script>
