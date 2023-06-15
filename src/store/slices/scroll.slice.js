import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
    name: "menu",
    initialState: 0,
    reducers: {
        setScrollGlobal: (state, action) => action.payload
    }
})

export const { setScrollGlobal } = scrollSlice.actions
export default scrollSlice.reducer