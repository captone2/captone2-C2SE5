import { format } from "date-fns";

enum DAY_HOLIDAY {
  DAY_1_1 = "01/01",
  DAY_30_4 = "30/04",
  DAY_1_5 = "01/05",
  DAY_2_9 = "02/09",
}

// format date: dd/mm/yyyy
export const getPriceTicket = (date: Date | String, time?: string) => {
  const defaultPrice = 50000;

  if (typeof date === "string") {
    date = new Date(date);
  }
  let hour = 0;
  if (time) {
    hour = parseInt(time?.length > 5 ? time?.substring(0, 2) : time?.substring(0, 1));
  }

  date = format(new Date(date), "dd/MM/yyyy");
  if (
    date.toString().includes(DAY_HOLIDAY.DAY_1_1) ||
    date.toString().includes(DAY_HOLIDAY.DAY_30_4) ||
    date.toString().includes(DAY_HOLIDAY.DAY_1_5) ||
    date.toString().includes(DAY_HOLIDAY.DAY_2_9)
  ) {
    if (hour >= 19) {
      return defaultPrice + 25000;
    } else {
      return defaultPrice + 20000;
    }
  }

  return defaultPrice;
};
