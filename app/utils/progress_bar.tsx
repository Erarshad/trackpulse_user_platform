import React from 'react'
import { headerThemeColor } from '../global_const'


function ProgressBar(){
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50">
        <div className="relative">
            <progress className="progress w-56 progress-accent"></progress>
        </div>
        </div>
      );
}

export default ProgressBar;
