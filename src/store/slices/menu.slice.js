import { createSlice } from "@reduxjs/toolkit";

const menuSLice = createSlice({
    name: "menu",
    initialState: false,
    reducers: {
        setMenuGlobal: (state, action) => action.payload
    }
})

export const { setMenuGlobal } = menuSLice.actions
export default menuSLice.reducer