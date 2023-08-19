import { 
    createBrowserRouter, 
    Navigate, Route, 
    createRoutesFromElements,
    Outlet } from "react-router-dom";
import { Layout } from "../partials";
import { useAppSelector } from "../redux";
import { Dashboard, Login, Register, SharedList, SharedTokens } from "../pages";

const PrivateRoutes = () => {
    const jwt = useAppSelector(state=>state.user.access)
    return (jwt? <Outlet/> : <Navigate to="/"/>)
}

// Private routes need to be implemented later
export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout/>}>
            <Route element={<PrivateRoutes/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/shared_tokens" element={<SharedTokens/>}/>
            </Route>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/share/:access_token" element={<SharedList/>}/>
        </Route>
    )
)


