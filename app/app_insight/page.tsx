import { appName, headerThemeColor } from "../global_const";
import { AppData } from "../utils/type";
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";

function AppInsight({
    searchParams
}: {
    searchParams: {
        query: string
    }
}){
    let appData= JSON.parse(searchParams.query) as AppData;
    return (<>
        <div className={`navbar sticky top-0 z-50 ${headerThemeColor}`}>
            <div className="navbar-start">
                <Image src={logo} alt={appName} objectFit="contain" width={250} height={80}></Image>
            </div>

            <div className="avatar placeholder navbar-end">
                <div className="bg-transparent text-neutral-content rounded-full w-9 h-9">
                    <Image src={user_icon} alt={'User'} className='w-10 h-10'></Image>
                </div>
            </div>

        </div>
        {/* =====nav bar ended */}


    </>)

}

export default AppInsight;