export async function fetchSessionCount(appId:string){
    const res= await fetch("http://127.0.0.1:3300/render/getCounts",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "appId":appId 
        })
    });

    return res;
}