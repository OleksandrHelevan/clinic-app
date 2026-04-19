import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";
import type {SignUpRequest} from "../types.ts";

export const useLogin = () => {
    return useMutation({
        mutationKey: ["sign-up"],
        mutationFn: (data: SignUpRequest) => userService.signUp(data),
    });
};