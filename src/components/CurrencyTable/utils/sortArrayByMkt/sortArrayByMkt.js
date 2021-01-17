const sortArrayByMkt = (dataArray) => {
  let originalArray = [];
  dataArray.forEach((e) => originalArray.push(e));

  let sortedArray = [];
  while (sortedArray.length < dataArray.length) {
    let maxElement = originalArray[0];
    originalArray.forEach((e) => {
      if (maxElement.mkt_cap < e.mkt_cap) maxElement = e;
    });

    sortedArray.push(maxElement);
    originalArray.splice(originalArray.indexOf(maxElement), 1);
  }

  return sortedArray;
};

export default sortArrayByMkt;
