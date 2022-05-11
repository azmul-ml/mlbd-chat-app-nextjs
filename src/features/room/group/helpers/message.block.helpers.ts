import moment from "moment";

export const formatDate = (currentData: any, prevDate: any) => {
  let newDate = "";
  const today2 = moment().format("MMM Do YY");
  const sameDay =
    moment(currentData).format("MMM Do YY") ===
    moment(prevDate).format("MMM Do YY");
  if (sameDay) {
    return;
  }

  if (!sameDay) {
    const today =
      moment().format("MMM Do YY") === moment(currentData).format("MMM Do YY")
        ? "Today"
        : false;
    const yesterday =
      moment().subtract(1, "days").startOf("day").format("MMM Do YY") ===
      moment(currentData).format("MMM Do YY")
        ? "Yesterday"
        : false;
    const normalDate = `${moment().format("dddd")}, ${moment(
      currentData
    ).format("MMM Do")}`;
    newDate = today ? today : yesterday ? yesterday : normalDate;
    return newDate;
  }
};
