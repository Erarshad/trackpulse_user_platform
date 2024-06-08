
export interface AppData{
    AppId:string,
    userEmail:string,
    quota:number,
    quotaAddedAt:string,
    URL:string,
    email:string,
    Name:string,
    plan:string,
    createdAt:string,
    Expiry:string
}

export interface BaseJson{
    code:number,
    message:string,
    data:AppData[]
}

