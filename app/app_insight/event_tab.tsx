'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { getEvents } from './test_event';
import page from "@/public/page.png";
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

//this for analysis algorithm
const HIGH_CLICK_THRESHOLD = 5;
const REPEATED_CLICK_THRESHOLD = 3;
const HIGH_SCROLL_THRESHOLD = 20;
const RAPID_SCROLL_THRESHOLD = 15;

interface sessionEvent {
    appEvents: any
}

  
function analyzeClickEvents(event: any,currentPage:string) {
    console.log(event);
    let count=1;
    let clicks=event[currentPage].clicks;
    let processingEvent=clicks[0];
    let index=1;
    //  let clickEvent = targetType + ":ttid/:" + targetText + ":ttid/:" + targetId + ":ttid/:" + targetClass;
    while(index<clicks.length){
        if(clicks[index]==clicks[index-1]){
             count++;
            let element = clicks[index].split(":")[0];

        }else{
            console.log("count: "+count+" processingEvent: "+processingEvent);

            count=1;
            processingEvent=clicks[index];
        }




       
        
        

        index++;
    }

    console.log("last event count: "+count+" processingEvent: "+processingEvent);



}

function analyzeScrollEvents(event: any, currentPage:string) {

}


export const EventTab = (appSessionEvent: sessionEvent) => {
  let recordedEvent = appSessionEvent.appEvents??{};
  const [isExpand, setExpand] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  if(isExpand){

    analyzeClickEvents(recordedEvent,currentPage);
    analyzeScrollEvents(recordedEvent,currentPage);

  }





  if (isExpand == false) {
    return (<> 
    
    { Object.keys(recordedEvent).length>0?
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">

          {Object.keys(recordedEvent).map((key, index) => (<div key={key}>
            {/* ---tile code- */}
            <div className={`card bg-transparent shadow-xl border border-yellow-600 cursor-pointer`} key={key} onClick={() => {
              setCurrentPage(key);
              setExpand(true);
            }}>
              <figure className="px-10 pt-10"> <Image src={page} alt={'app'} width={200} height={30} style={{ objectFit: 'contain' }} />   </figure>
              <div className="card-body ">
                <p className='font-semibold text-ellipsis overflow-hidden'>{key}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-circle btn-outline hover:bg-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
            {/* --------tile code ended---- */}
          </div>
          ))}



        </div>
      </div>:<div className="h-screen flex items-center justify-center">
             <FontAwesomeIcon className="h-10 w-10" icon={faExclamationCircle} />
                
             <h1 className="font-bold px-2">No app event was found.</h1>
              
            </div>

        }




    </>);
  } else {

    return (<>

        <div className="flex justify-start w-full bg-transparent px-4 py-4">
            <FontAwesomeIcon icon={faLongArrowLeft} onClick={() => {
                setExpand(false);
            }} className='h-5 cursor-pointer'></FontAwesomeIcon>
        </div>


        <ul className="steps steps-vertical p-4">
        <li className="step">Click</li>
        <li className="step">Choose plan</li>
        <li className="step">Purchase</li>
        <li className="step">Receive Product</li>
        </ul>

     

    </>);

  }
}
