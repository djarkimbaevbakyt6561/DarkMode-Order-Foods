import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import AdminModal from '../components/admin/AdminModal'
import FoodsModal from '../components/admin/foods/FoodsModal'

const AdminLayout = () => {
  const foods = useSelector((state) => state.foods) 
  return (
    <>
      <Outlet/>
      <AdminModal />
      {foods.open && <FoodsModal/>}
    </>
  )
}

export default AdminLayout
