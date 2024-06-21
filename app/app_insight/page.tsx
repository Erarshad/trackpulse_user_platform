'use client'
import { appName, headerThemeColor } from "../global_const";
import { AppData } from "../utils/type";
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";
import { useEffect, useState } from "react";
import { AppSessionTabBody } from "./app_session";
import { fetchEvents, fetchSpecificEvent } from "@/services/network";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "../utils/loader";
import { json } from "stream/consumers";

function AppInsight({
    searchParams
}: {
    searchParams: {
        query: string
    }
}) {
    const [currentTab, setTabIdx] = useState(1);
    const [getSession, setSession] = useState({});
    //from appdashboard sessiion list 
    let carryForwardedData = JSON.parse(searchParams.query);
    let appData = (carryForwardedData.appdata) as AppData;
    let guestId = (carryForwardedData.guestId);
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        fetchSpecificEvent(appData.email, guestId, appData.AppId).then((res) => res.json()).then((jsonResponse) => {
            if (jsonResponse != null) {
                let eventData = jsonResponse.data;
                if (eventData != null) {
                    setSession(JSON.parse(eventData.appSession));
                }
            }


        }).catch((error) => {
            console.error('Error fetching events:', error);
        });


        setBusy(false);




    }, [null])

    if (isBusy == true) {
        return (<Loader></Loader>);
    } else {


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
                <a role="tab" className={`tab  ${currentTab == 1 ? headerThemeColor : ""}`} onClick={() => {
                    setTabIdx(1);
                }}>All</a>
                <a role="tab" className={`tab ${currentTab == 2 ? headerThemeColor : ""}`} onClick={() => {
                    setTabIdx(2);
                }}>App Errors</a>
                <a role="tab" className={`tab  ${currentTab == 3 ? headerThemeColor : ""}`} onClick={() => {
                    setTabIdx(3);
                }}>App Events</a>
                <a role="tab" className={`tab  ${currentTab == 4 ? headerThemeColor : ""}`} onClick={() => {
                    setTabIdx(4);
                }}>App Session</a>
            </div>
             { currentTab==4?
             <AppSessionTabBody appSession={getSession} ></AppSessionTabBody>:<></>
             }





        </>)

    }

}

export default AppInsight;