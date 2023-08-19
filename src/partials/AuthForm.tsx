import { useState } from "react" 
import { Link } from "react-router-dom"

interface IProps {
    title: string
    type: string,
    onSubmit: (event: any) => void
}

export const AuthForm: React.FC<IProps> = ({title, type, onSubmit}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const formHandler = (e) => {
        e.preventDefault();
        onSubmit({email, password, phone});
    }

    return (
    <div className="relative min-h-screen flex">
        <div
            className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
            <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
            >
                <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
                <div className="w-full max-w-md z-10">
                    <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">GrocerEase</div>
                    <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                        Discover the power of organization with GrocerEase - your ultimate shopping list companion. Revolutionize the way you shop by creating and managing your shopping lists effortlessly. Whether you're planning weekly groceries, a special recipe, or a last-minute run, GrocerEase keeps your lists sorted and accessible wherever you go. With a user-friendly interface, you can quickly add items, categorize them, and even set reminders. Never miss an essential item again and make every trip to the store a breeze. Simplify your shopping experience with GrocerEase – the smart choice for staying organized and in control. Download now and make your lists smarter, shopping simpler.</div>
                </div>
                
            </div>
            <div
                className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                <div className="max-w-md w-full mx-auto space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
                        {/* <p className="mt-2 text-sm text-gray-500">Third Party Login</p> */}
                    </div>
                    {/* { type == "login"? 
                    <div className="flex flex-row justify-center items-center space-x-3">
                        <a href=""
                        className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
                        <img
                            className="w-4 h-4"
                            src="" /></a>
                        <a href=""
                            className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg text-white bg-blue-400 hover:shadow-lg cursor-pointer transition ease-in duration-300">
                            <img
                                className="w-4 h-4"
                                src="" /></a>
                        <a href=""
                            className="w-11 h-11 items-center justify-center inline-flex rounded-2xl font-bold text-lg text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300">
                            <img
                                src=""
                                className="w-4 h-4" /></a>
                                
                    </div> : <></>} */}
                    <div className="flex items-center justify-center space-x-2"><span className="h-px w-16 bg-gray-200"></span>
                        <span className="text-gray-300 font-normal">Email</span> <span
                            className="h-px w-16 bg-gray-200"></span></div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="relative"><label
                            className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
                            <input
                                onChange={(e)=>{setEmail(e.target.value);}}
                                name="email"
                                className="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                                placeholder="Email" /></div>
                        <div className="mt-8 content-center"><label
                            className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Password</label>
                            <input
                                onChange={(e)=>{setPassword(e.target.value);}}
                                name="password"
                                className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                                type="password" placeholder="Password" />
                        </div>
                        {type == "register" ? <div className="mt-8 content-center"><label
                            className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Phone</label>
                            <input
                                onChange={(e)=>{setPhone(e.target.value);}}
                                name="phone"
                                className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                                placeholder="Phone" />
                        </div> : <></> }
                        {type == "login" ? <div className="flex items-center justify-between">
                            {/* <div className="flex items-center"><input id="remember_me" name="remember_me" type="checkbox"
                                className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" /><label
                                    htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label></div>
                            <div className="text-sm"><a href="#" className="text-indigo-400 hover:text-blue-500">Forget password?</a></div> */}
                        </div> : <></>}
                        <div>
                            <button type="submit"
                            onClick={formHandler}
                            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">{type == "login" ? "Login" : "Register"}
                            </button>
                        </div>
                        {type == "login" ? <p className="items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>Do not have an account?</span> <Link to="/register"
                                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Register</Link>
                        </p> : <p className="items-center justify-center mt-10 text-center text-md text-gray-500">
                            <span>Already have an account?</span> <Link to="/login"
                                className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Login</Link>
                        </p>}
                    </form>
                </div>
            </div>
        </div>
    </div>)
}