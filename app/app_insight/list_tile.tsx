import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface props{
    icon:any,
    title:string,
    subtitle:string
}

export default function ListTile(pr:props) {
    return (
   
        <div className="p-1 h-full">
            <div className="card bg-base-100 hover:bg-base-200 transition-colors duration-300 shadow-xl border border-yellow-600 h-full flex flex-col">
                <div className="card-body flex-1">
                    <div className="card-title flex items-center justify-between">
                        <div className="flex items-center">
                            <FontAwesomeIcon className="px-2" icon={pr.icon}></FontAwesomeIcon>
                            <h2 className="text-base md:text-base sm:text-sm lg:text-xl">{pr.title}</h2>
                        </div>
                    </div>
                    <p className="px-9 flex-wrap break-words text-base sm:text-sm md:text-base lg:text-xl">
                        {pr.subtitle}
                    </p>
                </div>
            </div>
        </div>

  
    );
  }