import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppTile from "./app_tile";
import { AppData } from "./type";
import { faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
interface appDataWrapped {
    appData: AppData[]
}

function AppGrid(appDataList: appDataWrapped) {
    if (appDataList.appData.length > 0) {
        return (
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
                    {appDataList.appData.map(app => <AppTile AppId={app.AppId} userEmail={app.userEmail} quota={app.quota} quotaAddedAt={app.quotaAddedAt} URL={app.URL} Expiry={app.Expiry} Name={app.Name} createdAt={app.createdAt} email={app.email} plan={app.plan} key={app.AppId}></AppTile>)}
                </div>
            </div>
        );

    } else {
        return (
            <div className="h-screen flex items-center justify-center">
             <FontAwesomeIcon className="h-10 w-10" icon={faExclamationCircle} />
            <h1 className="font-bold px-2">No app was added. click on +add new button to add app</h1>
            </div>
        );

    }
}

export default AppGrid;