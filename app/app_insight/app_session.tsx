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

interface sessionEvent {
  appSession: any
}


export const AppSessionTabBody = (appSessionEvent: sessionEvent) => {
  let userSession = appSessionEvent.appSession??{};
  const [isExpand, setExpand] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    if (isExpand == true && currentPage!=null && setCurrentPage!=null) {
      // Place your third-party library function here
      new rrwebPlayer({
        target: document.getElementById("session")!,
        props: {
          events: userSession[currentPage] ?? [],
          autoPlay: false
        },




      });
      const iframe = document.getElementsByTagName("iframe")[0];
      iframe.removeAttribute("sandbox");
      iframe.contentWindow?.location.reload();
      let rr_player = Array.from(document.getElementsByClassName('rr-player') as HTMLCollectionOf<HTMLElement>)
      let player__frame = Array.from(document.getElementsByClassName('rr-player__frame') as HTMLCollectionOf<HTMLElement>)
      player__frame[0].style.width = "100%"
      rr_player[0].style.width = "100%"
      player__frame[0].style.height = "75%"

      //-----
      const handleFullScreenChange = () => {
        if (document.fullscreenElement) {
          console.log('Entered full screen');
          let rr_player = Array.from(document.getElementsByClassName('rr-player') as HTMLCollectionOf<HTMLElement>)
          let player__frame = Array.from(document.getElementsByClassName('rr-player__frame') as HTMLCollectionOf<HTMLElement>)
          player__frame[0].style.width =`${window.innerWidth}`
          rr_player[0].style.width = `${window.innerWidth}`
          player__frame[0].style.height = `${window.innerHeight}`
          // Handle full-screen entry
        } else {
          let rr_player = Array.from(document.getElementsByClassName('rr-player') as HTMLCollectionOf<HTMLElement>)
          let player__frame = Array.from(document.getElementsByClassName('rr-player__frame') as HTMLCollectionOf<HTMLElement>)
          player__frame[0].style.width = "100%"
          rr_player[0].style.width = "100%"
          player__frame[0].style.height = "75%"
        }
      };

      document.addEventListener('fullscreenchange', handleFullScreenChange);

      return () => {
        document.removeEventListener('fullscreenchange', handleFullScreenChange);
      };

    }

    

  }, [isExpand]);
  if (isExpand == false) {
    return (<> 
    
    { Object.keys(userSession).length>0?
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">

          {Object.keys(userSession).map((key, index) => (<div key={key}>
            {/* ---tile code- */}
            <div className={`card bg-transparent shadow-xl border border-yellow-600 cursor-pointer`} onClick={() => {
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
                
             <h1 className="font-bold px-2">No app session was found.</h1>
              
            </div>

        }




    </>);
  } else {

    return (<>

      <div className="flex justify-start w-full bg-white px-4">
        <FontAwesomeIcon icon={faLongArrowLeft} onClick={() => {
          setExpand(false);
        }} className='h-5 cursor-pointer'></FontAwesomeIcon>
      </div>

      <div className="h-full w-full " id="session"></div>

    </>);

  }
}
