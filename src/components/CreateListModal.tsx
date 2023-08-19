import { useEffect, useState } from "react"
import { BASE_COLOR, COLORS, BG_COLOR, TEXT_COLOR, BORDER_COLOR, findColor } from "../utils"
import { List } from "../redux"

interface IProps {
    createListModalVisible: boolean
    toggleCreateListModal: (event: any) => void
    isUpdatingList,
    setIsUpdatingList: (event: any) => void
    onListCreate: (event: any) => void
    onListChange: (event: any) => void
    list: List
}

export const CreateListModal: React.FC<IProps> = ({ toggleCreateListModal, setIsUpdatingList, list, isUpdatingList, createListModalVisible, onListChange, onListCreate }) => {
    const [bgColor, setBgColor] = useState("bg-orange-500");
    const [textColor, setTextColor] = useState("text-orange-500")
    const [borderColor, setBorderColor] = useState("border-orange-500")
    const [color, setColor] = useState("orange")
    const [name, setName] = useState(isUpdatingList? list?.name : "");
    const [description, setDescription] = useState(isUpdatingList? list?.description : "");

    useEffect(() => {
        if (true === isUpdatingList) {
            const color = findColor(list.color, COLORS)
            setBgColor(color[BG_COLOR])
        }
    }, [list])

    const formHandler = (e) => {
        e.preventDefault();
        if (true === isUpdatingList) {
            onListChange({ pk: list.id, name, color, description })
        }
        else {
            onListCreate({ name, color, description })
        }
        setIsUpdatingList(false);
        toggleCreateListModal(!createListModalVisible)
    }

    return (<>
        {/* <!-- Main modal --> */}
        <div id="defaultModal" aria-hidden="true" className={`${createListModalVisible ? "" : "hidden"} bg-black bg-opacity-50 fixed z-50 inset-0 justify-center w-full items-center z-50`}>
            <div className="relative p-4 w-full ">
                {/* <!-- Modal content --> */}
                <div className="bg-lime-100 relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-center rounded-t sm:mb-5 dark:border-gray-600">
                        
                        <button
                            onClick={() => {
                                toggleCreateListModal(!createListModalVisible);
                                setIsUpdatingList(false)
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
                                    defaultValue={name}
                                    className={`${bgColor} p-5 border-2 border-gray-200 text-red text-md rounded-lg block w-full placeholder-white`} placeholder="Name of the new list..." />
                            </div>
                            <ul className="flex justify-center flex-wrap">
                                {COLORS.map((color, index: number) => {
                                    return <li key={index}>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setBgColor(color[BG_COLOR])
                                            setTextColor(color[TEXT_COLOR])
                                            setBorderColor(color[BORDER_COLOR])
                                            setColor(color[BASE_COLOR])
                                        }}
                                            className={`h-7 w-7 mx-1 border-gray-200 border-2 rounded-3xl ${color[BG_COLOR]}`}>
                                        </button></li>
                                })}
                            </ul>
                            <div>
                                <textarea defaultValue={description} id="description" onChange={(e) => {
                                    e.preventDefault()
                                    setDescription(e.target.value);
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