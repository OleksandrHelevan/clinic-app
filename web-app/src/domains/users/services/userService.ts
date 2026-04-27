import { userApiClient } from "../api/userApiClient.ts";
import type {LoginRequest, LoginResponse, MeResponse, SignUpRequest, UserResponse} from "../types.ts";

export const userService = {
    login: async (request: LoginRequest): Promise<LoginResponse> => {
        return userApiClient.login(request);
    },
    signUp: async (request: SignUpRequest): Promise<UserResponse> => {
        return userApiClient.signUp(request);
    },

    me: async (): Promise<MeResponse> => {
        return userApiClient.me();
    }
};