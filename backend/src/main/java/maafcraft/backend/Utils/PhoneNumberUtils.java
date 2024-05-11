package maafcraft.backend.Utils;

public class PhoneNumberUtils {

    public static String removePrefix(String phoneNumber) {
        if (phoneNumber.startsWith("+88")) {
            return phoneNumber.substring(3);
        }
        if (phoneNumber.startsWith("88")) {
            return phoneNumber.substring(2);
        }
        return phoneNumber;
    }
}