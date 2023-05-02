class ValidateService {
  static emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    // email = email.trim();
    if (!email) return "Email can't be empty.";
    if (!re.test(email))
      return (
        "Please include '@' in the email address. " + email + " is missing '@'."
      );
    return "";
  }
  static passwordValidator(password) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\.\\_\\-])(?=.{5,30})/;
    if (!password) return "Password can't be empty.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (password.length > 30)
      return "Password can't be more than 30 characters.";
    // if (!re.test(password)) return "Password is invalid. Ex: Abcd@123!";
    return "";
  }
}
export default new ValidateService();
