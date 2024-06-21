import Link from "next/link";
import { AppData, eventData } from "../utils/type";
import { useRouter } from "next/navigation";


interface events{
  event:eventData[],
  appData :AppData
}

export default function Session_list(eventItems:events){
  const router = useRouter();

  const handleClick = (guestId:string) => {
    router.push(`/app_insight?query=${encodeURI(JSON.stringify({
      "appdata":eventItems.appData,
      "guestId":guestId
    }))}`);
   
  }

    return (<div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Country</th>
              <th>Device</th>
              <th>is returning</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
            eventItems.event.map((event) => (
             
                  <tr className="hover  cursor-pointer" key={event.guestId} onClick={()=>{
                    handleClick(event.guestId);
                  }}>
                    <td>{new Date(event.date).toDateString()}</td>
                    <td>{JSON.parse(event.appVisitordetail).country}</td>
                    <td>{JSON.parse(event.appVisitordetail).device}</td>
                    <td>{JSON.parse(event.appVisitordetail).isReturning}</td>
                    <td>{JSON.parse(event.appVisitordetail).ip}</td>

                  </tr>
     
              
             )
            )
             
          } 
          </tbody>
        </table>
      </div>);
}

