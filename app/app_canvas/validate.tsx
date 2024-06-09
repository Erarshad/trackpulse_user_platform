export function nameValidator(appName:string){
    const  regex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z0-9-]{2,6})?$/;
    const validOrNot= regex.test(appName);
    return validOrNot;
}

export function urlValidator(appURL:string){
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
    const validOrNot= regex.test(appURL);
    return validOrNot;
}