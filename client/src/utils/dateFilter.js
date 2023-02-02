export const dateFilter = (dateArray) => {
  const sortedDates = dateArray.sort((a, b) => b - a);
  const duplicateRemoved = [...new Set(sortedDates)];
  return duplicateRemoved;
};

// i have an array with all orders with duplicate dates
// add total price of all orders with same date
// get total price of all orders
export const getDuplicateDates = (dateArray) => {
  var duplicates = dateArray.reduce(function (acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el);
    return acc;
  }, []);
  return duplicates;
};

export const getTotalPrice = (arr) => {
  const data = arr.map((x) => x.totalPrice);
  console.log(data);
};
