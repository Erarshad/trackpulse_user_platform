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

interface sessionError {
    appError: any
}

export const AppErrorTab = (errors:sessionError) => {
    const [isExpand, setExpand] = useState(false);
    const [currentPage, setCurrentPage] = useState("");
    if (isExpand == false) {
        return (<>
            {Object.keys(errors.appError).length > 0 ?
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">

                        {Object.keys(errors.appError).map((key, index) => (<div key={key}>
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
                </div> : <div className="h-screen flex items-center justify-center">
                    <FontAwesomeIcon className="h-10 w-10" icon={faExclamationCircle} />

                    <h1 className="font-bold px-2">No app error was found.</h1>

                </div>
            }

        </>

        )

    }else{
        return (<>

            <div className="flex justify-start w-full bg-transparent px-4 py-4">
                <FontAwesomeIcon icon={faLongArrowLeft} onClick={() => {
                    setExpand(false);
                }} className='h-5 cursor-pointer'></FontAwesomeIcon>
            </div>
    
                {/* code for steps of events */}

               {/* code for steps of events */}

   
               <ul className="steps steps-vertical p-4">
                {   (errors.appError[currentPage].split(",\n") as [])?.map((key, index) => (
                    <li className="step" key={key}>{errors.appError[currentPage].split(",\n")[index]}</li>
                       

                   )
                 )



                }

            </ul>

          {/* code for steps of events */}

       
              
    
    
         
    
        </>);
    }
}
