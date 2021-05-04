export const getCurrentValues = (valuesPerPage, currentPage, items) => {
  const indexOfLastValue = currentPage * valuesPerPage; // 5
  const indexOfFirstValue = indexOfLastValue - currentPage; //5-5

  let currentValues = items?.slice(indexOfFirstValue, indexOfLastValue);

  return { currentValues, indexOfLastValue };
};
