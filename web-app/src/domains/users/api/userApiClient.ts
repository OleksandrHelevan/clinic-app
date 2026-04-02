import type {LoginRequest, LoginResponse, SignUpRequest, UserResponse} from "../types.ts";
import {apiClient} from "../../../service/apiClient.ts";

export const userApiClient = {
    login: (request: LoginRequest): Promise<LoginResponse> =>
        apiClient.post<LoginResponse>('/login', request),

    signUp: (request: SignUpRequest): Promise<UserResponse> =>
        apiClient.post<UserResponse>('/sign-up', request),
}