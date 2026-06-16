import { useMutation } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";
import type { LoginRequest, LoginResponse } from "../types.ts";
import {setInStorage} from "../../../utils/localStorageUtil.ts";
import {useNavigate} from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: LoginRequest) => userService.login(data),
        onSuccess: (response: LoginResponse) => {
            setInStorage("token", response.token);
            setInStorage("userId", response.userId); //TODO - REMOVE
            navigate("/me");
        }
    });
};