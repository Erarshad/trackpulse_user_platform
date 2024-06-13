'use client'
import { useParams } from 'next/navigation';
import React from 'react'
import { decodeHash } from '../utils/hashed_path';
import { AppData } from '../app_canvas/type';
import { appName, headerThemeColor } from '../global_const';
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCalculator } from '@fortawesome/free-solid-svg-icons';
import millify from 'millify';
export default function DashBoard({
    searchParams
}: {
    searchParams: {
        appData: AppData
    }
}) {
    console.log("data is  " + searchParams.appData);
    return (<>
        {/* navbar started */}
        <div className={`navbar sticky top-0 z-50 ${headerThemeColor}`}>
        <div className="navbar-start">
            <Image src={logo} alt={appName} objectFit="contain" width={250} height={80}></Image>
        </div>

        <div className="avatar placeholder navbar-end">
            <div className="bg-transparent text-neutral-content rounded-full w-9 h-9">
                <Image src={user_icon} alt={'User'} className='w-10 h-10'></Image>
            </div>
        </div>

      </div>
     {/* navbar ended, todo at last we have to ceneteralized the nav bar\ */}
     <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary p-4 text-white">
            <div className='overflow-clip'>
            <FontAwesomeIcon icon={faCalculator} className='mx-2 h-10 w-10'></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(3957774675555555)}
            </span>
            </div>
            <span className="px-3 text-sm sm:text-lg md:text-xl lg:text-2xl">
             sessions in lifetime
            </span>
           
        </div>
        <div className="bg-secondary p-4 text-white">
        <div className='overflow-clip'>
            <FontAwesomeIcon icon={faCalculator} className='mx-2 h-10 w-10'></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(3957774675)}
            </span>
            </div>
            <span className="px-3 text-xs sm:text-lg md:text-xl lg:text-2xl">
              sessions in month
            </span>
           
        </div>
        <div className="bg-accent p-4 text-white">  <div className='overflow-clip'>
            <FontAwesomeIcon icon={faCalculator} className='mx-2 h-10 w-10'></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(395777467587)}
            </span>
            </div>
            <span className="px-3 text-xs sm:text-lg md:text-xl lg:text-2xl">
              sessions in week
            </span>
           </div>
      </div>
    </div>


    </>
       
    );
}

