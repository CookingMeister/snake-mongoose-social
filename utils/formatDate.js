import dayjs from 'dayjs';
dayjs.extend('dayjs/plugin/utc');

const formattedCreatedAt = (timestamp) => {
  const parsedDate = dayjs.utc(timestamp); // Parse timestamp as UTC

  // Get formatted month with short format
  const formattedMonth = parsedDate.format('MMM');

  // Get formatted day of month with suffix
  const dayOfMonth = parsedDate.format('Do');

  const year = parsedDate.format('YYYY');
  const hour = parsedDate.format('hh');
  const minutes = parsedDate.format('mm');
  const amPm = parsedDate.format('A');

  const formattedTimestamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${amPm}`;

  return formattedTimestamp; // Example: "Jan 1st, 2024 at 5:30 PM"
};
export default formattedCreatedAt;