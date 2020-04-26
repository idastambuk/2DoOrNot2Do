import moment, {Moment} from "moment";
import {DATE_FORMAT} from "../../constants/format";

export class MomentHelper {
  public static formatDate(date: number) {
    return moment(date).format(DATE_FORMAT);
  }
  public static formatDueDate(date: number) {
    const momentDate: Moment = moment(date);
    if(momentDate.isSame(moment())) {
      return "TODAY";
    } else {
      return momentDate.format(DATE_FORMAT);
    }
  }
}
