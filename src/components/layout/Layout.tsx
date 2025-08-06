import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserInterface } from '../../utils/interfaces/user.interface'

function Layout() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentUser:UserInterface = useSelector((state:any)=>state.user.value[0])
    // const User:UserInterface = useSelector((state:any)=>state.user)
    // console.log(User)
    return (
        <div className="flex">
            <Sidebar user={currentUser} />
            <main className="flex-1 p-6 bg-gray-100 ml-52">
                <Header />
                {/* c’est ici que vont s’insérer les pages (DashboardPage, etc.) */}
                <Outlet />
            </main>
        </div>
    )
}

export default Layout