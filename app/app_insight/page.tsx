import { AppData } from "../utils/type";

function AppInsight({
    searchParams
}: {
    searchParams: {
        query: string
    }
}){
    let appData= JSON.parse(searchParams.query) as AppData;
    return (<>
    hi
    </>)

}

export default AppInsight;