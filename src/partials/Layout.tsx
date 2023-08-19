import React from "react";
import { Outlet } from "react-router-dom"
import { Header, Footer } from "./";


export const Layout = () => (
    <div className="flex flex-col h-screen">
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
)
