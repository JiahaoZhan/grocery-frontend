import { useEffect } from "react"
import { SharedListForm } from "../components"
import { getSharedList, useAppDispatch } from "../redux"
import { useParams } from "react-router-dom"

export const SharedList:React.FC = () => {
    const dispatch = useAppDispatch()
    const { access_token } = useParams();
    useEffect(()=>{
        dispatch(getSharedList(
            {
                access_token: access_token?  access_token : ""
            }
        ))
    },[])
    return (
        <SharedListForm />
    )
}