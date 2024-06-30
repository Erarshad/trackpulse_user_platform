'use client'
import { appName, headerThemeColor } from "../global_const";
import { AppData } from "../utils/type";
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";
import { useEffect, useState } from "react";
import { AppSessionTabBody } from "./app_session";
import { fetchEvents, fetchSpecificEvent } from "@/services/network";
import { faWarning,faMousePointer,faVideo,faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import Loader from "../utils/loader";
import { json } from "stream/consumers";
import { EventTab } from "./event_tab";
import { AppErrorTab } from "./app_error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AppInsight({
    searchParams
}: {
    searchParams: {
        query: string
    }
}) {
    const [currentTab, setTabIdx] = useState(1);
    const [getSession, setSession] = useState({});
    const [getEvent, setEvent] = useState({});
    const [getError,setError]=useState({});
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
                    setEvent(JSON.parse(eventData.appEvents));
                    setError(JSON.parse(eventData.appErrors));
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
                <a role="tab" className={`tab  ${currentTab == 1 ? headerThemeColor : ""} font-semibold`} onClick={() => {
                    setTabIdx(1);
                }}><FontAwesomeIcon icon={faCircleInfo}  className="px-2 justify-center items-center"></FontAwesomeIcon> Detail</a>
                  <a role="tab" className={`tab  ${currentTab == 2 ? headerThemeColor : ""} font-semibold`} onClick={() => {
                    setTabIdx(2);
                }}><FontAwesomeIcon icon={faVideo}  className="px-2 justify-center items-center"></FontAwesomeIcon> App session</a>
                <a role="tab" className={`tab  ${currentTab == 3 ? headerThemeColor : ""} font-semibold`} onClick={() => {
                    setTabIdx(3);
                }}><FontAwesomeIcon icon={faMousePointer} className="px-2 justify-center items-center"></FontAwesomeIcon>  App events</a>
                <a role="tab" className={`tab ${currentTab == 4 ? headerThemeColor : ""} font-semibold`} onClick={() => {
                    setTabIdx(4);
                }}><FontAwesomeIcon icon={faWarning} className="px-2 justify-center items-center"></FontAwesomeIcon> App errors</a>
              
              
            </div>
             { currentTab==2?
               <AppSessionTabBody appSession={getSession??{}} ></AppSessionTabBody>:<></>
             }
             { currentTab==3?
               <EventTab appEvents={getEvent??{}}  ></EventTab>:<></>
             }

            { currentTab==4?
               <AppErrorTab appError={getError??{}} ></AppErrorTab>:<></>
             }





        </>)

    }

}

export default AppInsight;