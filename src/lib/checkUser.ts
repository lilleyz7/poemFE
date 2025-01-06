import Cookies from "js-cookie";

export function CheckAuth(): boolean{
    const accessToken = Cookies.get("access")
    if (accessToken){
        return true
    }

    const refreshToken = Cookies.get("refresh")
    if (refreshToken){
        //refresh tokens
        return true
    }

    return false
}