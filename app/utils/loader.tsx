import React from 'react'
import { headerThemeColor } from '../global_const'


function Loader(){
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50">
        <div className="relative">
            <span className={`loading loading-bars ${headerThemeColor} h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40`}></span>
            <p className="text-black font-semibold text-center">Loading . . .</p>
        </div>
        </div>
      );
}

export default Loader;
