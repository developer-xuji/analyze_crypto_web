import processData from "../processData";

const getLatestHistory = () => {
  const param = "/latest";
  return processData(param, "GET");
};

export default getLatestHistory;
