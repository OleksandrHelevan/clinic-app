import { userApiClient } from "../api/userApiClient.ts";
import type {LoginRequest, LoginResponse, MeResponse, SignUpRequest, UserResponse} from "../types.ts";
import {getFromStorage} from "../../../utils/localStorageUtil.ts";

export const userService = {
    login: async (request: LoginRequest): Promise<LoginResponse> => {
        return userApiClient.login(request);
    },
    signUp: async (request: SignUpRequest): Promise<UserResponse> => {
        return userApiClient.signUp(request);
    },

    me: async (): Promise<MeResponse> => {
        const userId = getFromStorage("userId");

        const headers: Record<string, string> = {};
        if (userId) {
            headers["X-User-Id"] = userId;
        } else {
            console.warn("userId не знайдено в localStorage");
        }

        return userApiClient.me(headers);
    }
};