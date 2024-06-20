'use client'
import React, { useEffect, useState } from 'react'
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';
import { getEvents } from './test_event';



  export const  AppSessionTabBody = () => {
  
  useEffect(() => {
    // Place your third-party library function here
    new rrwebPlayer({
      target: document.getElementById("vid")!,
      props: {
        events: getEvents(),
      },
    });
    const iframe = document.getElementsByTagName("iframe")[0];
    iframe.removeAttribute("sandbox");
    iframe.contentWindow?.location.reload();
  }, []); 
  
  return (
    
   <div id="vid"></div>
  

     
     
  )
}
