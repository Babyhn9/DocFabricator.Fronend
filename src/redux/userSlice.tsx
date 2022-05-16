import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageKeys, User } from '../utils/testData.'


const slice = createSlice({
    name: 'user',
    initialState: {
        user: new User(),
    },

    reducers : {
        setUser: (state, payload: PayloadAction<User>) => {
            state.user = payload.payload
            localStorage.setItem(LocalStorageKeys.user, JSON.stringify(payload.payload))
        },
    }
});

export const {setUser} = slice.actions
export const userReducer = slice.reducer
