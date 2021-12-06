import { uniqBy } from 'lodash'
export default {
    namespaced: true,
    state() {
        return {

            searchData: '',

            listAccardionBtn: [
                { id: 0, type: 'icon-pd-n', icon: 'edit' },
                { id: 1, type: 'icon-pd-n', icon: 'delete' },
                { id: 2, type: 'icon-pd-n', icon: 'revers' }
                
            ],
            listHeaderBtn: [
                { id: 0, title: '', type: 'icon-circle', icon: 'bookmark' },
                { id: 1, title: 'Новый тип', type: 'icon-title', icon: 'plus' },
                { id: 2, title: 'Новый документ', type: 'icon-title', icon: 'plus' }
            ],
            data: [
                { id: 0, title: 'Обязательные для всех', circle: ['r', 'y', 'o'], text: 'Документы, обязательные для всех сотрудников без исключения' },
                { id: 1, title: 'Обязательные для трудоустройства', circle: [], text: 'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от граж' },
                { id: 2, title: 'Специальные', circle: [], text: '' }
            ],
            dataList: [
                { id: 0, title: 'Паспорт', circle: ['b'], status: 'Обязательный', text: 'Для всех', subid: 0 },
                { id: 1, title: 'ИНН', circle: [], status: 'Обязательный', text: 'Для всех', subid: 0 },
                { id: 2, title: 'Тестовое задание кандидата', text: 'Россия, Белоруссия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха', subid: 1600 },
                { id: 3, title: 'Трудовой договор', circle: ['bb', 'g'], subid: 1600 },
                { id: 4, title: 'Мед. книжка', subid: 1600 },
                { id: 5, title: 'Копия Договора', circle: ['bb', 'g'], subid: 1 },
                { id: 6, title: 'Санитарная книжка', subid: 2 }
            ],
        }
    },
    mutations: {

        search(state, payload) {
            state.searchData = payload
        },

        coordsAdd(state, payload) {
            state.coords = payload
        },

        revers(state, payload) {
            [state.data[payload.i1], state.data[payload.i2]] = [state.data[payload.i2], state.data[payload.i1]]
        },
        reversCategory(state, payload) {
            const i1 = state.dataList.findIndex(r => r.id == payload.id1)
            const i2 = state.dataList.findIndex(r => r.id == payload.id2)
                        
            const revers = [state.dataList[i1], state.dataList[i2]] = [state.dataList[i2], state.dataList[i1]]
            if (payload.subId2 === 1600 && payload.subId1 !== 1600) {
                revers
                state.dataList[i2].subid = 1600
            } else if (payload.subId2 === 1600 && payload.subId1 === 1600) {
                revers
            } else if (payload.subId2 !== 1600 && payload.subId1 !== 1600) {
                if (payload.subId1 == payload.subId2) {
                    revers
                } else {
                    revers
                    state.dataList[i2].subid = payload.subId2
                }
            } else if (payload.subId1 === 1600 && payload.subId2 !== 1600) {
                revers
                state.dataList[i2].subid = payload.subId2
            }
        }
    },
    getters: {
        list(state) {
            let dataListIFItem = [{}]
            let dataIFItem = [{}]
            let dataIF = state.data
            let dataListIF = state.dataList
            
            if (state.searchData && state.searchData !== '') {
                dataIF = state.data.filter(r => r.title.toUpperCase().includes(state.searchData.toUpperCase()))
                dataIFItem = dataIF.map(r => {
                    return {
                        id: r ? r.id : null
                    }
                })
                
            }
            if (state.searchData && state.searchData !== '') {
                dataListIF = state.dataList.filter(r => r.title.toUpperCase().includes(state.searchData.toUpperCase()))
                dataListIFItem = dataListIF.map(r => {
                    return {
                        subid: r ? r.subid : null
                    }
                })
            }
            if (dataListIFItem.length === 0 && dataIFItem.length === 0) {
                return []
            } else if (dataListIFItem.length == 0 && dataIFItem.length > 0) {
                return dataIF
            } else if (dataListIFItem.length > 0 && dataIFItem.length === 0) {
                if (dataListIFItem.filter(r => r.subid !== 1600).length > 0) {
                    let itemFilter = dataListIFItem.filter(r => r.subid !== 1600)
                    return itemFilter.map(y => state.data[y.subid])
                } else {
                    return []
                }
            } else if (Object.keys(dataListIFItem[0]).length > 0 && Object.keys(dataIFItem[0]).length > 0) {
                    let itemFilter = dataListIFItem.filter(r => r.subid !== 1600)
                    let itemFilterSort = uniqBy([...itemFilter.map(y => state.data[y.subid]), ...dataIF], function (e) {
                        return e.id;
                    })
                    return itemFilterSort
                
            } else {
                return state.data
            }
        },
        dataList(state) {
            
            if (state.searchData && state.searchData !== '') {
                let dataIF = state.data.filter(r => r.title.toUpperCase().includes(state.searchData.toUpperCase()))
                let dataListIf = state.dataList.filter(r => r.title.toUpperCase().includes(state.searchData.toUpperCase()))
                if (dataIF.length > 0 && dataListIf.length == 0) {
                    return dataIF.map((r) => state.dataList.filter(y=> y.subid === r.id)).flat()
                } else if (dataIF.length > 0 && dataListIf.length > 0) {
                    return  [...dataIF.map((r) => state.dataList.filter(y=> y.subid === r.id)).flat(), ...dataListIf] 
                } else {
                    return dataListIf 
                }
            } else {
                return state.dataList
            }
        }
    }
}
