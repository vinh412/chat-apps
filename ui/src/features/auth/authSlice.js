import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    user: user
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(state);
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
        },

        logout: state => {
            localStorage.removeItem('user');
            state.user = null;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;