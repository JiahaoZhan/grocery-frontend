import { deleteSharedList, useAppDispatch, useAppSelector } from "../redux"
import { Link } from "react-router-dom"

export const SharedTokens = () => {
    const dispatch = useAppDispatch();
    const allTokens = useAppSelector(state => state.sharedList.allTokens)
    return (
        <div className="flex flex-col overflow-auto justify-center ">
            <div className="overflow-y-auto sm:mx-0.5 lg:mx-0.5 mb-2">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-gray-200 border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Name
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        URL
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Action
                                    </th>
                                </tr>   
                            </thead>
                            <tbody>
                                {allTokens.map((token, index) => {
                                    return (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {token.list_name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {`http://${window.location.host}/share/${token.access_token}`}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button 
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    dispatch(deleteSharedList(
                                                        {
                                                            sharedListPk: token.id
                                                        }
                                                    ))
                                                }}    
                                                className="font-medium mx-auto px-5 py-2 text-white bg-red-400 border-2 border-red-400 rounded-lg shadow-md hover:text-red-400 hover:bg-white">Delete</button>
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Link to="/dashboard"
            className="mx-auto px-5 py-2 font-medium text-white bg-darkTeal border-2 border-darkTeal rounded-lg shadow-md hover:text-darkTeal hover:bg-white">
                <span>Dashboard</span>
            </Link>
        </div>
    )
}
