export async function fetchRegisteredApps(email:string){
    const res= await fetch("http://127.0.0.1:3300/render/fetchApps",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":email
           
        })
    });

    return res;
}

export async function updateQuota(email:string,appId:string,plan:string){
    const res= await fetch("http://127.0.0.1:3300/render/refreshQuotaForApp",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":email,
            "appId":appId,
            "plan":plan

           
        })
    });

    return res;
}


export async function fetchPlan(email:string){
    const res= await fetch("http://127.0.0.1:3300/render/fetchplan",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email":email
           
        })
    });

    return res;
}

export async function addApp(email:string,url:string,appName:string){
    const res= await fetch("http://127.0.0.1:3300/setup/addApp",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userEmail":email,
            "url":url,
            "appName":appName   
        })
    });

    return res;
}

export async function fetchSessionCount(appId:string,userEmail:string){
    const res= await fetch("http://127.0.0.1:3300/render/getCounts",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "appId":appId,
            "userEmail":userEmail
        })
    });

    return res;
}

export async function fetchEvents(page:number,email:string,appId:string){
    const res= await fetch("http://127.0.0.1:3300/render/getEvents",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "page":page,
            "email":email,
            "appId":appId
        })
    });

    return res;
}

export async function fetchSpecificEvent(email:string,guestId:string,appId:string){
    const res= await fetch("http://127.0.0.1:3300/render/getAppEvent",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userEmail":email,
            "AppId":appId,
            "guestId":guestId
        })
    });

    return res;
}