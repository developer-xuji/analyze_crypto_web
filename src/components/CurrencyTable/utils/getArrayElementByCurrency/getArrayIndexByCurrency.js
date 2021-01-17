const getArrayIndexByCurrency = (dataArray, currency) => {
  let index = dataArray.length;
  dataArray.forEach((e) => {
    if (e.coin === currency) index = dataArray.indexOf(e);
  });

  return index;
};

export default getArrayIndexByCurrency;
