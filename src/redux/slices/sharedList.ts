import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getSharedListAPI, shareListAPI, getAllSharedListAPI, deleteSharedListAPI, DELETE_STATUS, DELETE_PK } from "../../utils";
import { List, Product } from "../../redux";

interface SharedToken {
    access_token: string | null,
    list_id: number | null,
    list_name: string | null,
    user_id: number | null,
    id: number
}

interface SharedListState {
    loading: boolean,
    error: string | null,
    list: List | null,
    access_token: string | null,
    allTokens: SharedToken[],
    products: Product[]
}

const initialState: SharedListState = {
    loading: false,
    error: null,
    list: null,
    access_token: null,
    allTokens: [],
    products: []
}

export const getAllSharedList = createAsyncThunk(
    'sharedList/allSharedList',
    async (parameters: null, thunkAPI) => {
        try {
            const { data } = await getAllSharedListAPI()
            return data
        } catch (error) {
            console.log(error)
        }
    })

export const deleteSharedList = createAsyncThunk(
        'sharedList/deleteSharedList',
        async (parameters: { sharedListPk: number }, thunkAPI) => {
            try {
                const { data } = await deleteSharedListAPI({
                    pk: parameters.sharedListPk,
                })
                return data
            } catch (error) {
                console.log(error);
                alert('Fail to delete shared list. Please try again')
            }
        })
    

export const shareList = createAsyncThunk(
    'sharedList/shareList',
    async (parameters: {list_name: string, list_id: number}, thunkAPI) => {
        try {
            const { data } = await shareListAPI({
                list_id: parameters.list_id,
                list_name: parameters.list_name
            })
            return data
        } catch (error) {
            console.log(error)
            alert('Fail to share list. You cannot share the same list more than once!')
            return thunkAPI.rejectWithValue("You have shared the list");
        }
    })

export const getSharedList = createAsyncThunk(
    'sharedList/getSharedList',
    async (parameters: { access_token: string }, thunkAPI) => {
        try {
            const { data } = await getSharedListAPI({
                access_token: parameters.access_token
            })
            return data
        } catch (error) {
            console.log(error, "!23123");
            alert('Fail to get shared list. Please try again 123')
        }
    })

export const sharedListSlice = createSlice({
    name: "sharedList",
    initialState,
    reducers: {

    },
    extraReducers: {
        [getSharedList.pending.type]: (state) => {
            state.loading = true;
        },
        [getSharedList.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.list = action.payload.list
                state.products = action.payload.products
            }
            state.loading = false;
            state.error = null;
        },
        [getSharedList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [shareList.pending.type]: (state) => {
            state.loading = true;
        },
        [shareList.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.access_token = action.payload.access_token
                alert(`Your list sharing URL is: http://${window.location.hostname}/share/${action.payload.access_token}`)
            }
            state.loading = false;
            state.error = null;
        },
        [shareList.rejected.type]: (state, action) => {
            console.log(action.payload)
            state.loading = false;
            state.error = action.payload
        },
        [getAllSharedList.pending.type]: (state) => {
            state.loading = true;
        },
        [getAllSharedList.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.allTokens = action.payload
            }
            state.loading = false;
            state.error = null;
        },
        [getAllSharedList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deleteSharedList.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteSharedList.fulfilled.type]: (state, action) => {
            if (action.payload && action.payload[DELETE_STATUS] === true) {
                state.allTokens = state.allTokens.filter(token => token.id != action.payload[DELETE_PK])
            }
            state.loading = false;
            state.error = null;
        },
        [deleteSharedList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
})
