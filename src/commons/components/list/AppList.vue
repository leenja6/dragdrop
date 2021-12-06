<template>
    <ul 
        class="list"
        :class="togg ? 'active' : ''"
        :id="idElem == id ? 'hide' : null"
    >   
        <li 
            class="list__item"
            v-if="category && allow"
            @drop="onDrop($event, {subid:1600, id: 4})"
            @dragover.prevent
            @dragenter="onDragEnter($event)"
            @dragleave="onDragLeave($event)"
        >
            Данные отсутствуют
        </li>
        <li 
            class="list__item"
            v-if="sort && !allow"
            @drop="onDrop($event, {subid:id, id:id})"
            @dragover.prevent
            @dragenter="onDragEnter($event)"
            @dragleave="onDragLeave($event)"
        >
            Данные отсутствуют
        </li>
        <li
            v-for="n in list.filter(r=> r.subid === id)"
            :key="n.id"
            class="list__item"
            @dragstart="onDragStart($event, n)"
            @drop="onDrop($event, {subid:n.subid, id: n.id})"
            @dragover.prevent
            @dragenter="onDragEnter($event)"
            @dragleave="onDragLeave($event)"
            @dragend="onDragEnd"
            draggable="true"        
        >
            <app-list-item 
                :n="n"
                :listBtn="listBtn"
            ></app-list-item>
        </li>
    </ul>
</template>
<script>
import { computed, ref } from 'vue'
import {useStore} from 'vuex'
import { ghostItem } from '../../../utils/ghostitem'
import { ghostImg } from '../../../utils/ghostimg'
import AppListItem from './AppListItem.vue'
export default {
    emits:['onOpen', 'itemdrag'],
    props:['list','listBtn', 'id', 'togg', 'idElem', 'allow'],
    setup(props,{ emit }) {
        const store =  useStore()
        const itemGhost = ref({})
        const sort = computed(()=> props.list.filter(r=> r.subid == props.id).length === 0)
        const category = computed(()=> props.list.filter(r=> r.subid === 1600).length === 0)
        function onDragStart(e, item){
            itemGhost.value = item
            e.dataTransfer.setData('itemId', JSON.stringify({subid:item.subid, id: item.id}))
            emit('onOpen')
            emit('itemdrag', item)
            ghostItem('.ghost', { 
                c: e.clientX, 
                w:e.srcElement.offsetWidth, 
                wp: e.srcElement.clientWidth
            })
            ghostImg(e)
            e.target.classList.add('p__events')
            const listClass = document.querySelectorAll('.accordion__section')
            listClass.forEach(r=> r.classList.remove("b__active"))
        } 

        function onDrop(e, id){
            itemGhost.value = {}
            const itemID = JSON.parse(e.dataTransfer.getData('itemId',))
            store.commit('document/reversCategory', {
                subId1:itemID.subid,
                subId2:id.subid,
                id1:itemID.id,
                id2:id.id,               
            }) 
            emit('itemdrag', {})          
        } 

        function onDragEnter(e){
            const listClass = document.querySelectorAll('.accordion__section')
            listClass.forEach(r=> {
                r.classList.add("disable")
                r.classList.remove("b__active")
            }) 
            if(e.target.className == 'list__item'){
                e.target.classList.add('b__active')
            }
            for (let item of e.target.children){
                item.classList.add('disable')
            }
        }

        function onDragLeave(e){
            if(e.target.className == 'list__item b__active'){
                e.target.classList.remove('b__active')
            }
            for (let item of e.target.children){
                item.classList.remove('disable')
            }
        }

        function onDragEnd(){
            itemGhost.value = {}
            const listitem = document.querySelectorAll('.list__item')
            listitem.forEach(r=> {
                r.classList.remove('p__events')
                r.classList.remove("b__active")
                for (let item of r.children){
                    item.classList.remove('disable')
                }
            })
            const listClass = document.querySelectorAll('.accordion__section')
            listClass.forEach(r=> {
                r.classList.remove("disable")
            })  
            emit('itemdrag', {})
        } 
        
        return{
            onDragStart,
            onDrop,
            onDragEnter,
            onDragLeave,
            onDragEnd,
            sort,
            category,
            itemGhost,
            ghostItem,
            ghostImg
        }
    },
    components:{ AppListItem }
}
</script>
