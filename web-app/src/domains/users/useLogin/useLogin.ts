import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";
import type { LoginRequest, LoginResponse } from "../types.ts";
import {setInStorage} from "../../../utils/localStorageUtil.ts";

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginRequest) => userService.login(data),
        onSuccess: (response: LoginResponse) => {
            setInStorage("token", response.token);
            setInStorage("userId", response.userId);
        }
    });
};