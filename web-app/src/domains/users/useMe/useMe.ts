import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService.ts";

export const useMe = () => {
    const userId = localStorage.getItem("userId");

    return useQuery({
        queryKey: ["me", userId],
        queryFn: () => userService.me(),
        enabled: !!userId,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};