export const getInputDate = (date) => {
  const newDate = new Date(date);
  let day = newDate.getDate();
  day = day < 10 ? '0' + day : day;
  let month = newDate.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  return `${newDate.getFullYear()}-${month}-${day}`;
}

export const getProgressPercentage = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  const timeDiff = now.getTime() - start.getTime();
  const totalTimeDiff = end.getTime() - start.getTime();
  const percentage = (timeDiff / totalTimeDiff) * 100;
  return Math.floor(percentage);
}