import { Poem } from "@/types/Poem";
import { PoemRequestType } from "@/types/PoemRequestEnum";
import Cookies from "js-cookie";

export const RandomRequest =  async (): Promise<Poem> => {
    const url = import.meta.env.VITE_BASE_API_POEM_URL
    const finalUrl = url + "/random"
    const options = {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }

    try{
        const data = await makeRequest(finalUrl, options, PoemRequestType.Single)
        return data
    } catch(e){
        throw new Error("Failed with error" + e)
    }

}

export const ByTitleRequest = async (title: string): Promise<Poem> => {
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
            // Authorization: `Bearer ${authToken}`
        }
    }

    try{
        const data = await makeRequest(finalUrl, options, PoemRequestType.Single)
        return data
    } catch(e){
        throw new Error("Failed to make request: " + e)
    }
}

export const SavePoem = async (poemToSave: Poem, jwtToken: string): Promise<boolean> =>{
    const url = import.meta.env.VITE_BASE_API_POEM_URL
    const finalUrl = url + "/save"

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(poemToSave)
    }

    try{
        const response = await saveRequest(finalUrl, options)
        if (response){
            return true
        }
        return false
    }
    catch(e){
        alert(e)
        return false
    }
}

const makeRequest = async (url: string, options: RequestInit, requestType: PoemRequestType) =>{
    try{
        const response = await fetch(url, options)
        if (requestType == PoemRequestType.Multi){
            const poems: Poem = await response.json()
            return poems
        }
        const poem: Poem = await response.json()
        return poem
    } catch (e){
        throw new Error("Failed to fetch with error: " + e)
    }
}

const saveRequest = async (url: string, options: RequestInit) => {
    try{
        const response = await fetch(url, options)
        if (response.ok){
            return true
        }
        return false
    } catch (e){
        throw new Error("Failed to fetch with error: " + e)
    }
}
