package maafcraft.backend.Utils;

public class CustomValidation {

    public static boolean isValidEmail(String email) {
        return email.matches("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}");
    }

    public static boolean isValidBdPhoneNumber(String phone) {
        return phone.matches("^(?:\\+88|88)?(01[3-9]\\d{8})$");
    }

    public static long parseVisibleId(String visibleIdValue) {
        try {
            return Long.parseLong(visibleIdValue);
        } catch (NumberFormatException ex) {
            return -1;
        }
    }
}