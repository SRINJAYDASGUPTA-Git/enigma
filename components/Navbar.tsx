"use client"
import { ActiveElement, NavbarProps } from '@/types/type'
import Image from 'next/image';
import React, { memo } from 'react'
import ActiveUsers from './users/ActiveUsers';
const Navbar = ({activeElement}:NavbarProps) => {
    const isActive = (value:string | Array<ActiveElement>) =>
        (activeElement && activeElement.value === value)|| 
        (Array.isArray(value) && value.some((val)=>val?.value === activeElement?.value));
  return (
    <nav className='flex-between select-none gap-4 bg-primary-black px-5 text-white '>
        <Image src='/assets/logo.svg' alt='Enigma Logo' width={58} height={20} />
        <ActiveUsers />
    </nav>
  )
}

export default memo(Navbar, (prevProps, nextProps)=>prevProps.activeElement === nextProps.activeElement);