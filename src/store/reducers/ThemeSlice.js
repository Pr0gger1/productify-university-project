import { createSlice } from "@reduxjs/toolkit";

export const themes = {
    light: 'light',
    dark: 'dark'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: localStorage.getItem('theme')
    },
    reducers: {
        setTheme(state) {
            const currentTheme = localStorage.getItem('theme');

            if (currentTheme === themes.light)
                state.theme = themes.dark;

            else
                state.theme = themes.light;
            
            localStorage.setItem('theme', state.theme);
        }
    }
})
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;