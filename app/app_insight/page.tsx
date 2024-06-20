'use client'
import { appName, headerThemeColor } from "../global_const";
import { AppData } from "../utils/type";
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";
import { useEffect, useState } from "react";
 import { AppSessionTabBody } from "./AppSessionTabBody";

import { fetchEvents } from "@/services/network";

function AppInsight({
    searchParams
}: {
    searchParams: {
        query: string
    }
}){
    const [currentTab, setTabIdx] = useState(1);
    let appData= JSON.parse(searchParams.query) as AppData;


    useEffect(()=>{
   
    
    },[])


    return (<>
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
        {/* =====nav bar ended */}
        {/* tab bar started */}
        <div role="tablist" className="tabs tabs-boxed">
        <a role="tab" className={`tab  ${currentTab==1?headerThemeColor:""}`} onClick={()=>{
            setTabIdx(1);
        }}>All</a>
        <a role="tab" className={`tab ${currentTab==2?headerThemeColor:""}`} onClick={()=>{
            setTabIdx(2);
        }}>App Errors</a>
        <a role="tab" className={`tab  ${currentTab==3?headerThemeColor:""}`} onClick={()=>{
            setTabIdx(3);
        }}>App Events</a>
        <a role="tab" className={`tab  ${currentTab==4?headerThemeColor:""}`} onClick={()=>{
            setTabIdx(4);
        }}>App Session</a>
        </div>

        <AppSessionTabBody></AppSessionTabBody>

    



    </>)

}

export default AppInsight;