/* eslint-disable no-plusplus */
const getDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

const checkDatesValid = (checkIn, checkOut, availables) => {
  const dates = getDates(
    new Date(Number(checkIn[0]), Number(checkIn[1]), Number(checkIn[2])),
    new Date(Number(checkOut[0]), Number(checkOut[1]), Number(checkOut[2]))
  );
  for (let i = 0; i < dates.length; i++) {
    for (let j = 0; j < availables.length; j++) {
      if (dates[i].toISOString().substring(0, 10) === availables[j].toISOString().substring(0, 10)) {
        // console.log(dates[i].toISOString().substring(0, 10), availables[j].toISOString().substring(0, 10));
        return true;
      }
    }
  }
  return false;
};

module.exports = checkDatesValid;
