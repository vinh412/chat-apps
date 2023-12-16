import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstname: 'Robert',
    lastname: 'Vinh',
    email: '',
    role: 'USER'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state = action.payload
        },

        logout: state => {
            state = initialState
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;