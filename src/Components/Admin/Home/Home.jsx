import React from 'react'
import {Link} from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function Home() {
  return (
    <div>
        {/* <Link to={"/admin/user"} >User</Link>
        <Link to={"/admin/product"} >product</Link> */}
        <Sidebar />
    </div>
  )
}
