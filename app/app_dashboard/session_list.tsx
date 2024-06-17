import { eventData } from "../utils/type";

interface events{
  event:eventData[]
}

export default function Session_list(eventItems:events){
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
              eventItems.event.map((event)=>( <tr className="hover">
                <td>{new Date(event.date).toDateString()}</td>
                <td>{JSON.parse(event.appVisitordetail).country}</td>
                <td>{JSON.parse(event.appVisitordetail).device}</td>
                <td>{JSON.parse(event.appVisitordetail).isReturning}</td>
                <td>{JSON.parse(event.appVisitordetail).ip}</td>
              
              </tr>))
             
          } 
          </tbody>
        </table>
      </div>);
}

