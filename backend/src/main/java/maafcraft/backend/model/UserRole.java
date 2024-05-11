package maafcraft.backend.model;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public enum UserRole {

    ROLE_USER,
    ROLE_ADMIN;

    public static List<Map<String, Object>> getAllRoles() {
        return Arrays.stream(UserRole.values())
                .map(role -> {
                    Map<String, Object> roleInfo = new HashMap<>();
                    roleInfo.put("id", role.ordinal() + 1);
                    roleInfo.put("name", role.name());
                    return roleInfo;
                })
                .collect(Collectors.toList());
    }
}
