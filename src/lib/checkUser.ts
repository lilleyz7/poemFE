import LoginResponse from "@/types/LoginResponse";
import Cookies from "js-cookie";

export async function CheckAuth(): Promise<boolean>{
    const accessToken = Cookies.get("access")
    if (accessToken){
        return true
    }

    const refreshToken = Cookies.get("refresh");
    if (refreshToken){
        return await handleRefresh(refreshToken);
    }

    return false
}

async function handleRefresh(refreshToken: string): Promise<boolean>{
    const url = import.meta.env.VITE_BASE_API_URL + "refresh"

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(refreshToken)
    }

    const response = await fetch(url, options)
    if (response.status != 200){
        return false
    }

    const tokenData: LoginResponse = await response.json()
    Cookies.set("access", tokenData.accessToken, {expires: tokenData.expiresIn})
    Cookies.set("refresh", tokenData.refreshToken, {expires: tokenData.expiresIn})
    return true
}