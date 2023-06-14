import { configureStore } from "@reduxjs/toolkit";
import menu from './slices/menu.slice'

export default configureStore({
    reducer: {
        menu
    }
})