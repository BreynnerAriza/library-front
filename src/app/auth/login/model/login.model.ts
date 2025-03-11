export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginSuccess{
    accessToken: string,
    refreshToken: string
}