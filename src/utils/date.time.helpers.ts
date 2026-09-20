import moment from "moment";

export const getGregorianLocale = (lang = "en") =>
  lang === "ar" ? "ar-SA-u-ca-gregory" : "en-GB-u-ca-gregory";

export class DateTimeHelpers {
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return moment(date).format("MMM D, YYYY");
  }
}
