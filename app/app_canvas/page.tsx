'use client'
import React, { StrictMode, useEffect, useState } from 'react'
import { appName, headerThemeColor } from '../global_const';
import Image from 'next/image';
import user_icon from "@/public/user_icon.svg";
import logo from "@/public/logo.png";
import AppTile from './app_tile';
import AppGrid from './app_grid';
import { AppData, BaseJson } from './type';
import { fetchPlan, fetchRegisteredApps } from './network';
import Loader from '../utils/loader';
import { nameValidator, urlValidator } from './validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function appId() {
    //1. check if total app limit exeeds then block the addition apps
    //2. show the banner if plan expired on top 
    //3. create profile menu, profile menu will be a popup which will have all information about plan and userid, along with email, give logout button overthere


}
function Ui() {
    let currentDate = new Date();
    const [currentAppCount, setcurrentAppCount] = useState(0);
    const [appLimit, setAppLimit] = useState(0);
    const [isExpired, setExpired] = useState<Date>();
    const [appName, setAppName] = useState('');
    const [appUrl, setAppUrl] = useState('');
    const [apps, setApps] = useState<AppData[]>([]);
    let errorMsg = "";
    const [isBusy, setBusy] = useState(true);
    useEffect(() => {
        fetchRegisteredApps("mudassir@amazon.in")
            .then((res) => res.json())
            .then((jsonResponse) => {
                const apps = jsonResponse.data ?? [];
                // Process the apps data here
                setcurrentAppCount(apps.length);
                setApps(apps);

            })
            .catch((error) => {
                console.error('Error fetching registered apps:', error);
            });

        fetchPlan("mudassir@amazon.in").then((res) => res.json()).then((body) => {
            if (body != null) {
                if (body.code == 200) {
                    const plan = body?.data ?? {};
                    setAppLimit(plan.apps_limit);
                    setExpired(new Date(plan.Expiry));

                }
            }


        }).catch((error) => {
            console.error('Error fetching registered apps:', error);
        });

        setBusy(false);
    }, []);

    const validateAppName = (appName: string) => {
        const validOrNot = nameValidator(appName);
        if (validOrNot == false) {
            errorMsg = "Please enter valid app name, as mentioned in hints.";
        }

        return validOrNot;
    };
    const validateAppURL = (appUrl: string) => {
        const validOrNot = urlValidator(appUrl) && (appUrl.includes("https://") || appUrl.includes("http://"));
        if (validOrNot == false) {
            errorMsg = "Please enter valid app URL, as mentioned in hints.";
        }
        return validOrNot;

    };



    return (
        <>



            {/* The button to open modal */}
            <div className="modal" role="dialog" id="addAppPopUp">
                { currentAppCount+1<=appLimit?
                <div className="modal-box shadow-xl border border-yellow-600">
                    <h3 className="font-bold text-lg">Register App</h3>
                    <div className='p-3'>
                        <div className="label">
                            <span className="label-text">App's Name</span>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow" placeholder="Type App's Name" value={appName} onChange={(e) => setAppName(e.target.value)} />
                            </label>

                        </div>
                    </div>
                    <p className='text-xs text-gray-500 px-3'>app name should be like youtube.com or youtube</p>
                    <div className='p-3'>
                        <div className="label">
                            <span className="label-text">App's URL</span>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type="text" className="grow" placeholder="Type App's URL" value={appUrl} onChange={(e) => setAppUrl(e.target.value)} />
                            </label>
                        </div>
                    </div>


                    <p className='text-xs text-gray-500 px-3'>app url should be full url like https://www.youtube.com</p>

                    <div className="flex flex-row justify-end ">
                        <div className="modal-action p-3 ">
                            <a href="#" className={`btn  bg-red-500 text-white  hover:bg-violet-600`}>Cancel</a>
                        </div>
                        <div className="modal-action p-3">
                            <a type='submit' href="#" className={`btn ${appName.length > 0 && appUrl.length > 0 && validateAppName(appName) == true && validateAppURL(appUrl) == true ? "" : "btn-disabled"} bg-yellow-600 text-white  hover:bg-violet-600`}>Add now</a>
                        </div>
                    </div>
                

                </div>: <div className="toast">
                <div className="alert alert-info">
                <span>
                        You cannot add more than {appLimit} app.
                        <a type='submit' href="#"><FontAwesomeIcon icon={faClose} className=' ml-2'></FontAwesomeIcon></a>
                   </span>
                </div>
            </div>
                }    

                {/* alert */}
                {(appName.length > 0 && appUrl.length > 0) && (validateAppName(appName) == false || validateAppURL(appUrl) == false) ?
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! {errorMsg}</span>
                    </div> : <div></div>
                }

            </div>
            {/* till here popup code */}
            {/* toast */}
            {isExpired != null && isExpired < currentDate ?
                <div className="w-full p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold flex items-center justify-center">
                    Your plan has expired. Please upgrade to continue using our service. If you do not update the plan, your data will be removed after 30 days.
                </div> : <></>
            }
 
            {/*  */}


            <div className={`navbar ${headerThemeColor}`}>
                <div className="navbar-start">
                    <Image src={logo} alt={appName} objectFit="contain" width={250} height={80}></Image>
                </div>

                <div className="avatar placeholder navbar-end">
                    <a className="btn glass btn-neutral mx-2 h-9 text-black btn-sm hover:bg-violet-600" href={"#addAppPopUp"}>+ Add New</a>
                    <div className="bg-transparent text-neutral-content rounded-full w-9 h-9">
                        <Image src={user_icon} alt={'User'} className='w-10 h-10'></Image>
                    </div>
                </div>

            </div>
            {isBusy ?
                <Loader></Loader> : <AppGrid appData={apps} isBusy={isBusy}></AppGrid>
            }








        </>


    );
}


export default Ui;