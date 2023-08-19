import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createProductAPI, deleteProductAPI, getProductAPI, DELETE_STATUS, DELETE_PK, changeProductAPI } from "../../utils"

export interface Product {
    id: number,
    name: string,
    note: string,
    quantity: string,
    checked: boolean,
    list: number,
}

export interface ProductState {
    loading: boolean,
    error: string | null,
    products: Product[]
}

const initialState: ProductState = {
    loading: false,
    error: null,
    products: []
}

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (parameters: { name: string, note: string, list_id: number | undefined }, thunkAPI) => {
        try {
            console.log("Axios: ",  parameters.note)
            const { data } = await createProductAPI({
                name: parameters.name,
                note: parameters.note,
                list: parameters.list_id
            })
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to create product. Please try again')
        }
    })

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (thunkAPI) => {
        try {
            const { data } = await getProductAPI({})
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to retrieve Product. Please try again')
        }
    })

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (parameters: { productPk: number }, thunkAPI) => {
        try {
            const { data } = await deleteProductAPI({
                pk: parameters.productPk
            })
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to retrieve Product. Please try again')
        }
    })

export const changeProduct = createAsyncThunk(
    'product/changeProduct',
    async (parameters: { productPk: number, checked: boolean, name: string, note: string, list_id: number | undefined }, thunkAPI) => {
        try {
            const { data } = await changeProductAPI({
                pk: parameters.productPk,
                name: parameters.name,
                note: parameters.note,
                checked: parameters.checked,
                list: parameters.list_id
            })
            return data
        } catch (error) {
            console.log(error);
            alert('Fail to change list. Please try again')
        }
    })


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: {
        [createProduct.pending.type]: (state) => {
            state.loading = true;
        },
        [createProduct.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.products.push(action.payload)
            }
            state.loading = false;
            state.error = null;
        },
        [createProduct.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [getProducts.pending.type]: (state) => {
            state.loading = true;
        },
        [getProducts.fulfilled.type]: (state, action) => {
            if (action.payload) {
                state.products = action.payload
            }
            state.loading = false;
            state.error = null;
        },
        [getProducts.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deleteProduct.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled.type]: (state, action) => {
            if (action.payload && action.payload[DELETE_STATUS] === true) {
                state.products = state.products.filter(product => product.id != action.payload[DELETE_PK])
                // state.products.sort()
            }
            state.loading = false;
            state.error = null;
        },
        [deleteProduct.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [changeProduct.pending.type]: (state) => {
            state.loading = true;
        },
        [changeProduct.fulfilled.type]: (state, action) => {
            if (action.payload) {
                console.log("Axios:", action.payload)
                state.products = state.products.filter(product => product.id != action.payload.id)
                state.products.push(action.payload)
            }
            state.loading = false;
            state.error = null;
        },
        [changeProduct.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})
