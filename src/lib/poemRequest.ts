import { Poem } from "@/types/Poem";
import Cookies from "js-cookie";

export const RandomRequest =  async (): Promise<Poem> => {
    const url = import.meta.env.VITE_BASE_API_URL
    const finalUrl = url + "random"
    const token = Cookies.get("access")
    if (!token){
        throw new Error("Not logged in")
    }

    const options = {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    } 

    try{
        const data = await makeRequest(finalUrl, options)
        return data
    } catch(e){
        throw new Error("Failed with error" + e)
    }

}

export const ByTitleRequest = async (title: string): Promise<Poem> => {
    const url = import.meta.env.VITE_BASE_API_URL
    const finalUrl = url + `byTitle/${title}`

    const authToken = Cookies.get("access")
    if(!authToken){
        throw new Error("User not logged in")
    }
    const options = {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },

    }

    try{
        const data = await makeRequest(finalUrl, options)
        return data
    } catch(e){
        throw new Error("Failed to make request: " + e)
    }
}

export const SavePoem = async (poemToSave: Poem): Promise<boolean> =>{
    const url = import.meta.env.VITE_BASE_API_URL
    const finalUrl = url + "save"

    const authToken = Cookies.get("access")
    if(!authToken){
        throw new Error("Not logged in")
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(poemToSave),
    } 

    try{
        const response = await fetch(finalUrl, options)
        if (response.status >= 200 && response.status < 300){
            return true
        }
        return false
    }
    catch(e){
        throw new Error(e + "")
    }
}

export const GetSaves = async (): Promise<Poem[]> => {
    const url = import.meta.env.VITE_BASE_API_URL
    // finalUrl needs to be updated
    const finalUrl = url + "mySaves/1"

    const authToken = Cookies.get("access")
    if(!authToken){
        throw new Error("Not logged in")
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
        },
    } 

    try{
        const response = await fetch(finalUrl, options)
        const poems = response.json()
        return poems
    } catch(e){
        throw new Error("Failed to get with e: " + e)
    }
}

const makeRequest = async (url: string, options: RequestInit) =>{
    try{
        const response = await fetch(url, options)
        const poem: Poem = await response.json()
        return poem
    } catch (e){
        throw new Error("Failed to fetch with error: " + e)
    }
}

