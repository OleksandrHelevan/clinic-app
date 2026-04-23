import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";
import type {SignUpRequest} from "../types.ts";
import toast from "react-hot-toast";

export const useSignUp = () => {
    return useMutation({
        mutationKey: ["sign-up"],
        mutationFn: (data: SignUpRequest) => userService.signUp(data),
        onSuccess: ()=> toast.success("User signed up successfully"),
    });
};