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
const HIGH_CLICK_THRESHOLD = 3;
const HIGH_SCROLL_THRESHOLD = 20;
/***
 * intiuition:  
 * ======================>
 
 * interest: 
 * if user clicked one time then it is interest. --done
 * frustration:
 * if clicked same element more than click thresold then it is frustration ---done
 * confusion:
 * scroll down and scroll up continuosly will indicate the confusion and hurdle while finding the content --done
 * exploration:  scroll to down 
 * problem while finding : high scroll threesold 
 * ==============================================>
 * 
 * Algo design
 * ====================>
 * if(count ==1 or 2 ) then => consider interest
 * if(count >= highclickthresholed) then => consider this as frustration.
 * scroll down + scroll up continously means up is more than scrolldown then user is confused and faces issue while finding 
       check if user has scroll down and does the more then 2 up then marked user is confused 
 * means if number of scroll down == scrollup; user seems confused while finding relevent info
 *      if only down scrolls then means hard to locate the content (if only down scroll more than 20 then it means it hard to locate call to action)
 * 
 * 
 */

interface sessionEvent {
    appEvents: any
}

interface AnalysisOfEvent{
  key:any;
  count:number,
  isscrollData:boolean,
  scrollData:number,
  targetType:string,
  targetText:string,
  targetId:string,
  targetClass:string
}


let AnalyzedEvents:AnalysisOfEvent[]=[];
  
function analyzeClickEvents(event: any,currentPage:string) {
    console.log(event);
    let count=1;
    let clicks=event[currentPage].clicks;
    if(clicks!=null){
      let processingEvent = clicks[0];
      let index = 1;
      //  let clickEvent = targetType + ":ttid/:" + targetText + ":ttid/:" + targetId + ":ttid/:" + targetClass;
      while (index < clicks.length) {
        if (clicks[index] == clicks[index - 1]) {
          count++;

        } else {
        //  console.log("count: " + count + " processingEvent: " + processingEvent);
          let element=processingEvent.split(":ttid/:");
         
          AnalyzedEvents.push({
            "key":index,
            "count":count,
            "targetType":element[0]??"",
            "targetText":element[1]??"",
            "targetId":element[2]??"",
            "targetClass":element[3]??"",
            "isscrollData":false,
            "scrollData":0
          })
          count = 1;
          processingEvent = clicks[index];
        }

        index++;
      }

      let element=processingEvent.split(":ttid/:");
     // console.log("last event count: " + count + " processingEvent: " + processingEvent);
      AnalyzedEvents.push({
        "key":index,
        "count":count,
        "targetType":element[0]??"",
        "targetText":element[1]??"",
        "targetId":element[2]??"",
        "targetClass":element[3]??"",
        "isscrollData":false,
        "scrollData":0
        })
 
    }



}

function analyzeScrollEvents(event: any, currentPage:string) {
  console.log(event);
  let scroll=event[currentPage].scroll;
  if(scroll!=null){
    let count= scroll.length>0?1:0;
  //   "scroll": [
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down",
  //     "down"
  // ]
    let currentProcessingScrollEvent = scroll[0];
    let index = 1;
    while (index < scroll.length) {
      if (scroll[index] == scroll[index - 1]) {
        count++;
      } else {
        console.log("count: " + count + " processingScrollEvent: " + currentProcessingScrollEvent);
        if(count>0){
        if(count>=20 && currentProcessingScrollEvent=="down"){
          //user is exploring and hard feel problems while finding content
          AnalyzedEvents.push({
            "key":index+"x",
            "count":count,
            "targetType":"",
            "targetText":"",
            "targetId":"",
            "targetClass":"",
            "isscrollData":true,
            "scrollData":1
            })

        }else{
          //user is confused 
          AnalyzedEvents.push({
            "key":index+"x",
            "count":count,
            "targetType":"",
            "targetText":"",
            "targetId":"",
            "targetClass":"",
            "isscrollData":true,
            "scrollData":2
            })
        }
      }
        count = 1;
        currentProcessingScrollEvent = scroll[index];
      }








      index++;
    }

    console.log("last event count: " + count + " processingScrollEvent: " + currentProcessingScrollEvent);
    if(count>0){
    if(count>=20 && currentProcessingScrollEvent=="down"){
      //user is exploring and hard feel problems while finding content
      // 1 means user is exploring and feels hard while finding content
      AnalyzedEvents.push({
        "key":index+"x",
        "count":count,
        "targetType":"",
        "targetText":"",
        "targetId":"",
        "targetClass":"",
        "isscrollData":true,
        "scrollData":1
        })
      

    }else{
      //user is confused 
      //2 means user is confused and repeatedly scrolling up and down 
      AnalyzedEvents.push({
        "key":index+"x",
        "count":count,
        "targetType":"",
        "targetText":"",
        "targetId":"",
        "targetClass":"",
        "isscrollData":true,
        "scrollData":2
        })
    }
  }

  }

}

function analyzeTheEventForLabel(event: AnalysisOfEvent){
  if(event.isscrollData==false){
    if((event.targetText??"").length>0){
      return "Clicked on "+event.targetText.substring(0,20).toLocaleLowerCase();

    }
    else if(event.targetType.length>0){
      return "Clicked on " +event.targetType;
    }
    else if(event.targetClass!=="No class attached"){
      return "Clicked on "+event.targetClass;
    }else if(event.targetId!=="No ID attached"){
      return  "Clicked on "+event.targetId;

    }
    
 }else{
    //user is exploring and hard feel problems while finding content  ---1 --- exploring scrolling down

    // //user is confused  --2   -- user repeatedly scroll up and down
    if(event.scrollData==1){
      return "Scrolling down";
    }else if(event.scrollData==2){

      return "Repeatedly Scrolling up and down";

    }

 }

  return "Action on app component";

}

function analyzeTheEventForDetails(event: AnalysisOfEvent){
  /**
   * if(count ==1 or 2 ) then => consider interest
 * if(count >= highclickthresholed) then => consider this as frustration.
 * scroll down + scroll up continously means up is more than scrolldown then user is confused and faces issue while finding 
       check if user has scroll down and does the more then 2 up then marked user is confused 
 * means if number of scroll down == scrollup; user seems confused while finding relevent info
 *      if only down scrolls then means hard to locate the content (if only down scroll more than 20 then it means it hard to locate call to action)
 * 
 * 
   */
  if (event.isscrollData == false) {
    if (event.count <= 2) {
      //it is interest
      return `user clicks ${event.count} times, highlights their strong interest in the content on an element with class ${event.targetClass}, component ID ${event.targetId}, and target element ${event.targetType}, element content is ${event.targetText}.`;
    } else if (event.count >= HIGH_CLICK_THRESHOLD) {
      //it is frustration
      return `user clicks ${event.count} times, highlights their frustration in the content on an element with class ${event.targetClass}, component ID ${event.targetId}, and target element ${event.targetType}, element content is ${event.targetText}.`;

    }
  } else {
        //user is exploring and hard feel problems while finding content  ---1 --- exploring scrolling down

    // //user is confused  --2   -- user repeatedly scroll up and down
    if(event.scrollData==1){
       return "The user appears to be exploring, indicating that the desired content is elusive and not easily found.";
    }else if(event.scrollData==2){
      return "The user seems perplexed, repeatedly scrolling up and down in a quest to find the elusive desired content.";



    }

  }


}


export const EventTab = (appSessionEvent: sessionEvent) => {
  let recordedEvent = appSessionEvent.appEvents??{};
  const [isExpand, setExpand] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  if(isExpand){
    AnalyzedEvents=[];
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

            {/* code for steps of events */}

   
            <ul className="steps steps-vertical p-4">
                {   AnalyzedEvents.map((event) => (

                     <li className="step" key={event.key}>
                      <div className="collapse collapse-arrow bg-base-200">
                      <input type="radio" name="my-accordion-2"/>
                      <div className="collapse-title text-lg font-medium">{analyzeTheEventForLabel(event)}</div>
                        <div className="collapse-content">
                          <p>{analyzeTheEventForDetails(event)}</p>
                        </div>
                    </div>
                   </li>

                   ))



                }

            </ul>

          {/* code for steps of events */}


     

    </>);

  }
}
