import React from 'react'
import MobileSidebar from './MobileSidebar'
import PcHeader from './PcHeader'
import Link from 'next/link'

const Header = () => {
  return (
    <>
        <div className="hidden lg:block">
            <PcHeader />
        </div>
        <div className="lg:hidden">
            <MobileSidebar />
        </div>
    </>
  )
}

export default Header
