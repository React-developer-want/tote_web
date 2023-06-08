export const getInputDate = (date) => {
  const newDate = new Date(date);
  let day = newDate.getDate();
  day = day < 10 ? '0' + day : day;
  let month = newDate.getMonth();
  month = month < 10 ? '0' + month : month;
  return `${newDate.getFullYear()}-${month}-${day}`;
}