import dayjs from 'dayjs';

const formatDate = (timestamp) => {
  const parsedDate = dayjs(timestamp); // Parse timestamp as local time

  // Get formatted month with short format
  const formattedMonth = parsedDate.format('MMM');

  // Get formatted day of month with suffix
  const dayOfMonth = parsedDate.format('D');

  const year = parsedDate.format('YYYY');
  const hour = parsedDate.format('hh');
  const minutes = parsedDate.format('mm');
  const amPm = parsedDate.format('A');

  const formattedTimestamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${amPm}`;

  return formattedTimestamp; // Example: "Jan 1st, 2024 at 5:30 PM"
};

export default formatDate;
