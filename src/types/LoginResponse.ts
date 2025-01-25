
interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    tokenType: string,
    expiresIn: number
}

export default LoginResponse