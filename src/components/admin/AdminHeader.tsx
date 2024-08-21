import Link from 'next/link'
import React from 'react'

const AdminHeader = () => {
  return (
    <div className='flex flex-col'> 
        <Link
        href={"/admin/users"}
        >Users</Link>
                <Link
        href={"/admin/contacts"}
        >contact</Link>
    </div>
  )
}

export default AdminHeader