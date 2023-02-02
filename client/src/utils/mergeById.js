export const filteredArray = (arr1, arr2) => {
  let res = [];
  res = arr1.filter((product) => {
    return arr2.find((item) => {
      return item.product === product._id;
    });
  });
  return res;
};

export const mergeById = (a1, a2) =>
  a1.map((product) => ({
    ...a2.find((item) => item.product === product._id && item),
    ...product,
  }));
