import { createStore, createLogger } from 'vuex'
import document from '../pages/document/index'

const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}

export default createStore({
    plugins,
    modules:{
        document,
    }
})
