// components/YourComponent.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import chatbot from "../../../images/th.jpeg";

const Stylish = () => {
  return (
    <div>
      <Link href="/Interface">
        <div className='fixed bottom-20 right-4 w-45 h-10 space-x-2 font-semibold bg-white rounded-md shadow-lg flex items-center justify-center transform transition-transform duration-300 cursor-pointer z-10'>
          <Image
            src={chatbot}
            alt='chat bot'
            height={40}
            width={40} 
            className='rounded-full'
          />
          <span>Chat with Maya</span>
        </div>
      </Link>
      <Link href="/TryFashion">
        <div className="fixed bottom-4 right-4 w-40 h-10 space-x-2 font-bold border-black bg-white text-black rounded-md shadow-lg flex items-center justify-center transform transition-transform duration-300 cursor-pointer z-10">
          <div className="flex items-center space-x-2">
            <img 
              src="https://assets.thehansindia.com/h-upload/2020/01/31/258992-myntra.jpg"
              alt="My Stylist"
              className="w-9 h-7 rounded-full"
            />
            <span>My Stylist</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Stylish;
