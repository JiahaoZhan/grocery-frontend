import { useState } from "react"
import { List, useAppDispatch, useAppSelector, createProduct, deleteProduct, changeProduct } from "../redux"
import { capitalizeStartOfEveryWord } from "../utils/formatFunc"
import { deleteList } from "../redux"
import { ProductRow } from "./ProductRow"

interface IProps {
    listModalVisible: boolean,
    toggleListModal: (event: any) => void,
    createListModalVisible: boolean,
    toggleCreateListModal: (event: any) => void,
    setIsUpdatingList: (event: any) => void,
    isUpdatingList: boolean
    list: List 
}

export const ListModal: React.FC<IProps> = ({ toggleListModal, toggleCreateListModal, setIsUpdatingList, isUpdatingList, listModalVisible, createListModalVisible, list }) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.product.products.filter(product => product.list == list?.id));
    const [newRowVisible, setNewRowVisible] = useState(false)
    const [addBtnVisible, setAddBtnVisible] = useState(true)
    const [isChangeProduct, setIsChangeProduct] = useState(false)
    const [selectedProductIndex, setSelectedProduct] = useState(0)
    const [name, setName] = useState("")
    const [note, setNote] = useState("")
    const color = list?.color.slice(3)
    const borderColor = `border-${color}`

    const ProductRowProps = {
        isChangeProduct,
        setIsChangeProduct,
        product: products[selectedProductIndex],
        setName,
        setNote,
    }

    return (
        <div id="defaultModal" aria-hidden="true" className="h-screen overflow-auto fixed z-50 inset-0 bg-black bg-opacity-50 justify-center w-full items-center z-50">
            <div className="relative p-4 w-full ">
                {/* <!-- Modal content --> */}
                <div className={`bg-white relative p-4  rounded-lg dark:bg-gray-800 sm:p-5`}>
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-center rounded-t sm:mb-5 dark:border-gray-600">
                        <span className="text-3xl font-medium">{capitalizeStartOfEveryWord(list?.name)}</span>
                        <button
                            onClick={() => {
                                toggleListModal(!listModalVisible)
                                setNewRowVisible(false)
                                setAddBtnVisible(true)
                                setIsUpdatingList(false)
                                setIsChangeProduct(false)
                            }}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="my-5">
                        <ul>
                            {products.map((product, index) => {
                                return (<li className={`px-4 py-2 ${borderColor} rounded-md`} key={index}>
                                        <div className="grid grid-cols-11 gap-2">
                                            <input 
                                            onChange={(e)=>{
                                                e.preventDefault();
                                                setSelectedProduct(index)
                                                dispatch(changeProduct({
                                                    productPk: product.id,
                                                    name: product.name,
                                                    note: product.note,
                                                    checked: !product.checked,
                                                    list_id: list?.id
                                                }))
                                            }}
                                            id={`${product.name}-checkbox`} type="checkbox" checked={product.checked} className="block rounded-xl items-center col-span-1 m-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <div className="col-span-8">
                                                <label htmlFor={`${product.name}-checkbox`} className="w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">{product.name}</label>
                                                <div>{product.note}</div>
                                            </div>
                                            <button 
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                dispatch(deleteProduct({
                                                    productPk: product.id
                                                }))
                                            }}
                                            className="col-span-1"><i className="fa-regular fa-trash-can fa-xl"></i></button>
                                            <button 
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                setSelectedProduct(index)
                                                setIsChangeProduct(!isChangeProduct)
                                                setNewRowVisible(!newRowVisible)
                                                setAddBtnVisible(!addBtnVisible)
                                            }}
                                            className="col-span-1"> <i className="fa-solid fa-pen"></i></button>
                                            
                                        </div>
                              
                                </li>)
                            })}
                            {newRowVisible && <li className="">
                                <ProductRow {...ProductRowProps} />
                            </li>}
                        </ul>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        {addBtnVisible ?
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddBtnVisible(!addBtnVisible)
                                    setNewRowVisible(!newRowVisible)
                                    setIsChangeProduct(false)
                                }}
                                className="text-white mx-2 pr-5 py-2 bg-indigo-600 to-blue-500 opacity-75 hover:opacity-80 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-600 dark:hover:text-white"><div className="mx-1"><i className="fa-solid fa-plus mr-1"></i>Product</div></button>
                            : <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddBtnVisible(!addBtnVisible)
                                    setNewRowVisible(!newRowVisible)
                                    if (isChangeProduct) {
                                        dispatch(changeProduct({
                                            productPk: products[selectedProductIndex].id,
                                            name,
                                            note,
                                            checked: products[selectedProductIndex].checked,
                                            list_id: list?.id
                                        }))
                                        setIsChangeProduct(false)
                                    }
                                    else {
                                        dispatch(createProduct({
                                            name,
                                            note,
                                            list_id: list?.id
                                        }))
                                        setName("")
                                        setNote("")
                                    }
                                }}
                                className="items-center text-white mx-2 px-5 py-2 bg-indigo-600 opacity-75 hover:opacity-80 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-600 dark:hover:text-white">Save</button>}
                                {!addBtnVisible? <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddBtnVisible(true)
                                    setNewRowVisible(false)
                                    setIsChangeProduct(false)
                                }}
                                className="items-center mx-2 text-white px-5 py-2 bg-red-600 opacity-75 hover:opacity-80 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-600 dark:hover:text-white">Cancel</button> :""}
                                {isChangeProduct ? "" : <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setName("")
                                    setNote("")
                                    toggleListModal(!listModalVisible)
                                    dispatch(deleteList({
                                       listPk: list.id
                                    }))
                                }}
                                className="min-w-md mx-2 items-center text-white px-5 py-2 bg-red-600  opacity-75 hover:opacity-80 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-600 dark:hover:text-white">Delete List</button>}
                                {isChangeProduct ? "" : <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleListModal(!listModalVisible);
                                    toggleCreateListModal(!createListModalVisible)
                                    setIsUpdatingList(true)
                                }}
                                className="min-w-md mx-2 items-center text-white px-5 py-2 bg-yellow-600  opacity-75 hover:opacity-80 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-600 dark:hover:text-white">Edit List</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}