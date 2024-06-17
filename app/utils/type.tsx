
export interface AppData{
    AppId:string,
    userEmail:string,
    quota:number,
    quotaAddedAt:string,
    URL:string,
    appName:string,
    email:string,
    Name:string,
    plan:string,
    createdAt:string,
    Expiry:string
}

export interface eventData{
    userEmail:string,
    AppId:string,
    date:string,
    guestId:string,
    appVisitordetail:string,
    appEvents:string,
    appErrors:string,
    appSession:string
}
export interface BaseJson{
    code:number,
    message:string,
    data:AppData[]
}

