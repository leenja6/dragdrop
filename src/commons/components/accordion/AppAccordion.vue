<template>
    <div class="accordion">
        <div 
            v-for="(item, i) in list" 
            :key="item.id" 
            class="accordion__item" 
        >
           <div 
                @click="toggle(i)" 
                class="accordion__section" 
                :class="arr[i].isOpen ? 'active' : ''"
                @dragstart="onDragStart($event,{item:item, i:i})"
                @drop="onDrop($event, i)"
                @dragover.prevent
                @dragenter="onDragEnter($event)"
                @dragleave="onDragLeave($event)"
                @dragend="onDragEnd"
                draggable="true"
            >
                <app-accrdion-item 
                    :item="item" 
                    :listBtn="listBtn"
                ></app-accrdion-item>  
            </div>  
            <app-list
                @itemdrag="onItemDrag($event)"
                @onOpen="onOpen"
                :allow="false"
                :idElem="idElem"
                :togg="arr[i].isOpen"
                :listBtn="listBtn" 
                :list="listCategory" 
                :id="item.id"                
            ></app-list>
        </div>
        <div v-if="Object.keys(itemsDrag).length !== 0" class="accordion__section accordion__ghost ghost">
            <app-accrdion-item 
                :item="itemsDrag" 
                :listBtn="listBtn"
            ></app-accrdion-item> 
        </div>  
    </div>    
</template>
<script>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { ghostItem } from '../../../utils/ghostitem'
import { ghostImg } from '../../../utils/ghostimg'
import AppList from '../list/AppList.vue'
import AppAccrdionItem from './AppAccrdionItem.vue'
export default {
    emits:['onDragItems'],
    props:['list','listBtn', 'listCategory', 'action'],
    setup(props, {emit}) {
        const store = useStore()
        const blank = ref()
        const itemsDrag = ref({})
        const idElem = ref()
        const effect =computed(()=> props.action ? true : false )
        let array = props.list.map((_, i)=> {
            return { id: i, isOpen: false }
        })
        
        const arr = reactive([...array])

        watch(effect, val=>{
            blank.value = val
            onOpen()
        })

        function onOpen(){
            arr.forEach(r=> r.isOpen = true )           
        }

        function toggle(id){
            arr[id].isOpen = !arr[id].isOpen
        }
        
        function onDragStart(e, item){
            ghostItem('.accordion__ghost', { 
                c: e.clientX, 
                w:e.srcElement.offsetWidth, 
                wp: e.srcElement.clientWidth
            })
            ghostImg(e)
            e.dataTransfer.setData("item", item.i)
            itemsDrag.value = item.item
            idElem.value = item.item.id
            e.target.classList.add('p__events')
            const listClass = document.querySelectorAll('.list')
            listClass.forEach(r=> r.classList.add('disable'))
        } 

        function onDrop(e, id){
           const itemID = e.dataTransfer.getData('item')
           itemsDrag.value = {}
           store.commit('document/revers', {
               i1:Number(itemID),
               i2:id
           })
           e.target.classList.remove("b__active")
        } 

        function onDragEnter(e){
            if( e.target.className === 'accordion__section' || 
                e.target.className === 'accordion__section active'){
                e.target.classList.add('b__active')
            }
            for (let item of e.target.children){
                item.classList.add('disable')
            }
            
        }

        function onDragLeave(e){
            if(
                e.target.className === 'accordion__section b__active' || 
                e.target.className === 'accordion__section active b__active' ||  
                e.target.className === 'accordion__section active p__events') {
                e.target.classList.remove('b__active')
            }
        }

        function onDragEnd(){
            itemsDrag.value = {}
            const listClassFirst = document.querySelectorAll('.accordion__section')
            listClassFirst.forEach(r=> {
                r.classList.remove("p__events")
                r.classList.remove("b__active")
                for (let item of r.children){
                    item.classList.remove('disable')
                }
            })
            const listClass = document.querySelectorAll('.list')
            listClass.forEach(r=> r.classList.remove('disable'))
            idElem.value = null         
        }

        function onItemDrag(e){
            emit('onDragItems', e)
        }
               
        return {
            idElem,
            arr, 
            array,
            effect,
            itemsDrag, 
            onOpen,
            onDragStart, 
            onDrop, 
            onDragEnter, 
            onDragLeave,
            onDragEnd, 
            onItemDrag, 
            toggle,
            ghostItem,
            ghostImg
        }
    },
    components:{AppAccrdionItem, AppList}    
}
</script>
