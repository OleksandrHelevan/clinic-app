package com.clinicapp.chatservice.infrastructure.utils;

import lombok.experimental.UtilityClass;
import org.springframework.util.StringUtils;

@UtilityClass
public class ChatUtils {

    public static String generateChatId(String id1, String id2) {
        if (!StringUtils.hasText(id1) || !StringUtils.hasText(id2)) {
            throw new IllegalArgumentException("User IDs cannot be null or empty");
        }

        if (id1.compareTo(id2) < 0) {
            return String.format("%s_%s", id1, id2);
        }
        return String.format("%s_%s", id2, id1);
    }
}