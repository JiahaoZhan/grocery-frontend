import { useAppSelector } from "../redux"

export const SharedListForm: React.FC = () => {
    const list = useAppSelector(state => state.sharedList.list)
    const products = useAppSelector(state => state.sharedList.products)
    return (
    <div>
        <h1 className="text-2xl font-bold">{list?.name}</h1>
        <div className="flex flex-col overflow-auto">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
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
                                        Note
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Checked
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => {
                                    return (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {product.name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {product.note}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {product.checked ? "checked" : "not checked"}
                                            </td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}