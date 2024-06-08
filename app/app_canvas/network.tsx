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