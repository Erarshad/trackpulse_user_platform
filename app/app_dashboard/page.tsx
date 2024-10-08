'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { decodeHash } from '../utils/hashed_path';
import { AppData, eventData } from '../utils/type';
import { appName, headerThemeColor } from '../global_const';
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCalculator } from '@fortawesome/free-solid-svg-icons';
import millify from 'millify';
import Session_list from './session_list';
import {fetchEvents, fetchSessionCount } from '../../services/network';
import { onlyDate } from '../utils/date_compare';
import Loader from '../utils/loader';
export default function DashBoard({
    searchParams
}: {
    searchParams: {
        query: string
    }
}) {

  const [totalSessions, setTotalSessions] = useState(0);
  const [SessionsInAWeek, setSessionsInAWeek] = useState(0);
  const [sessionsWithinMonth, setSessionsWithinMonth] = useState(0);
  const [sessionsWithinToday, setSessionsWithinToday] = useState(0);
  const [events, setEvents]= useState<eventData[]>([]);
  const [isBusy, setBusy] = useState(true);
  const [isExpired, setExpired] = useState<Date>();
  let [currentPage,setCurrentPage]=useState(1);
  let appData= JSON.parse(searchParams.query) as AppData;

  function getTheEvents(page:number,initialFetch:boolean){
    if(initialFetch==true){ //if it is not a call for first page 
      setBusy(true);
    }
    fetchEvents(page,appData.userEmail,appData.AppId).then((res)=>res.json()).then((jsonResponse)=>{
      let eventsData = jsonResponse.data ?? [];
      setEvents(eventsData);
    }).catch((error) => {
      console.error('Error fetching events:', error);
   });

   if(initialFetch==false){
    setBusy(false);
   }

  }
    
  useEffect(() => {
    setBusy(true);
    fetchSessionCount(appData.AppId,appData.userEmail).then((res) => res.json()) 
    .then((jsonResponse) => {
       if(jsonResponse.data!=null){
         let counts = jsonResponse.data ?? [];
         if(counts.length>0){
          counts=counts[0];
          setTotalSessions(counts.total_events);
          setSessionsInAWeek(counts.events_last_7_days);
          setSessionsWithinMonth(counts.events_last_30_days);
          setSessionsWithinToday(counts.events_today);
          setExpired(onlyDate(appData.Expiry));
         }
       }
    })
    .catch((error) => {
        console.error('Error fetching counts of session:', error);
    });

     getTheEvents(currentPage,true);

    setBusy(false);
  }, []);

  
   if(isBusy==true){
    return ( <Loader></Loader>);
            
   }else{

    return (<>
           {/* top notification */}
      { isExpired != null && isExpired < onlyDate() ?
        <div className="w-full p-1 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold flex items-center justify-center">
          Your plan has expired. Please upgrade to continue using our service. If you do not update the plan, your data will be removed after 30 days.
        </div>:<></>
     }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary p-4 text-white rounded-lg shadow-lg">
          <div className="overflow-clip">
            <FontAwesomeIcon icon={faCalculator} className="mx-2 h-10 w-10"></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(totalSessions)}
            </span>
          </div>
          <span className="px-3 text-sm sm:text-lg md:text-xl lg:text-2xl">sessions in lifetime</span>
        </div>

        <div className="bg-secondary p-4 text-white rounded-lg shadow-lg">
          <div className="overflow-clip">
            <FontAwesomeIcon icon={faCalculator} className="mx-2 h-10 w-10"></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(sessionsWithinMonth)}
            </span>
          </div>
          <span className="px-3 text-xs sm:text-lg md:text-xl lg:text-2xl">sessions in month</span>
        </div>

        <div className="bg-indigo-500 p-4 text-white rounded-lg shadow-lg">
          <div className="overflow-clip">
            <FontAwesomeIcon icon={faCalculator} className="mx-2 h-10 w-10"></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(SessionsInAWeek)}
            </span>
          </div>
          <span className="px-3 text-xs sm:text-lg md:text-xl lg:text-2xl">sessions in week</span>
        </div>

        <div className="bg-primary p-4 text-white rounded-lg shadow-lg">
          <div className="overflow-clip">
            <FontAwesomeIcon icon={faCalculator} className="mx-2 h-10 w-5"></FontAwesomeIcon>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl items-center justify-center">
              {millify(sessionsWithinToday)}
            </span>
          </div>
          <span className="px-3 text-sm sm:text-lg md:text-xl lg:text-2xl">Today's Sessions</span>
        </div>
      </div>
    </div>
  {/*========================================================= */}


   {/* INFO TILES ENDED */}
   { totalSessions>0?
   <div className="px-2 join items-end justify-end flex">
    <button className={`join-item btn btn-outline ${currentPage==1?"btn-disabled":""} border-yellow-600 `} onClick={()=>{
      currentPage--;
      setCurrentPage(currentPage);
      getTheEvents(currentPage,false);
    }}>Previous page</button>
      <button className={`join-item btn btn-outline ${events.length==0?"btn-disabled":""} border-yellow-600`}onClick={()=>{
        currentPage++;
        setCurrentPage(currentPage);
        getTheEvents(currentPage,false);
 
      }} >Next</button>
   </div>:<></>}
    {/* --- */}
   <Session_list event={events} appData={appData}></Session_list>




              




    </>
       
    );

  }
}

