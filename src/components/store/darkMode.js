import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checked: true,
    lightMode: true
}

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        toggleMode: (state, action) => {
            state.lightMode = !state.lightMode
            state.checked = !state.checked
        },
        
    }
});

export const darkModeActions = darkModeSlice.actions
export const darkModeReducer = darkModeSlice.reducer