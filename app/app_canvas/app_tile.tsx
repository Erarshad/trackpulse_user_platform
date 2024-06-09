import React, { useEffect, useState } from 'react'
import appIconInfinity from "@/public/logoIcn.png";
import Image from 'next/image';
import {headerThemeColor} from '../global_const';
import { AppData } from './type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { updateQuota } from './network';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { encodeToHash } from '../utils/hashed_path';


 function updateTheQuotaIfRequired(data:AppData){
    if(new Date(data.Expiry)>=new Date()){
        if(new Date(data.quotaAddedAt)< new Date()){
          //  then update the quota now 
            let email=data.email;
            let appId=data.AppId;
            let plan=data.plan;
            return updateQuota(email,appId,plan);

        


        }
    }

}


function AppTile(data:AppData){
    const [stateData, setData] = useState(data);
    const [isBusy,setBusy]=useState(false);
    useEffect(()=>{
      setBusy(true);
       updateTheQuotaIfRequired(data)?.then((res) => res.json())
       .then((jsonResponse) => {
           const response = jsonResponse.data ?? [];
           console.log(response);
           if(jsonResponse?.code==200){
             data = Object.assign({}, data, { quota: response.quotaPerDay });
             setData(data);
           }
    
          
       })
       setBusy(false);
      
    },[]);
   
    return (
      <Link href={{
        pathname:"/app_dashboard",
        query:{
          appData: (JSON.stringify(data))
        }
      }}>
        <>
          <div className={`card bg-transparent shadow-xl border border-yellow-600`}>

            <figure className="px-10 pt-10"> {isBusy == false ? <Image src={appIconInfinity} alt={'app'} width={200} height={30} style={{ objectFit: 'contain' }} /> : <span className={`loading ${headerThemeColor} loading-spinner loading-lg`}></span>} </figure>

            <div className="card-body ">
              <p className='font-semibold text-ellipsis overflow-hidden'>{data.appName}</p>
              <p className='text-sm text-ellipsis overflow-hidden'>{data.URL}</p>
              <div className="card-actions justify-end">
                <p className='text-sm'>Quota: {stateData.quota}/day</p>
                <button className="btn btn-circle btn-outline hover:bg-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
            </div>



          </div>





        </>
    </Link>
    );
}

export default AppTile;