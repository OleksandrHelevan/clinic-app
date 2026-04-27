import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";

export const useMe = () => {
    const token = localStorage.getItem("token");

    return useQuery({
        queryKey: ["me"],
        queryFn: () => userService.me(),
        enabled: !!token,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};