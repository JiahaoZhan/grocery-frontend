import { useState } from "react"
import { Link } from "react-router-dom"
import { getAllSharedList, logOut, useAppDispatch, useAppSelector } from "../redux"

interface IProps {
  createListModalVisible: boolean
  toggleCreateListModal: (event: any) => void
}

export const Navbar: React.FC<IProps> = ({ toggleCreateListModal, createListModalVisible }) => {
  const [visible, toggle] = useState(false)
  const jwt = useAppSelector(state => state.user.access)
  const dispatch = useAppDispatch();
  const navToggle = () => {
    toggle(!visible)
  }
  return (
    <nav className="container relative mx-auto pt-5 items-center">
      {/* <!-- Flex Container For Nav Items --> */}
      <div className="flex items-center  justify-center">
        {/* <!-- Logo --> */}
        <div className="z-30">
          <img src="images/logo-bookmark.svg" alt="" id="logo" />
        </div>

        {/* <!-- Menu Items --> */}
        <div
          className="hidden items-center space-x-10 text-grayishBlue md:flex md:items-center"
        >
          {/* <button className="px-5 py-2 text-white bg-darkTeal border-2 border-darkTeal rounded-lg shadow-md hover:text-darkTeal hover:bg-white">
                <i className="fa-solid fa-list mx-1"></i><span>All</span>
            </button>    */}


          <Link onClick={() => {
            dispatch(getAllSharedList(null))
          }} className="px-5 py-2 text-white bg-darkTeal border-2 border-darkTeal rounded-lg shadow-md hover:text-darkTeal hover:bg-white" to="/shared_tokens"><i className="fa-solid fa-list mx-1"></i><span>Shared Tokens</span></Link>

          <button onClick={() => toggleCreateListModal(!createListModalVisible)}
            className="px-5 py-2 text-white bg-darkTeal border-2 border-darkTeal rounded-lg shadow-md hover:text-darkTeal hover:bg-white">
            <i className="fa-solid fa-plus mx-1"></i><span>List</span>
          </button>
          {/* <button className="px-5 py-2 text-white bg-darkTeal border-2 border-darkTeal rounded-lg shadow-md hover:text-darkTeal hover:bg-white">
                <i className="fa-solid fa-warehouse mx-1"></i><span>Pantry</span>
            </button> */}

          {jwt ? <Link to="/" onClick={() => { dispatch(logOut()) }} className="px-5 py-2 text-white bg-darkOrange border-2 border-darkOrange rounded-lg shadow-md hover:text-darkOrange hover:bg-white">Logout</Link> :
            <Link to="/" className="px-5 py-2 text-white bg-darkOrange border-2 border-darkOrange rounded-lg shadow-md hover:text-darkOrange hover:bg-white">Login</Link>
          }
        </div>
        {/* <!-- Hamburger Button --> */}
        <button
          onClick={navToggle}
          className={`${visible ? "open" : ""} z-30 block md:hidden focus:outline-none hamburger`}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      {/* <!-- Mobile Menu --> */}
      <div
        id="menu"
        className={`${visible ? "" : "hidden flex"} text-xl fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white divide-y divide-gray-500 opacity-90 bg-veryDarkBlue`}
      >
        <div className="w-full py-3 text-center">
        <Link onClick={() => {
            dispatch(getAllSharedList(null))
          }} className="block hover:text-darkOrange" to="/shared_tokens"><i className="fa-solid fa-list mx-2"></i><span>Shared Tokens</span></Link>
        </div>
        <div className="w-full py-3 text-center">
          <button onClick={() => {
            toggleCreateListModal(!createListModalVisible)
            toggle(false)
          }}
            className="block w-full hover:text-darkOrange">
            <i className="fa-solid fa-plus mx-2"></i><span>List</span>
          </button>
        </div>
        <div className="w-full py-3 text-center">
          {jwt ? <Link onClick={() => { dispatch(logOut()) }} to="/" className="block hover:text-darkOrange"><i className="fa-solid fa-right-from-bracket mx-2"></i>Log Out</Link> :
            <Link to="/" className="block hover:text-darkOrange">Login</Link>
          }
        </div>
      </div>
    </nav>
  )
}