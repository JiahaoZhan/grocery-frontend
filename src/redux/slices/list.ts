import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createListAPI, getListAPI, deleteListAPI, changeListAPI, DELETE_STATUS, DELETE_PK } from "../../utils";
import { List } from "../../components";


export interface List {
    id: number,
    user: string,
    name: string,
    color: string,
    description: string,
}

export interface ListState {
    loading: boolean,
    error: string | null,
    lists: List[]
}

const initialState: ListState = {
    loading: false,
    error: null,
    lists: []
}

export const createList = createAsyncThunk(
    'list/create',
    async (parameters: { name: string, color: string, description: string }, thunkAPI) => {
        try {
            const { data } = await createListAPI({
                name: parameters.name,
                color: parameters.color,
                description: parameters.description
            })
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to create list. Please try again')
        }
    })

export const deleteList = createAsyncThunk(
    'list/delete',
    async (parameters: { listPk: number }, thunkAPI) => {
        try {
            const { data } = await deleteListAPI({
                pk: parameters.listPk
            })
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to delete list. Please try again')
        }
    })

    
export const changeList = createAsyncThunk(
    'list/change',
    async (parameters: { pk: number, name: string, color: string, description: string }, thunkAPI) => {
        try {
            const { data } = await changeListAPI({
                pk: parameters.pk,
                name: parameters.name,
                color: parameters.color,
                description: parameters.description
            })
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to change list. Please try again')
        }
    })

export const getLists = createAsyncThunk(
    'list/get',
    async (thunkAPI) => {
        try {
            const { data } = await getListAPI({})
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to retrieve list. Please try again')
        }
    })

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {

    },
    extraReducers: {
        [createList.pending.type]: (state) => {
            state.loading = true;
        },
        [createList.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.lists.push(action.payload)
            }
            state.loading = false;
            state.error = null;
        },
        [createList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [getLists.pending.type]: (state) => {
            state.loading = true;
        },
        [getLists.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.lists = action.payload
            }
            state.loading = false;
            state.error = null;
        },
        [getLists.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deleteList.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteList.fulfilled.type]: (state, action) => {
            if (action.payload && action.payload[DELETE_STATUS] === true) {
                state.lists = state.lists.filter(list => list.id != action.payload[DELETE_PK])
            }
            state.loading = false;
            state.error = null;
        },
        [deleteList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [changeList.pending.type]: (state) => {
            state.loading = true;
        },
        [changeList.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.lists = state.lists.filter(list => list.id != action.payload.id)
                state.lists.push(action.payload)
            }
            state.loading = false;
            state.error = null;
        },
        [changeList.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})
