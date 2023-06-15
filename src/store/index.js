import { configureStore } from "@reduxjs/toolkit";
import menu from './slices/menu.slice'
import scroll from './slices/scroll.slice'

export default configureStore({
    reducer: {
        menu,
        scroll
    }
})