import {
    useCallback,
    useState
} from "react";

import type {ChatEvent} from "../../types.ts";

export const useTypingIndicator = (
    recipientId?: string
) => {
    const [isTyping, setIsTyping] = useState(false);

    const handleTypingEvent = useCallback(
        (event: ChatEvent) => {
            if (
                recipientId &&
                event.senderId !== recipientId
            ) {
                return;
            }
            if (event.type === "TYPING") {
                setIsTyping(true);
            }
            if (event.type === "STOPPED_TYPING") {
                setIsTyping(false);
            }
        },
        [recipientId]
    );

    return {
        isTyping,
        handleTypingEvent
    };
};