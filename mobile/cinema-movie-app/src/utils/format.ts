import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

export function numberWithPoint(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function dateReverse(date: string) {
  return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
}

export const compareStrings = async (inputString: string, hash: string) => {
  const result = await bcrypt.compare(inputString, hash);
  return result;
};

export const generateRandomString = () => {
  const timestamp = new Date().getTime().toString();
  const randomNum = Math.random().toString(36).substr(2, 9);
  // Generate a random number and convert it to base 36
  return CryptoJS.SHA256(timestamp + randomNum).toString();
};
