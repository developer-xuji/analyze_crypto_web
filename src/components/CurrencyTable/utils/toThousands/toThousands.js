const toThousands = (num) => {
  let result = [],
    counter = 0;
  num = (num || 0).toString().split("");

  const pointIndex = num.indexOf(".");
  let lessThanOne = [];
  if (pointIndex >= 0)
    lessThanOne = num.splice(pointIndex, num.length - pointIndex);

  for (let i = num.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(num[i]);
    if (!(counter % 3) && i !== 0) {
      result.unshift(",");
    }
  }
  result = result.join("");
  lessThanOne.forEach((e) => {
    result += e;
  });

  return result;
};

export default toThousands;
