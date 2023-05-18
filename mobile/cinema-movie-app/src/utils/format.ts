export function numberWithPoint(x: string | number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function dateReverse(date: string) {
  return date.substring(8, 10) + "/" + date.substring(5, 7) + "/" + date.substring(0, 4);
}
