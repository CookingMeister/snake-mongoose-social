import dayjs from 'dayjs';

const formatDate = (timestamp) => {
  const parsedDate = dayjs(timestamp); // Parse timestamp as local time

  // Get formatted month with short format
  const formattedMonth = parsedDate.format('MMM');

  // Get formatted day of month with suffix
  const day = parsedDate.format('D'); // Get the day of the month (1-31)

  let dayOfMonth;
  switch (day % 10) {
    case 1:
      dayOfMonth = day + 'st';
      break;
    case 2:
      dayOfMonth = day + 'nd';
      break;
    case 3:
      dayOfMonth = day + 'rd';
      break;
    default:
      dayOfMonth = day + 'th';
  }

  const year = parsedDate.format('YYYY');
  const hour = parsedDate.format('hh');
  const minutes = parsedDate.format('mm');
  const amPm = parsedDate.format('A');

  const formattedTimestamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${amPm}`;

  return formattedTimestamp; // Example: "Jan 1st, 2024 at 5:30 PM"
};

export default formatDate;
