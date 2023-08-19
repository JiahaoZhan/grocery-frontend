import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginAPI, registerAPI, refreshAPI } from "../../utils";

export interface UserState {
    loading: boolean,
    error: string | null;
    access: string | null;
    refresh: string | null,
}

const initialState: UserState = {
    loading: false,
    error: null,
    access: null,
    refresh: null,
}

export const register = createAsyncThunk(
    'user/register',
    async (parameters: { email: string, password: string, phone: string}, thunkAPI) => {
        try {
            console.log("register!!!!!!!!!!!")
            const { data } = await registerAPI({ 
                email: parameters.email, 
                password: parameters.password,
                phone: parameters.phone
            })
        } catch (error) {
            console.log(error);
            alert('Fail to register. Please try again')
        }
    })

export const refresh = createAsyncThunk(
    'user/refresh',
    async (parameters: {refreshToken: string}, thunkAPI) => {
        try {
            const { data } = await refreshAPI({ 
                refresh: parameters.refreshToken 
             })
            return data;       
        } catch (error) {
            alert('Fail to refresh sign-in status. Please try again')
        }
    })
    
export const login = createAsyncThunk(
    'user/login',
    async (parameters: { email: string, password: string}, thunkAPI) => {
        try {
            const { data } = await loginAPI({ 
                email: parameters.email, 
                password: parameters.password
             })
            return data;
        } catch (error) {
            console.log(error)
            alert('Fail to sign in. Please try again')
        }
    })
    
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state) => {
            state.access = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.loading = true;
        },
        [login.fulfilled.type]: (state, action) => {
            state.access = action.payload.access
            state.refresh = action.payload.refresh
            state.loading = false;
            state.error = null;
        },
        [login.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [refresh.pending.type]: (state) => {
            state.loading = true;
        },
        [refresh.fulfilled.type]: (state, action) => {
            state.access = action.payload.access
            state.loading = false;
            state.error = null;
        },
        [refresh.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [register.pending.type]: (state) => {
            state.loading = true;
        },
        [register.fulfilled.type]: (state) => {
            state.loading = false;
            state.error = null;
        },
        [register.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})

export const { logOut } = userSlice.actions