import moment from "moment";
export class DateTimeHelpers {
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return moment(date).format("MMM D, YYYY");
  }
}
