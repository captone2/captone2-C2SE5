import bcrypt from "bcryptjs";

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
