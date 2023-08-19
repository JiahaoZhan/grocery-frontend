import { getSharedList, shareList, useAppDispatch} from "../redux"
import { List as shoppingList } from "../redux"
import { COLORS, BASE_COLOR, BORDER_COLOR, BG_COLOR, TEXT_COLOR, HOVER_TEXT_COLOR } from "../utils"

interface IProps {
    name: string,
    ratio: string,
    color: string,
    list: shoppingList,
    index: number,
    listModalVisible: boolean,
    setSelectedListIndex: (index: number) => void
    toggleListModal: (visible: boolean) => void
}

export const List:React.FC<IProps> = ({name, ratio, list, color, index, listModalVisible, toggleListModal, setSelectedListIndex}) => {
    let borderColor = ""
    let textColor = ""
    let bgColor = ""
    let hoverTextColor = ""

    const dispatch = useAppDispatch();

    for (const COLOR of COLORS) {
        if (color === COLOR[BASE_COLOR]) {
            borderColor = COLOR[BORDER_COLOR]
            bgColor = COLOR[BG_COLOR]
            textColor = COLOR[TEXT_COLOR]
            hoverTextColor = COLOR[HOVER_TEXT_COLOR]
            break;
        }
    }
    return (
        <div onClick={(e)=>{
                        e.preventDefault();
                        setSelectedListIndex(index);
                        toggleListModal(!listModalVisible)}}
        className={`m-2 border-2 ${bgColor} ${borderColor} grid grid-cols-3 gap-4 rounded-lg px-4 py-1 text-white font-medium hover:bg-white ${hoverTextColor}`}>
            <div className="col-span-2 font-medium">
                <div >{name}</div>
                <div>{ratio}</div>
            </div>
            <div className="col-span-1 items-center justify-center">
                <button 
                onClick = {(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(list.id)
                    dispatch(shareList({
                        list_name: list.name,
                        list_id: list.id,
                    }))
                }}
                className="w-full h-full"><i className="fa-solid fa-share fa-lg"></i></button>
            </div>
        </div>
    )
}