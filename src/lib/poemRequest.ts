import { Poem } from "@/types/Poem";
import Cookies from "js-cookie";

export const RandomRequest =  async (): Promise<Poem[]> => {
    const url = import.meta.env.VITE_BASE_API_POEM_URL
    const finalUrl = url + `random/5`
    const options = {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }

    try{
        const data = await makeRequest(finalUrl, options)
        return data
    } catch(e){
        alert(e)
        const data: Poem[] = []
        return data
    }

}

export const ByTitleRequest = async (title: string): Promise<Poem[]> => {
    const url = import.meta.env.VITE_BASE_API_POEM_URL
    const authToken = Cookies.get("access")
    if (!authToken){
        throw new Error("Unauthorized Request")
    }
    const finalUrl = url + `searchByTitle/${title}`
    const options = {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        }
    }

    try{
        const data = await makeRequest(finalUrl, options)
        return data
    } catch(e){
        alert(e)
        const data: Poem[] = []
        return data
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeRequest = async (url: string, options: any) =>{
    try{
        const response = await fetch(url, options)
        const poems: Poem[] = await response.json()
        return poems
    } catch (e){
        alert(e)
        const poems: Poem[] = []
        return poems
    }
}
