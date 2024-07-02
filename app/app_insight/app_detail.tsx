import React from 'react'
import { faCalendar, faClock, faIdCard, faLocation, faMap, faGamepad, faWindowRestore, faIdBadge} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import ListTile from './list_tile';
interface props{
  visitDate:Date,
  visiterDetails:any,
  guestId:string,
  appId:string
}

export const AppDetailTab = (data:props) => {
  return (
    <>
         
  
      <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              <ListTile icon={faCalendar} title={`Guest's visiting Date`} subtitle={new Date(data?.visitDate).toDateString()??""}></ListTile>
              <ListTile icon={faClock} title={`Guest's visiting Time`} subtitle={new Date(data?.visitDate).toLocaleTimeString()??""}></ListTile>
              <ListTile icon={faIdCard} title={`GuestId`} subtitle={data.guestId}></ListTile>
              <ListTile icon={faLocation} title={`Guest's IP`} subtitle={data?.visiterDetails?.ip??""}></ListTile>
              <ListTile icon={faMap} title={`Guest's Country`} subtitle={data?.visiterDetails?.country??""}></ListTile>
              <ListTile icon={faGamepad} title={`Guest's Device`} subtitle={data?.visiterDetails?.device??""}></ListTile>
              <ListTile icon={faWindowRestore} title={`Returning guest`} subtitle={data?.visiterDetails?.isReturning??""}></ListTile>
              <ListTile icon={faIdBadge} title={`AppId`} subtitle={data.appId}></ListTile>
                  
                </div>
            </div>
  


          

    </>
  )
}



