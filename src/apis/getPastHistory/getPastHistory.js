import processData from "../processData";

const getPastHistory = (currency, days) => {
  const param = `/search?currency=${currency}&dayPassed=${days}`;
  return processData(param, "GET");
};

export default getPastHistory;
