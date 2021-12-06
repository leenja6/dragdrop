<template>
    <div class="content">
        <div class="content__header">
            <h1>Документы</h1>
            <div class="content__header-button">
                <app-button 
                    v-for="item in listHeaderBtn" 
                    :key="item.id"
                    :title="item.title"
                    :icon="item.icon"
                    :type="item.type"
                >
                </app-button>
            </div> 
        </div>
        <app-search v-model="filters"></app-search>
        <app-accordion
            @onDragItems="onDragItems($event)"
            :action="action"  
            :listCategory="dataList"
            :list="list"
            :listBtn="listAccardionBtn"                   
        >
        </app-accordion>
        <app-list
            @itemdrag="onDragItems($event)"
            @onOpen="onOpen"
            :allow="true"
            :id="1600"
            :list="dataList" 
            :listBtn="listAccardionBtn"
        ></app-list>
    </div> 
    <ul  
        class="list ghost"
        v-if="Object.keys(itemDrag).length !== 0"
    >
        <li class="list__item">   
            <app-list-item 
                :n="itemDrag"
                :listBtn="listAccardionBtn"
            ></app-list-item>
        </li>
    </ul> 
</template>
<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import AppListItem from '../commons/components/list/AppListItem.vue'
import AppList from '../commons/components/list/AppList.vue'
import AppButton from '../commons/components/form-control/AppButton.vue'
import AppSearch from '../commons/components/search/AppSearch.vue'
import AppAccordion from '../commons/components/accordion/AppAccordion.vue'
export default {
    setup() {
        const store = useStore()
        const action = ref(false)
        const itemDrag =ref({})
        const listHeaderBtn = computed(()=> store.state.document.listHeaderBtn)
        const filters = ref()
        const list = computed(()=> store.getters['document/list'])
        const dataList = computed(()=> store.getters['document/dataList'])
        const listAccardionBtn = computed(()=> store.state.document.listAccardionBtn)
        function onOpen(){
           action.value = !action.value
        }
        
        watch(filters, val=>{
           store.commit('document/search', val)
        })
        
        function onDragItems(e){
           itemDrag.value = e
        }
        return { listHeaderBtn, filters, list, dataList, listAccardionBtn, action, onOpen, onDragItems, itemDrag }
    },
    components:{AppButton, AppSearch, AppAccordion, AppList, AppListItem}
}
</script>
 