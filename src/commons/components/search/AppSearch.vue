<template>
    <div class="search">
        <input type="text" placeholder="Поиск" v-model="search" />
        <span 
            @click="resetForm" 
            v-if="сlearingForm" 
            class="search__close">
        </span>
    </div>
</template>
<script>
import { ref, watch } from 'vue'
export default {
    emits:['update:modelValue'],
    props: ['modelValue'],
    setup(_, {emit}) {
        const search = ref() 
        const сlearingForm = ref(false)
        watch(search, val=>{
            if(val.length > 0 && /[^\s]/gim.test(val)){
                сlearingForm.value = true
                emit('update:modelValue', val)
            } else{
                сlearingForm.value = false
                search.value = ''
                emit('update:modelValue', val) 
            }
        })

        function resetForm(){
           search.value = ''
           emit('update:modelValue', search.value)
        }
        
        return{ search, сlearingForm, resetForm} 
    },
}
</script>
