
import { Product } from "../redux"
import { useEffect } from "react"

interface IProps {
    setName: (event: any) => void,
    setNote: (event: any) => void,
    isChangeProduct: boolean,
    product: Product,
}

export const ProductRow: React.FC<IProps> = ({setName, setNote, isChangeProduct, product}) => {
    useEffect(() => {
        if (isChangeProduct) {
            setName(product.name)
            setNote(product.note)
        }
    },[]);
    return (
        <>
            <input
                defaultValue = {isChangeProduct? product.name : ""}
                onChange={(e) => {
                    e.preventDefault()
                    setName(e.target.value)
                }} className="p-5 border-2 border-gray-200 text-red text-md rounded-lg block w-full placeholder-white" placeholder="Name of the product" type="text" name="name" />
            <textarea
                defaultValue = {isChangeProduct? product.note : ""}
                onChange={(e) => {
                    e.preventDefault()
                    setNote(e.target.value)
                }}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write some descriptions..." name="note" cols={10} rows={3}></textarea>
        </>
    )
}