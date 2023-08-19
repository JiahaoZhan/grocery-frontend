import { useState } from "react"
import { useAppSelector } from "../redux";

interface IProps {
    createProductModalVisible: boolean
    toggleCreateProductModal: (event: any) => void
    onSubmit: (event: any) => void
}

export const createProductModal: React.FC<IProps> = ({ toggleCreateProductModal, createProductModalVisible, onSubmit }) => {
    const colors = [
        "bg-orange-500",
        "bg-amber-500"
    ]

    const [color, setColor] = useState("bg-orange-500");
    const [name, setName] = useState("");
    const [note, setNote] = useState("");

    const formHandler = (e) => {
        e.preventDefault();
        toggleCreateProductModal(!createProductModalVisible)
    }

    return (<>
        {/* <!-- Main modal --> */}
        <div id="defaultModal" aria-hidden="true" className={`${createProductModalVisible ? "" : "hidden"} bg-black bg-opacity-50 fixed z-50 inset-0 justify-center w-full items-center z-50`}>
            <div className="relative p-4 w-full ">
                {/* <!-- Modal content --> */}
                <div className="bg-lime-100 relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-center rounded-t sm:mb-5 dark:border-gray-600">
                        <button
                            onClick={() => {
                                toggleCreateProductModal(!createProductModalVisible)
                            }}
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form action="#">
                        <div className="grid gap-4 mb-4 grid-cols-1">
                            <div>
                                <input onChange={(e) => {
                                    e.preventDefault()
                                    setName(e.target.value)
                                }} type="text"
                                    name="name"
                                    className={`${color} p-5 border-2 border-gray-200 text-red text-md rounded-lg block w-full placeholder-white`} placeholder="Name of the new list..." />
                            </div>
                            <ul className="flex justify-left flex-wrap">
                                
                                {colors.map((color, index: number) => {
                                    return <li key={index}><button onClick={(e) => {
                                        e.preventDefault()
                                        setColor(color)
                                    }}
                                        className={`h-7 w-7 mx-1 border-gray-200 border-2 rounded-3xl ${color}`}></button></li>
                                })}
                            </ul>
                            <div>
                                <textarea id="note" onChange={(e) => {
                                    e.preventDefault()
                                    setNote(e.target.value);
                                }} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write some descriptions..."></textarea>
                            </div>
                        </div>
                        <button onClick={formHandler} type="submit" className="text-white bg-red-400 items-center rounded-lg w-full px-3 py-2">
                            SAVE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}