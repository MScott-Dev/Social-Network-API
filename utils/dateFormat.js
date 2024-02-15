const dayjs = require("dayjs");

dateString = () => {
  var now = dayjs();
  const currentDate = dayjs(now).format("MMM DD, YYYY");
  const currentTime = dayjs(now).format("h:mm a");

  const dateFormat = `${currentDate} at ${currentTime}`;

  return dateFormat
};

module.exports = { dateString };
