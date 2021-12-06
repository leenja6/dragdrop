<template>
    <span v-if="n.title">{{n.title}}</span>
    <template v-if="n.circle">
        <div v-if="n.circle.length > 0" class="list__circle">
            <span 
                v-for="i in n.circle" 
                :key="i" 
                :class="`circle-${i}`">
            </span>
        </div>
        </template>
            <p v-if="n.status" class="list__status">
                <span >{{ n.status }}</span>
            </p>
            <p v-if="n.text" class="list__title">
                <span>{{ n.text }}</span>
            </p>
            <p v-if="listBtn" class="content__btn">
                <app-button 
                    v-for="n in listBtn" 
                    :key="n.id"
                    :icon="n.icon"
                    :type="n.type"
                >
                </app-button>
            </p>
</template>
<script>
import AppButton from '../form-control/AppButton.vue'
export default {
    props:['n', 'listBtn'],
    components:{ AppButton }
}
</script>
