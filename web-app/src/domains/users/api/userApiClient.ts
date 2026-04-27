import type {LoginRequest, LoginResponse, MeResponse, SignUpRequest, UserResponse} from "../types.ts";
import {apiClient} from "../../../service/apiClient.ts";

export const userApiClient = {
    login: (request: LoginRequest): Promise<LoginResponse> =>
        apiClient.post<LoginResponse>('/login', request),

    signUp: (request: SignUpRequest): Promise<UserResponse> =>
        apiClient.post<UserResponse>('/sign-up', request),

    me: (): Promise<MeResponse> => apiClient.get<MeResponse>('/me'),
}