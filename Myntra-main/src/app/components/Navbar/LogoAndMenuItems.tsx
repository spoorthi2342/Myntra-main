"use client"
import Link from 'next/link'
import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import logo from '../../../images/th (1).jpeg'
import Preloader from "../Preloader"

export default function LogoAndMenuItems() {
  const [isLoading, setIsLoading] = useState(false)

  const handleTryOnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate loading time before navigating to the try-on page
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/try-on"
    }, 3000)
  }

  return (
    
    
    <div className="flex items-center ">
       {isLoading && <Preloader />}
    <Link href={"/"}>
    <Image
    src={logo}
    alt='logo'
    className=" lg:w-6 md:h-5 max-sm:h-8 max-sm:mr-1 md:mx-5"

    /> 
    </Link>
    {/* Menu Items */}
    <ul className="flex md:space-x-6 max-sm:space-x-2">
      <li>
        <Link
          href="/shop"
          className="font-semibold md:text-sm  max-sm:text-xs"
        >
          MEN
        </Link>
      </li>
      <li>
        <Link
          href="/shop"
          className="font-semibold md:text-sm   max-sm:text-xs"
        >
          WOMEN
        </Link>
      </li>
      <li>
        <Link
          href={"/shop"}
          className="font-semibold max-sm:text-xs text-sm"
        >
          KIDS
        </Link>
      </li>
      <li>
        <Link
          href={"/shop"}
          className="font-semibold max-sm:text-xs text-sm"
        >
          HOME & LIVING
        </Link>
      </li>
      <li>
     
        <Link
          href={"/shop"}
          className="font-semibold max-sm:text-xs text-sm"
        >
          BEAUTY
        </Link>
      </li>
      <li>
        <Link
          href={"/shop"}
          className="font-semibold max-sm:text-xs text-sm"
        >
          STUDIO
        </Link>
      </li>
      <li>
          <a
            href="/try-on"
            className="font-semibold max-sm:text-xs text-sm"
            onClick={handleTryOnClick}
          >
            TRY-ON
          </a>
        </li>
    </ul>
  </div>
  )
}
