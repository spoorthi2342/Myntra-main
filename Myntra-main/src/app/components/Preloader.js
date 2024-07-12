// components/Preloader.js
import React from 'react'

export default function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img src="https://cdn0.iconfinder.com/data/icons/basic-set-vol-2/100/preloader-512.png" alt="Loading..." />
    </div>
  )
}
