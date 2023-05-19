export class ValidateService {
  static emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    // email = email.trim();
    if (!email) return "Email không được để trống.";
    if (!re.test(email)) return "Email không đúng định dạng. (zxc123@gmail.com).";
    return "";
  }
  static passwordValidator(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*\\.\\_\\-])(?=.{5,30})/;
    if (!password) return "Mật khẩu không được để trống.";
    if (password.length < 6) return "Mật khẩu tối thiểu 6 kí tự.";
    if (password.length > 15) return "Mật khẩu tối đa 15 kí tự.";
    // if (!re.test(password)) return "Password is invalid. Ex: Abcd@123!";
    return "";
  }
}
