import { CreateListModal, Navbar, List } from "../components"
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector, createList, changeList, getLists, getProducts } from "../redux";
import { ListModal } from "../components/ListModal";
import { findTotalAndChecked } from "../utils";


export const Dashboard:React.FC = () => {

    const dispatch = useAppDispatch();
    const lists = useAppSelector(state => state.list.lists)
    const products = useAppSelector(state => state.product.products);

    useEffect(() => {
       dispatch(getLists());
       dispatch(getProducts());
      }, []);

    const [createListModalVisible, toggleCreateListModal] = useState(false)
    const [listModalVisible, toggleListModal] = useState(false)
    const [selectedListIndex, setSelectedListIndex] = useState(0)
    const [isUpdatingList, setIsUpdatingList] = useState(false)

    const onListCreate = async (values: any) => {
        dispatch(createList({
            name: values.name,
            color: values.color,
            description: values.description
        }))
        .then((res)=> {
        })
    }

    const onListChange = async (values: any) => {
        dispatch(changeList({
            pk: values.pk,
            name: values.name,
            color: values.color,
            description: values.description
        }))
        .then((res)=> {
        })
    }
    
    const listModalProps = {
        listModalVisible,
        toggleListModal,
        createListModalVisible,
        toggleCreateListModal,
        isUpdatingList, 
        setIsUpdatingList,
        list: lists[selectedListIndex],
    }

    const createListModalProps = {
        createListModalVisible,
        toggleCreateListModal,
        isUpdatingList, 
        setIsUpdatingList,
        onListCreate: onListCreate,
        onListChange: onListChange,
        list: lists[selectedListIndex],
    }

    return (
    <div className="bg-lime-50 h-screen">
        <Navbar {...createListModalProps}/>
        <hr className="my-3"/>
        {createListModalVisible && <CreateListModal {...createListModalProps}/>}
        {listModalVisible && <ListModal {...listModalProps}/>}
        <div className="flex flex-wrap justify-center">
            {
            lists.map((list, index: number) => {
                const ratio = findTotalAndChecked(products, list.id)
                const listProps = {
                    name: list.name,
                    color: list.color,
                    ratio,
                    list,
                    index,
                    listModalVisible,
                    setSelectedListIndex,
                    toggleListModal,
                }
                return (
                    <List key={index} {...listProps}/>
                )
            })}                
        </div>
    </div>
    )
}