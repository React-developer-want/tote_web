export const checkAllTrue = (list) => {
  return list.reduce((acc, item) => acc && item, true);
};